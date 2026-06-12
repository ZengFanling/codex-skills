// =============================================================================
// 需求工作室 - 后端服务
// Prompt Agent 驱动的需求访谈引擎
//
// 架构：
//   Agent (requirement-studio.md) → Prompt 单一事实源
//   server.js → 动态读取 Agent Prompt → 调用 AI API
//   文件队列 → Agent 独立处理访谈请求的备用通道
// =============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3456;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(__dirname + '/..'));

// ---------- Agent Prompt 路径 ----------
const AGENT_MD_PATH = path.join(process.env.HOME || __dirname, '.codebuddy', 'agents', 'requirement-studio.md');

// ---------- AI 配置 ----------
const AI_API_TYPE = process.env.AI_API_TYPE || 'openai';

const AI_API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
const ANTHROPIC_AUTH_TOKEN = process.env.ANTHROPIC_AUTH_TOKEN || '';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';

const AI_TEMPERATURE = parseFloat(process.env.AI_TEMPERATURE || '0.7');

const AI_ENABLED = AI_API_TYPE === 'anthropic'
  ? (!!ANTHROPIC_AUTH_TOKEN && ANTHROPIC_AUTH_TOKEN !== 'sk-your-api-key-here')
  : (!!AI_API_KEY && AI_API_KEY !== 'sk-your-api-key-here');

const AI_DISPLAY_MODEL = AI_API_TYPE === 'anthropic' ? ANTHROPIC_MODEL : AI_MODEL;

// ---------- 文件队列目录 ----------
const QUEUE_DIR = path.join(__dirname, 'interview-queue');
const PENDING_DIR = path.join(QUEUE_DIR, 'pending');
const RESPONSES_DIR = path.join(QUEUE_DIR, 'responses');
const DONE_DIR = path.join(QUEUE_DIR, 'done');

// 确保队列目录存在
[PENDING_DIR, RESPONSES_DIR, DONE_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ---------- 从 Agent 文件动态加载 Prompt ----------
let SYSTEM_PROMPT_CACHE = null;
let agentPromptLoadedAt = null;
let agentPromptError = null;

function loadAgentPrompt() {
  try {
    if (!fs.existsSync(AGENT_MD_PATH)) {
      agentPromptError = `Agent 文件不存在: ${AGENT_MD_PATH}`;
      console.warn('⚠️ ', agentPromptError);
      return null;
    }
    const content = fs.readFileSync(AGENT_MD_PATH, 'utf-8');

    // 提取 "## 访谈引擎 Prompt" 到 "## 项目结构" 之间的内容
    const sectionMatch = content.match(/## 访谈引擎 Prompt\s*\n([\s\S]*?)(?=\n---\n## |$)/);
    if (!sectionMatch) {
      agentPromptError = 'Agent 文件中未找到 "## 访谈引擎 Prompt" 段落';
      console.warn('⚠️ ', agentPromptError);
      return null;
    }

    let prompt = sectionMatch[1].trim();

    // 去掉开头的引用标记 `> **以下内容同时是...`
    prompt = prompt.replace(/^>.*\n/, '').trim();

    agentPromptLoadedAt = new Date().toISOString();
    agentPromptError = null;
    console.log(`✅ Agent Prompt 已加载 (${prompt.length} 字符) — ${AGENT_MD_PATH}`);
    return prompt;
  } catch (err) {
    agentPromptError = err.message;
    console.error('❌ 加载 Agent Prompt 失败:', err.message);
    return null;
  }
}

function getSystemPrompt() {
  if (!SYSTEM_PROMPT_CACHE) {
    SYSTEM_PROMPT_CACHE = loadAgentPrompt();
  }
  return SYSTEM_PROMPT_CACHE;
}

// 初始加载
SYSTEM_PROMPT_CACHE = loadAgentPrompt();

// ---------- 调用 AI（兼容 OpenAI 和 Anthropic）----------
async function callAI(messages, temperature = AI_TEMPERATURE) {
  if (!AI_ENABLED) {
    throw new Error('AI 未配置。请在 server/.env 中设置 API Key。');
  }
  if (AI_API_TYPE === 'anthropic') {
    return callAnthropicAI(messages, temperature);
  }
  return callOpenAI(messages, temperature);
}

async function callOpenAI(messages, temperature) {
  const resp = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({ model: AI_MODEL, messages, temperature, max_tokens: 2048 }),
    signal: AbortSignal.timeout(60000),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`AI API 错误 (${resp.status}): ${err.substring(0, 300)}`);
  }
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callAnthropicAI(messages, temperature) {
  const systemParts = [];
  const apiMessages = [];

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemParts.push(msg.content);
    } else {
      if (msg.role === 'user' && Array.isArray(msg.content)) {
        const anthropicContent = msg.content.map((part) => {
          if (part.type === 'text') return { type: 'text', text: part.text };
          if (part.type === 'image_url') {
            const dataUrl = part.image_url?.url || '';
            const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
            return {
              type: 'image',
              source: {
                type: 'base64',
                media_type: match ? match[1] : 'image/png',
                data: match ? match[2] : dataUrl,
              },
            };
          }
          return part;
        });
        apiMessages.push({ role: 'user', content: anthropicContent });
      } else {
        apiMessages.push(msg);
      }
    }
  }

  const systemPrompt = systemParts.join('\n\n');
  const url = `${ANTHROPIC_BASE_URL}/v1/messages`;
  const body = { model: ANTHROPIC_MODEL, max_tokens: 2048, temperature, messages: apiMessages };
  if (systemPrompt) body.system = systemPrompt;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_AUTH_TOKEN,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`AI API 错误 (${resp.status}): ${err.substring(0, 300)}`);
  }

  const data = await resp.json();
  const textParts = (data.content || [])
    .filter((c) => c.type === 'text')
    .map((c) => c.text);
  return textParts.join('') || '';
}

// ---------- 流式 AI 调用（SSE 生成器）----------
async function* streamAI(messages, temperature = AI_TEMPERATURE, maxTokens = 12000) {
  if (!AI_ENABLED) throw new Error('AI 未配置');
  if (AI_API_TYPE === 'anthropic') {
    yield* streamAnthropicAI(messages, temperature, maxTokens);
  } else {
    yield* streamOpenAI(messages, temperature, maxTokens);
  }
}

async function* streamOpenAI(messages, temperature, maxTokens) {
  const resp = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
      stream_options: { include_usage: true },
    }),
    signal: AbortSignal.timeout(300000),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`AI API 错误 (${resp.status}): ${err.substring(0, 300)}`);
  }
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop() || '';
    for (const line of lines) {
      const s = line.trim();
      if (!s.startsWith('data: ')) continue;
      const json = s.slice(6);
      if (json === '[DONE]') return;
      try {
        const parsed = JSON.parse(json);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {}
    }
  }
}

async function* streamAnthropicAI(messages, temperature, maxTokens) {
  const systemParts = [];
  const apiMessages = [];
  for (const msg of messages) {
    if (msg.role === 'system') {
      systemParts.push(msg.content);
    } else {
      if (msg.role === 'user' && Array.isArray(msg.content)) {
        const ac = msg.content.map((p) => {
          if (p.type === 'text') return { type: 'text', text: p.text };
          if (p.type === 'image_url') {
            const m = (p.image_url?.url || '').match(/^data:(image\/\w+);base64,(.+)$/);
            return { type: 'image', source: { type: 'base64', media_type: m?.[1] || 'image/png', data: m?.[2] || '' } };
          }
          return p;
        });
        apiMessages.push({ role: 'user', content: ac });
      } else {
        apiMessages.push(msg);
      }
    }
  }
  const systemPrompt = systemParts.join('\n\n');
  const body = { model: ANTHROPIC_MODEL, max_tokens: maxTokens, temperature, messages: apiMessages, stream: true };
  if (systemPrompt) body.system = systemPrompt;

  const resp = await fetch(`${ANTHROPIC_BASE_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_AUTH_TOKEN,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300000),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`AI API 错误 (${resp.status}): ${err.substring(0, 300)}`);
  }
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop() || '';
    for (const line of lines) {
      const s = line.trim();
      if (!s.startsWith('data: ')) continue;
      try {
        const ev = JSON.parse(s.slice(6));
        if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
          yield ev.delta.text;
        }
      } catch {}
    }
  }
}

function parseAIResponse(text) {
  const cleaned = text.trim();

  // 提取 [STATE]...[/STATE] 块
  const stateMatch = cleaned.match(/\[STATE\]\s*\n([\s\S]*?)\n\s*\[\/STATE\]/);
  let stateData = {};
  let message = cleaned;

  if (stateMatch) {
    // 解析状态行: key: value
    const stateText = stateMatch[1];
    for (const line of stateText.split('\n')) {
      const kv = line.match(/^(\w+)\s*:\s*(.+)$/);
      if (kv) {
        const key = kv[1].trim();
        let value = kv[2].trim();
        if (value === 'null' || value === '') value = null;
        stateData[key] = value;
      }
    }
    // 消息正文 = 去掉 [STATE] 块后的剩余内容
    message = cleaned.replace(/\[STATE\][\s\S]*?\[\/STATE\]\s*/g, '').trim();
  }

  // 兼容旧 JSON 格式
  if (!stateMatch) {
    const jsonMatch = cleaned.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : cleaned;
    try {
      const parsed = JSON.parse(jsonStr);
      return {
        phase: parsed.phase || 'interview',
        requirementType: parsed.requirementType || null,
        evolutionType: parsed.evolutionType || null,
        currentDomain: parsed.currentDomain || null,
        hints: Array.isArray(parsed.hints) ? parsed.hints : [],
        message: parsed.message || cleaned,
      };
    } catch { /* 不是 JSON */ }
  }

  return {
    phase: stateData.phase || 'interview',
    requirementType: stateData.requirementType || null,
    evolutionType: stateData.evolutionType || null,
    currentDomain: stateData.currentDomain || null,
    hints: stateData.hints ? stateData.hints.split(',').map(s => s.trim()).filter(Boolean) : [],
    message: message || cleaned,
  };
}

// ---------- 附件处理 ----------
function processAttachments(attachments) {
  if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
    return { textContent: '', imageParts: [], attachmentSummary: '' };
  }
  const textFiles = attachments.filter(a => a.type === 'text' && a.content);
  const imageFiles = attachments.filter(a => a.type === 'image' && a.dataUrl);
  const textContent = textFiles
    .map(f => `【附件：${f.name}】\n${f.content}`)
    .join('\n\n---\n\n');

  const fileNames = attachments.map(a => a.name).join('、');
  const summary = `\n\n[用户本次上传了 ${attachments.length} 个附件：${fileNames}]`;
  const imageParts = imageFiles.map(f => ({
    type: 'image_url',
    image_url: { url: f.dataUrl, detail: 'auto' },
  }));
  return { textContent, imageParts, attachmentSummary: summary };
}

// 构建访谈消息数组
function buildChatMessages({ phase, requirementType, evolutionType, currentDomain, interviewStep, freeformAnswers, message, attachments }) {
  const systemPrompt = getSystemPrompt();
  const { textContent, imageParts, attachmentSummary } = processAttachments(attachments);

  const messages = [{ role: 'system', content: systemPrompt || '你是一个资深需求分析师。' }];

  // 注入当前状态
  messages.push({
    role: 'system',
    content: `当前访谈状态：\n\`\`\`json\n${JSON.stringify({
      phase, requirementType, evolutionType, currentDomain, interviewStep,
      已提问数量: (freeformAnswers || []).length,
    }, null, 2)}\n\`\`\``,
  });

  // 注入历史回答
  if (freeformAnswers && freeformAnswers.length > 0) {
    const history = freeformAnswers
      .map((a) => `【用户对 "${a.question}" 的回答】\n${a.answer}`)
      .join('\n\n');
    messages.push({
      role: 'system',
      content: `以下是用户之前的全部回答，请据此判断当前进度和下一步追问：\n\n${history}`,
    });
  }

  // 注入附件文本内容（触发 Phase -1 文档智能分析）
  if (textContent) {
    messages.push({
      role: 'system',
      content: `⚠️ 用户已上传文档，你必须执行 **Phase -1 文档智能分析**：

1. 仔细阅读以下全部文件内容
2. 按 9 个维度（业务目标/用户与角色/使用场景/流程与规则/权限与范围/数据与对象/UI与交互/技术与集成/验收与边界）逐一提取已知信息
3. 用 markdown 表格标注每个维度的状态（✅已知 / ⚠️部分 / ❌缺失）
4. 自动判断需求类型（ai/traditional）和演进方式（0to1/1toN）
5. 在 message 中输出完整的分析摘要
6. 后续只追问信息不足的维度，不要重复文件已明确的内容

=== 文件内容开始 ===

${textContent}

=== 文件内容结束 ===`,
    });
  }

  // 注入图片分析提示（触发 Phase -1 图片智能分析）
  if (imageParts.length > 0 && !textContent) {
    let imgAnalysisPrompt = `⚠️ 用户上传了 ${imageParts.length} 张参考图片，你必须执行 **Phase -1 图片智能分析**：

请仔细观察图片内容，从以下角度提取信息：
- **UI/交互**：页面布局、组件结构、交互元素（按钮/表格/表单/弹窗等）、导航方式
- **流程**：如果图片展示了流程图、步骤图，还原其逻辑
- **数据**：图片中展示的字段、表格列、数据展示形式
- **业务场景**：根据图片上下文推断使用场景

分析完成后：
1. 用 2-3 句话总结你从图片中看到的内容
2. 标注最明确的信息维度（UI/交互 > 流程 > 数据 > 业务场景）
3. 将分析结果融入你的回复中
4. 基于图片信息确定 phase 和 currentDomain
5. 只追问图片中不明确或缺失的信息

**注意**：如果图片是 UI 截图/设计稿，优先提取 UI 维度的信息并标记为 ✅（已知）。`;
    messages.push({ role: 'system', content: imgAnalysisPrompt });
  } else if (imageParts.length > 0 && textContent) {
    let combinedPrompt = `⚠️ 用户同时上传了文档和 ${imageParts.length} 张参考图片。综合分析两者后，按 Phase -1 文档智能分析流程处理。图片可能是 UI 截图、流程图或架构图，与文档内容互补。`;
    messages.push({ role: 'system', content: combinedPrompt });
  }

  // 用户消息
  if (imageParts.length > 0) {
    const userContent = [{ type: 'text', text: message + attachmentSummary }];
    userContent.push(...imageParts);
    messages.push({ role: 'user', content: userContent });
  } else {
    messages.push({ role: 'user', content: message + attachmentSummary });
  }

  return messages;
}

// ================== ROUTES ==================

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    aiEnabled: AI_ENABLED,
    model: AI_ENABLED ? AI_DISPLAY_MODEL : null,
    apiType: AI_API_TYPE,
    agentMode: true,
    agentPromptLoaded: !!SYSTEM_PROMPT_CACHE,
    agentPromptError: agentPromptError || null,
    agentPromptLoadedAt: agentPromptLoadedAt || null,
    timestamp: new Date().toISOString(),
  });
});

// 重新加载 Agent Prompt（热更新）
app.post('/api/reload-prompt', (_req, res) => {
  SYSTEM_PROMPT_CACHE = loadAgentPrompt();
  res.json({
    success: !!SYSTEM_PROMPT_CACHE,
    promptLength: SYSTEM_PROMPT_CACHE ? SYSTEM_PROMPT_CACHE.length : 0,
    error: agentPromptError || null,
  });
});

// 主访谈接口（直接调用 AI API，使用 Agent Prompt）
app.post('/api/chat', async (req, res) => {
  if (!AI_ENABLED) {
    return res.status(503).json({ error: 'AI 服务未配置', hint: '请在 server/.env 中设置 API Key' });
  }
  if (!SYSTEM_PROMPT_CACHE) {
    return res.status(503).json({ error: 'Agent Prompt 未加载', hint: '请检查 Agent 文件是否存在' });
  }

  try {
    const messages = buildChatMessages(req.body);
    const aiRaw = await callAI(messages);
    const parsed = parseAIResponse(aiRaw);

    res.json({ success: true, ...parsed });
  } catch (err) {
    console.error('[chat]', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------- 文件队列：Agent 独立处理通道 ----------

// 提交访谈请求到文件队列（由 Agent 异步处理）
app.post('/api/chat-agent', (req, res) => {
  const id = crypto.randomUUID();
  const requestFile = path.join(PENDING_DIR, `${id}.request.json`);

  const payload = {
    id,
    timestamp: new Date().toISOString(),
    ...req.body,
  };

  try {
    fs.writeFileSync(requestFile, JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`📨 请求已入队: ${id}`);
    res.json({ success: true, id, hint: '请求已提交给 Agent 处理，请轮询 /api/chat-agent/:id 获取响应' });
  } catch (err) {
    console.error('[chat-agent] 写入失败:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 轮询 Agent 响应
app.get('/api/chat-agent/:id', (req, res) => {
  const { id } = req.params;
  const responseFile = path.join(RESPONSES_DIR, `${id}.response.json`);

  if (fs.existsSync(responseFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(responseFile, 'utf-8'));
      res.json({ success: true, status: 'done', ...data });
    } catch (err) {
      res.status(500).json({ success: false, error: '响应文件损坏' });
    }
  } else {
    // 检查请求是否还在队列中
    const requestFile = path.join(PENDING_DIR, `${id}.request.json`);
    const doneFile = path.join(DONE_DIR, `${id}.request.json`);
    if (fs.existsSync(requestFile)) {
      res.json({ success: true, status: 'pending' });
    } else if (fs.existsSync(doneFile)) {
      res.json({ success: true, status: 'processing' });
    } else {
      res.status(404).json({ success: false, error: '请求不存在' });
    }
  }
});

// 长轮询等待 Agent 响应（最多 30 秒）
app.get('/api/chat-agent/:id/wait', async (req, res) => {
  const { id } = req.params;
  const responseFile = path.join(RESPONSES_DIR, `${id}.response.json`);
  const maxWait = 30000;
  const pollInterval = 1000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    if (fs.existsSync(responseFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(responseFile, 'utf-8'));
        return res.json({ success: true, status: 'done', ...data });
      } catch (err) {
        return res.status(500).json({ success: false, error: '响应文件损坏' });
      }
    }
    await new Promise(r => setTimeout(r, pollInterval));
  }

  res.json({ success: true, status: 'timeout', hint: 'Agent 尚未处理此请求，请稍后重试' });
});

// Agent 模式状态
app.get('/api/agent-mode', (_req, res) => {
  try {
    const pendingFiles = fs.readdirSync(PENDING_DIR).filter(f => f.endsWith('.request.json'));
    const responseFiles = fs.readdirSync(RESPONSES_DIR).filter(f => f.endsWith('.response.json'));
    res.json({
      agentPromptLoaded: !!SYSTEM_PROMPT_CACHE,
      agentFileExists: fs.existsSync(AGENT_MD_PATH),
      agentPromptError: agentPromptError || null,
      pendingRequests: pendingFiles.length,
      completedResponses: responseFiles.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 生成需求分析文档（SSE 流式输出）
app.post('/api/generate-reqdoc', async (req, res) => {
  if (!AI_ENABLED) {
    return res.status(503).json({ error: 'AI 服务未配置', hint: '请在 server/.env 中设置 API Key' });
  }

  const { requirementType, evolutionType, freeformAnswers } = req.body;
  const answersText = (freeformAnswers || [])
    .map((a) => `问：${a.question}\n答：${a.answer}`)
    .join('\n\n');

  const dateStr = new Date().toISOString().split('T')[0];

  const sysPrompt = `你是一个资深需求分析师。根据需求访谈的全部问答记录，生成一份正式的 **需求分析报告**，按 zfl-requirement 方法论组织内容，供产品评审和开发使用。

## 文档结构（严格按以下 3 个一级章节输出，顺序不可变）

### 文档头部

\`\`\`markdown
# [项目名] 需求分析报告

> **需求类型**：传统需求 / AI需求
> **演进方式**：0→1 新建 / 1→N 迭代
> **版本**：v1.0
> **日期**：${dateStr}
> **适用系统**：[根据访谈推断]
> **需求来源**：需求访谈
\`\`\`

## 一、项目背景

### 1.1 业务背景与目标
- 为什么要做、要解决什么问题
- 不做会怎样、做好了能带来什么

### 1.2 目标用户与角色

| 角色 | 说明 | 使用方式 |
|------|------|----------|
| ... | ... | ... |

### 1.3 核心问题
- 本轮要解决的核心痛点（1-3 条）

### 1.4 目标与非目标
- **本轮目标**：逐条列出做什么
- **不做什么**：明确排除项

### 1.5 现有流程分析（仅 1→N 需求必填）
- 当前流程步骤、每步的输入输出、参与角色
- 现有痛点：重复劳动、断点、等待点、人工判断点
- 本次需求要改动的环节和影响范围

${evolutionType === '1toN' ? '> ⚠️ 当前为 1→N 需求，必须在 1.5 中对现有流程做详细分析。' : '> 当前为 0→1 需求，无需 1.5 节。'}

## 二、需求拆解

### 2.1 核心流程（流程图）
用自然语言概述完整流程的关键步骤、分支、判断条件、异常路径。流程节点用有序列表描述，分支用"如果…则…"句式说明。

### 2.2 功能优先级

| 功能名称 | 优先级 | 说明 | 是否必做 |
|----------|--------|------|----------|
| ... | P0 | ... | 是 |

### 2.3 需求详细说明

按 2.2 中的功能逐项展开，每项至少包含：
- 适用角色与权限
- 触发入口（必须区分主入口和辅助入口）
- 交互步骤与关键状态
- 数据对象与字段
- UI 与交互说明
- 业务规则与边界情况

## 三、评测集（若为AI需求）

${requirementType === 'ai' ? `
| 测试场景 | 输入 | 期望输出 | 评估标准 | 备注 |
|----------|------|----------|----------|------|
| ... | ... | ... | 准确率/合理度 | ... |

> 评估维度包括但不限于：准确率、召回率、成功率、耗时、人工节省量、用户满意度
> 为什么必须用 AI（而不是普通规则或搜索就能解决）
> 模型在流程中的位置：主流程 / 辅助流程 / 仅提效工具
> 输入上下文、输出格式、可接受误差、人工兜底方式` : '> 当前为传统需求，无需评测集。'}

---

## 附录A：非功能要求

| 维度 | 要求 | 目标值 |
|------|------|--------|
| 性能 | ... | ... |
| 安全 | ... | ... |
| 稳定性 | ... | ... |
| 兼容性 | ... | ... |

## 附录B：风险与待确认项

| 问题描述 | 影响范围 | 需要谁确认 | 不确认的风险 | 确认结果 |
|----------|----------|------------|--------------|----------|
| ... | ... | ... | ... | 待确认 |

---

## 输出要求

- 直接返回 Markdown 文档内容，不要用代码块包裹
- 根据访谈内容自动提取项目名称
- 信息不足的章节标注"待补充"并说明需要什么信息
- 数据描述务必具体：百分比标注绝对数量、时间标注到年月日、接口超时标注秒数
- 一级章节名称固定为：一、项目背景 / 二、需求拆解 / 三、评测集`;

  // SSE 流式输出
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  try {
    const messages = [
      { role: 'system', content: sysPrompt },
      { role: 'user', content: `以下是需求访谈的全部问答记录。请严格按照上述文档结构（一、项目背景 / 二、需求拆解 / 三、评测集）生成需求分析报告：\n\n${answersText}` },
    ];
    const stream = streamAI(messages, 0.7, 12000);
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('[generate-reqdoc]', err.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  }
});

// 启动
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔════════════════════════════════════════════╗');
  console.log('  ║    需求工作室 — Prompt Agent 驱动模式      ║');
  console.log(`  ║    http://localhost:${PORT}                      ║`);
  console.log(`  ║    AI: ${AI_ENABLED ? `已配置 (${AI_DISPLAY_MODEL} / ${AI_API_TYPE})` : '❌ 未配置'}                        ║`);
  console.log(`  ║    Agent Prompt: ${SYSTEM_PROMPT_CACHE ? `✅ 已加载 (${SYSTEM_PROMPT_CACHE.length} 字符)` : `❌ ${agentPromptError || '未找到'}`}  ║`);
  console.log('  ╚════════════════════════════════════════════╝');
  console.log('');
  if (!AI_ENABLED) {
    console.log('  ⚠️  尚未配置 AI API Key。');
    console.log('     cp server/.env.example server/.env');
    console.log('     然后编辑 server/.env 填入 API Key');
    console.log('');
  }
});
