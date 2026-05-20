# AI CRB DESIGN SPEC

## 1. 视觉主题与氛围

本视觉体系以主色 `#2C68FF` 为核心，清爽、可信、偏高效工具属性。视觉中心由高饱和蓝色建立“智能、科技、行动”的品牌识别，辅以白色大面积界面、浅灰背景、低强度描边和中等圆角，形成克制但不冷淡的办公体验。适用于 PC 端管理后台、数据平台、业务系统和企业级工具类产品。

### 设计情绪

- **理性克制**：以蓝色作为主导品牌色，传达稳定、效率、科技感和可信赖感。
- **清爽明亮**：通过浅蓝与蓝灰中性色构建页面底色，减少视觉压迫感，适合长时间办公场景。
- **层级明确**：通过文字颜色、背景色、边框色和状态色建立信息优先级，让用户快速识别主次。
- **低干扰高效率**：避免过度装饰和高饱和大面积铺色，优先服务阅读、判断和操作。

### 界面密度

PC 端界面建议采用 **中高信息密度**：

- 正文基准字号为 `14px`，适合表单、表格、列表、详情页等高频业务场景。
- 标题层级保持克制，常规页面不建议超过 4 个主要文字层级。
- 色彩主要用于强调操作、状态反馈和结构分隔，不作为大面积装饰。

### 设计理念

颜色与字体系统采用“两层变量”思路：

- **基础变量**：定义稳定的原子值，如品牌蓝、中性色、成功色、警告色、危险色、字号、行高、字重。
- **语义变量**：面向 UI 场景命名，如页面背景、主文本、默认边框、主按钮、错误状态。

设计和开发在具体组件中应优先使用语义变量，而不是直接引用基础变量。这样可以降低维护成本，并为后续换肤、深色模式和品牌升级保留扩展空间。

## 2. 色彩系统与功能

### 2.1 基础色板

基础色板用于定义颜色原子值，不建议在业务组件中直接使用。组件、页面和业务模块应优先引用后续的语义变量。

#### 品牌蓝 Brand Blue

| 变量名 | 色值 | 功能说明 |
|---|---:|---|
| `brand/blue/50` | `#EEF4FF` | 极浅品牌背景、选中浅底、提示区背景 |
| `brand/blue/100` | `#D9E6FF` | 浅品牌背景、弱禁用背景 |
| `brand/blue/200` | `#B7CEFF` | 浅品牌边框、浅选中背景 |
| `brand/blue/300` | `#8EAEFF` | 主按钮禁用态、次级强调、浅悬停反馈 |
| `brand/blue/400` | `#5F89FF` | 聚焦边框、辅助强调 |
| `brand/blue/500` | `#2C68FF` | 品牌主色、主按钮、链接、选中态 |
| `brand/blue/600` | `#1F54D9` | 主色悬停态、品牌文字 |
| `brand/blue/700` | `#1842AD` | 主色按下态、深强调 |
| `brand/blue/800` | `#143682` | 深色强调、深背景场景 |
| `brand/blue/900` | `#102A5C` | 投影色、深色背景辅助 |

#### 中性色 Neutral

中性色采用略带蓝色倾向的灰阶，用于构建更统一的企业级界面氛围。

| 变量名 | 色值 | 功能说明 |
|---|---:|---|
| `neutral/0` | `#FFFFFF` | 白色背景、反白文字 |
| `neutral/50` | `#F7F9FD` | 页面背景 |
| `neutral/100` | `#EEF2F8` | 次级按钮背景、浅分区背景 |
| `neutral/200` | `#DDE5F0` | 默认边框、分割线 |
| `neutral/300` | `#C3CEDD` | 强边框、禁用边框 |
| `neutral/400` | `#94A3B8` | 三级文字、占位文字 |
| `neutral/500` | `#64748B` | 辅助文字 |
| `neutral/600` | `#475569` | 二级文字、说明文字 |
| `neutral/700` | `#334155` | 强辅助文字 |
| `neutral/800` | `#1E293B` | 次级标题、深文字 |
| `neutral/900` | `#0F172A` | 一级正文、主标题 |

#### 功能色 Functional Colors

| 变量名 | 色值 | 功能说明 |
|---|---:|---|
| `success/50` | `#ECFDF3` | 成功状态浅背景 |
| `success/500` | `#16A34A` | 成功文字、成功图标 |
| `info/50` | `#EEF4FF` | 信息提示浅背景 |
| `info/500` | `#2C68FF` | 信息提示文字、信息图标 |
| `warning/50` | `#FFFBEB` | 警告状态浅背景 |
| `warning/500` | `#F59E0B` | 警告文字、警告图标 |
| `danger/50` | `#FEF2F2` | 错误状态浅背景 |
| `danger/500` | `#DC2626` | 错误文字、错误图标、危险操作 |

### 2.2 语义色变量

语义色变量直接面向 UI 场景，是组件和页面设计的优先引用对象。

#### 背景 Background

| 变量名 | 映射色值 | 功能角色 |
|---|---:|---|
| `background/page` | `#F7F9FD` | 页面整体背景 |
| `background/surface` | `#FFFFFF` | 卡片、表格、表单容器背景 |
| `background/subtle` | `#EEF4FF` | 浅品牌提示区、选中背景 |
| `background/elevated` | `#FFFFFF` | 弹窗、下拉、浮层背景 |

#### 文本 Text

| 变量名 | 映射色值 | 功能角色 |
|---|---:|---|
| `text/primary` | `#0F172A` | 一级标题、正文重点内容 |
| `text/secondary` | `#475569` | 二级文字、辅助说明、表单 Label |
| `text/tertiary` | `#94A3B8` | 占位文字、弱提示、备注 |
| `text/inverse` | `#FFFFFF` | 深色背景或主按钮上的文字 |
| `text/brand` | `#1F54D9` | 品牌强调文字 |
| `text/link` | `#2C68FF` | 链接文字、可点击文本 |

#### 边框 Border

| 变量名 | 映射色值 | 功能角色 |
|---|---:|---|
| `border/default` | `#DDE5F0` | 输入框、卡片、表格默认边框 |
| `border/strong` | `#C3CEDD` | 强分割、强调边框 |
| `border/brand` | `#2C68FF` | 品牌选中边框 |
| `border/focus` | `#5F89FF` | 输入框、控件聚焦边框 |

#### 操作 Action

| 变量名 | 映射色值 | 功能角色 |
|---|---:|---|
| `action/primary/default` | `#2C68FF` | 主按钮默认态 |
| `action/primary/hover` | `#1F54D9` | 主按钮悬停态 |
| `action/primary/active` | `#1842AD` | 主按钮按下态 |
| `action/primary/disabled` | `#8EAEFF` | 主按钮禁用态 |
| `action/primary/subtle` | `#EEF4FF` | 主操作浅背景、选中浅底 |
| `action/secondary/default` | `#EEF2F8` | 次级按钮默认背景 |
| `action/secondary/hover` | `#DDE5F0` | 次级按钮悬停背景 |
| `action/secondary/active` | `#C3CEDD` | 次级按钮按下背景 |
| `action/secondary/text` | `#1E293B` | 次级按钮文字 |

#### 状态 State

| 变量名 | 映射色值 | 功能角色 |
|---|---:|---|
| `state/success/background` | `#ECFDF3` | 成功提示背景 |
| `state/success/text` | `#16A34A` | 成功提示文字、图标 |
| `state/info/background` | `#EEF4FF` | 普通信息提示背景 |
| `state/info/text` | `#2C68FF` | 普通信息提示文字、图标 |
| `state/warning/background` | `#FFFBEB` | 警告提示背景 |
| `state/warning/text` | `#F59E0B` | 警告提示文字、图标 |
| `state/danger/background` | `#FEF2F2` | 错误提示背景 |
| `state/danger/text` | `#DC2626` | 错误提示文字、图标、危险操作 |

#### 遮罩与投影 Overlay & Shadow

| 变量名 | 推荐值 | 功能角色 |
|---|---:|---|
| `overlay/default` | `rgba(15, 23, 42, 0.48)` | 弹窗遮罩、抽屉遮罩 |
| `shadow/color` | `rgba(15, 42, 92, 0.12)` | 卡片、浮层、弹窗投影色 |

### 2.3 使用规则

- 组件与页面优先使用语义变量，避免直接使用基础色板。
- `brand/blue/500` 不应被滥用于所有强调场景，应优先判断是否属于主操作、链接或选中态。
- 正文小字号文本不应使用过浅颜色，避免可读性不足。
- 成功、警告、错误状态不应只依赖颜色表达，应搭配图标或明确文案。
- 禁止在业务页面中随意新增相近蓝色或相近灰色。
- 危险色仅用于错误、删除、失败、不可逆操作，不用于普通强调。

## 3. 排版规则

### 3.1 字体家族

PC 端中文界面默认使用苹方字体。

| 变量名 | 值 | 功能说明 |
|---|---|---|
| `font/family/base` | `PingFang SC` | 中文 UI 默认字体 |
| `font/family/fallback` | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | 系统字体回退 |

推荐 CSS 字体栈：

```css
font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### 3.2 基础字体变量

#### 字重 Weight

| 变量名 | 值 | 用途 |
|---|---:|---|
| `font/weight/regular` | `400` | 正文、说明、表单内容 |
| `font/weight/medium` | `500` | 标题、按钮、重点信息 |
| `font/weight/semibold` | `600` | 页面大标题、关键数字 |

#### 字号 Size

| 变量名 | 值 | 用途 |
|---|---:|---|
| `font/size/12` | `12px` | 辅助文字、备注、表格补充信息 |
| `font/size/14` | `14px` | 默认正文、表单、表格、按钮 |
| `font/size/16` | `16px` | 小标题、重点正文 |
| `font/size/20` | `20px` | 卡片标题、弹窗标题 |
| `font/size/24` | `24px` | 页面标题 |
| `font/size/32` | `32px` | 数据看板大数字 |

#### 行高 Line Height

| 变量名 | 值 | 对应字号 |
|---|---:|---|
| `font/line-height/18` | `18px` | `12px` |
| `font/line-height/22` | `22px` | `14px` |
| `font/line-height/24` | `24px` | `16px` |
| `font/line-height/28` | `28px` | `20px` |
| `font/line-height/32` | `32px` | `24px` |
| `font/line-height/40` | `40px` | `32px` |

### 3.3 语义排版层级

| 样式名 | 字体 | 字号 | 行高 | 字重 | 字色建议 | 使用场景 |
|---|---|---:|---:|---:|---|---|
| `display/data` | PingFang SC | `32px` | `40px` | `600` | `text/primary` / `text/brand` | 数据看板大数字、关键指标 |
| `heading/page` | PingFang SC | `24px` | `32px` | `600` | `text/primary` | 页面标题、一级页面入口标题 |
| `heading/section` | PingFang SC | `20px` | `28px` | `500` | `text/primary` | 模块标题、弹窗标题 |
| `title/card` | PingFang SC | `16px` | `24px` | `500` | `text/primary` | 卡片标题、表单分组标题 |
| `body/regular` | PingFang SC | `14px` | `22px` | `400` | `text/primary` | 默认正文、表格内容、详情内容 |
| `body/medium` | PingFang SC | `14px` | `22px` | `500` | `text/primary` | 强调正文、表格关键字段 |
| `label/regular` | PingFang SC | `12px` | `18px` | `400` | `text/secondary` | 表单辅助 Label、次要标签 |
| `label/medium` | PingFang SC | `12px` | `18px` | `500` | `text/secondary` | 强调标签、状态标签文字 |
| `button/medium` | PingFang SC | `14px` | `22px` | `500` | `text/inverse` / `text/brand` | 按钮文字、可点击操作 |
| `caption` | PingFang SC | `12px` | `18px` | `400` | `text/tertiary` | 备注、说明、时间、弱提示 |

### 3.4 排版使用规则

- PC 端默认正文使用 `body/regular`，即 `14px / 22px / 400`。
- 标题层级应按页面结构递进，不应为了视觉强调跳级使用。
- 表格、表单、列表等高密度区域优先使用 `14px` 正文，不建议使用过大的字号。
- `12px` 仅用于辅助信息，不应用于关键正文或重要操作。
- 按钮文字统一使用 `button/medium`，保证操作入口清晰稳定。
- 数据大数字可使用 `display/data`，但应控制数量，避免页面层级失焦。
- 中文界面默认字距使用 `0`，不建议额外增加或使用负字距。

### 3.5 图标规范

图标用于辅助识别操作、状态和信息类型，不应替代关键文字。PC 端后台系统应优先使用清晰、克制、统一的线性图标。

| 场景 | 图标尺寸 | 点击热区 | 颜色 |
|---|---:|---:|---|
| 表单前缀 / 后缀图标 | `16px` | `24px` | `text/tertiary` |
| 按钮图标 | `16px` | 跟随按钮高度 | `inherit` |
| 图标按钮 Small | `16px` | `28px` | `text/secondary` |
| 图标按钮 Default | `16px` | `32px` | `text/secondary` |
| 导航图标 | `16px` | `40px` 行高内居中 | `text/secondary` |
| 状态图标 | `16px` | 不单独点击 | 对应 `state/*/text` |
| 空状态图标 | `48px - 80px` | 不单独点击 | `text/tertiary` |

图标间距：

| 组合 | 间距 |
|---|---:|
| 按钮图标 + 文字 | `6px` |
| 表单图标 + 输入文字 | `6px` |
| 导航图标 + 文字 | `8px - 10px` |
| 状态图标 + 文案 | `8px` |
| 图标距表单控件右边 | `8px` |

图标状态颜色：

| 状态 | 颜色 |
|---|---|
| 默认 | `text/tertiary` |
| 可点击 | `text/secondary` |
| Hover | `text/primary` |
| Active / Selected | `text/brand` |
| Disabled | `text/tertiary` |
| Danger | `state/danger/text` |
| Success | `state/success/text` |
| Warning | `state/warning/text` |
| Info | `state/info/text` |

图标使用规则：

- 图标视觉尺寸默认使用 `16px`，并在点击热区内居中。
- 图标按钮默认热区为 `32px`，紧凑场景可使用 `28px`。
- 表单控件内右侧图标应预留 `32px` 内容区域，图标距右边 `8px`。
- 图标与文字组合时，文字仍承担主要含义，图标只做辅助识别。
- 不熟悉或低频图标必须提供 Tooltip。
- 状态图标必须搭配文字，不得只依赖颜色表达状态。
- 同一产品内应使用同一套图标库和同一线宽风格。
- 不应使用 emoji 或临时字符作为正式 UI 图标。

## 4. 组件样式

PC 端企业级产品的组件体系应优先覆盖高频业务链路：导航定位、数据录入、数据展示、操作反馈、浮层承载和状态表达。组件样式应直接引用前文定义的颜色语义变量与排版样式，避免在组件内部新增临时色值或临时字号。

### 4.1 PC 端组件范围

| 类型 | 组件 | 主要用途 |
|---|---|---|
| 导航 Navigation | 侧边导航、顶部导航、面包屑、Tabs、步骤条 | 帮助用户定位当前位置、切换模块、理解流程进度 |
| 数据录入 Data Entry | Input、Textarea、Select、TreeSelect、Date Picker、Checkbox、Radio、Switch、Upload、Search | 完成筛选、表单填写、配置开关、文件提交 |
| 数据展示 Data Display | Table、Tree、Descriptions、List、Card、Tag、Badge、Tooltip、Popover、Statistic | 承载业务数据、详情信息、状态标签和辅助解释 |
| 操作反馈 Feedback | Alert、Message、Notification、Modal、Drawer、Progress、Skeleton、Empty | 反馈成功、失败、警告、加载、空状态和确认操作 |
| 操作 Action | Button、Dropdown、Pagination、Toolbar、Steps | 触发主要任务、批量操作、更多操作和分页浏览 |

### 4.2 通用组件变量

| 变量名 | 推荐值 | 功能说明 |
|---|---:|---|
| `component/height/sm` | `28px` | 紧凑按钮、紧凑输入框、表格小控件 |
| `component/height/md` | `32px` | PC 端默认控件高度 |
| `component/height/lg` | `40px` | 强操作按钮、大输入框、弹窗底部按钮 |
| `component/padding/xs` | `4px` | 图标按钮、标签内部间距 |
| `component/padding/sm` | `8px` | 小按钮、紧凑表格单元格 |
| `component/padding/md` | `12px` | 默认按钮、输入框横向内边距 |
| `component/padding/lg` | `16px` | 卡片、弹窗、抽屉内容区 |
| `component/border/width` | `1px` | 默认边框宽度 |
| `component/focus/ring` | `2px` | 聚焦外描边或阴影扩散范围 |

### 4.3 按钮 Button

按钮用于触发即时操作，主按钮只用于页面或区域内最重要的动作。一个操作区域中建议只有一个主按钮。

| 类型 | 背景 | 文字 | 边框 | 使用场景 |
|---|---|---|---|---|
| Primary 默认 | `action/primary/default` | `text/inverse` | `action/primary/default` | 提交、保存、确认、创建 |
| Primary Hover | `action/primary/hover` | `text/inverse` | `action/primary/hover` | 鼠标悬停 |
| Primary Active | `action/primary/active` | `text/inverse` | `action/primary/active` | 鼠标按下 |
| Primary Disabled | `action/primary/disabled` | `text/inverse` | `action/primary/disabled` | 不可点击 |
| Secondary 默认 | `action/secondary/default` | `action/secondary/text` | `border/default` | 次要操作、取消、返回 |
| Text / Link | `transparent` | `text/link` | `transparent` | 表格行内操作、轻量跳转 |
| Danger | `state/danger/text` | `text/inverse` | `state/danger/text` | 删除、撤销、清空等危险操作 |

按钮排版与尺寸：

| 尺寸 | 高度 | 横向内边距 | 字体样式 | 图标间距 |
|---|---:|---:|---|---:|
| Small | `28px` | `12px` | `button/medium` | `4px` |
| Medium | `32px` | `16px` | `button/medium` | `6px` |
| Large | `40px` | `20px` | `button/medium` | `8px` |

### 4.4 表单控件 Form Controls

表单控件包含 Input、Textarea、Select、Date Picker、Search 等。默认高度建议为 `32px`，用于保持 PC 端界面的信息密度。

| 状态 | 背景 | 文字 | 边框 | 说明 |
|---|---|---|---|---|
| 默认 | `background/surface` | `text/primary` | `border/default` | 常规可输入状态 |
| Hover | `background/surface` | `text/primary` | `border/strong` | 鼠标悬停 |
| Focus | `background/surface` | `text/primary` | `border/focus` | 输入中或已聚焦 |
| Error | `background/surface` | `text/primary` | `state/danger/text` | 校验失败 |
| Disabled | `action/secondary/default` | `text/tertiary` | `border/default` | 禁用不可编辑 |
| Placeholder | `background/surface` | `text/tertiary` | `border/default` | 占位提示 |

表单文字规则：

| 元素 | 字体样式 | 颜色 |
|---|---|---|
| Label | `body/regular` | `text/secondary` |
| 输入内容 | `body/regular` | `text/primary` |
| Placeholder | `body/regular` | `text/tertiary` |
| 帮助说明 | `caption` | `text/tertiary` |
| 错误说明 | `caption` | `state/danger/text` |

表单控件尺寸与内边距：

| 控件 | 高度 | 左内边距 | 右内边距 | 图标区域 | 说明 |
|---|---:|---:|---:|---:|---|
| Input | `32px` | `12px` | `12px` | 无 | 普通文本输入 |
| Input with Prefix | `32px` | `8px` | `12px` | `24px` | 左侧图标与文字间距 `6px` |
| Input with Suffix | `32px` | `12px` | `8px` | `24px` | 文字与右侧图标间距 `6px` |
| Select | `32px` | `12px` | `32px` | `24px` | 右侧箭头图标区域固定，图标距右边 `8px` |
| Date Picker | `32px` | `12px` | `32px` | `24px` | 日历图标区域固定，图标距右边 `8px` |
| Search | `32px` | `12px` | `32px` | `24px` | 搜索 / 清除图标与文字保持 `6px` 间距 |
| Textarea | 自适应 | `12px` | `12px` | 无 | 上下内边距建议 `8px` |

带图标控件规则：

- Select、Date Picker、Search 等带右侧图标的控件，右侧必须预留 `32px` 内容空间。
- 右侧图标视觉尺寸建议为 `16px`，图标距控件右边保持 `8px`。
- 输入文字与右侧图标之间至少保留 `8px` 安全间距，避免文字或占位内容贴近图标。
- 前缀 / 后缀图标与文字之间保持 `6px` 间距。
- 图标颜色默认使用 `text/tertiary`，Hover 或 Focus 时可使用 `text/secondary` 或 `text/brand`。
- 清除按钮、下拉箭头、日历图标应处于独立点击热区，不应只按图标视觉尺寸计算。

### 4.5 搜索与筛选 Search & Filter Bar

搜索与筛选是 PC 端列表页的核心入口，应保证条件组织清晰、默认条件克制、收起展开行为稳定。

| 元素 | 推荐样式 | 说明 |
|---|---|---|
| 筛选容器 | `background/surface`，边框 `border/default`，圆角 `radius/8` | 可独立成区，也可与表格容器合并 |
| 筛选项 Label | `body/regular` + `text/secondary` | 与控件保持 `8px` 间距 |
| 筛选控件 | 高度 `32px`，圆角 `radius/6` | 与表单控件保持一致 |
| 主查询按钮 | `action/primary/default` | 通常放在筛选区末尾 |
| 重置按钮 | `action/secondary/default` | 与查询按钮相邻 |
| 展开 / 收起 | `text/link` | 高级筛选项超过一行时使用 |

筛选区默认展示高频条件，低频条件折叠到“更多筛选”。筛选项过多时不应挤压表格主体空间。

### 4.6 选择类控件 Selection Controls

选择类控件包含 Checkbox、Radio、Switch、Segmented Control 等，用于表达选中、未选中和开关状态。

| 组件 | 默认状态 | 选中状态 | 禁用状态 |
|---|---|---|---|
| Checkbox | 边框 `border/default`，背景 `background/surface` | 背景 `action/primary/default`，勾选图标 `text/inverse` | 背景 `action/secondary/default`，边框 `border/default` |
| Radio | 边框 `border/default`，背景 `background/surface` | 边框 `action/primary/default`，内点 `action/primary/default` | 边框 `border/default`，内点 `text/tertiary` |
| Switch | 轨道 `neutral/300`，圆点 `neutral/0` | 轨道 `action/primary/default`，圆点 `neutral/0` | 轨道 `neutral/200`，圆点 `neutral/100` |
| Segmented | 背景 `action/secondary/default` | 选中项 `background/surface`，文字 `text/primary` | 文字 `text/tertiary` |

选择类控件的说明文字使用 `body/regular`，颜色使用 `text/primary`；辅助说明使用 `caption` 和 `text/tertiary`。

### 4.7 表格 Table

表格是 PC 端业务系统最高频的数据展示组件，应优先保证可读性、扫描效率和操作稳定性。

| 区域 | 背景 | 文字 | 边框 / 分割 | 字体样式 |
|---|---|---|---|---|
| 表头 | `neutral/100` | `text/secondary` | `border/default` | `body/medium` |
| 表体 | `background/surface` | `text/primary` | `border/default` | `body/regular` |
| 行 Hover | `background/subtle` | `text/primary` | `border/default` | `body/regular` |
| 选中行 | `action/primary/subtle` | `text/primary` | `border/brand` | `body/regular` |
| 空数据 | `background/surface` | `text/tertiary` | `border/default` | `body/regular` |
| 表格行内操作 | `transparent` | `text/link` | `transparent` | `body/regular` |

表格尺寸建议：

| 密度 | 行高 | 单元格横向内边距 | 使用场景 |
|---|---:|---:|---|
| 紧凑 | `36px` | `8px` | 数据量大、运维类列表 |
| 默认 | `44px` | `12px` | 常规管理后台 |
| 宽松 | `52px` | `16px` | 信息少、需要更强阅读性的列表 |

### 4.8 树 Tree / TreeSelect

Tree 与 TreeSelect 用于组织架构、权限配置、分类目录、区域层级等多级结构。层级关系应清晰，展开、选中和半选状态需要明确。

| 状态 | 背景 | 文字 | 图标 / 勾选 |
|---|---|---|---|
| 默认 | `transparent` | `text/primary` | `text/tertiary` |
| Hover | `action/secondary/default` | `text/primary` | `text/secondary` |
| Selected | `action/primary/subtle` | `text/brand` | `action/primary/default` |
| Disabled | `transparent` | `text/tertiary` | `text/tertiary` |
| Half checked | `background/surface` | `text/primary` | `action/primary/default` |

树节点高度建议为 `32px`，缩进步进建议为 `16px`。当层级超过 4 级时，应提供搜索或路径提示，避免用户在深层结构中迷失。

### 4.9 详情描述 Descriptions

Descriptions 用于展示详情页字段，不承担复杂编辑任务。字段和值应保持稳定对齐，便于扫描。

| 元素 | 字体 | 颜色 | 说明 |
|---|---|---|---|
| 字段名 | `body/regular` | `text/secondary` | 建议右对齐或固定宽度左对齐 |
| 字段值 | `body/regular` | `text/primary` | 重要值可使用 `body/medium` |
| 分组标题 | `title/card` | `text/primary` | 用于拆分信息区块 |
| 空值 | `body/regular` | `text/tertiary` | 统一使用 `--` 或明确空状态 |

详情页字段较多时应分组展示，不应让所有字段挤在一个大表格或单一长列表中。

### 4.10 上传 Upload

Upload 用于文件、图片、附件导入。上传区域需要清晰表达可点击、拖拽、进行中、成功和失败状态。

| 状态 | 背景 | 边框 | 文字 |
|---|---|---|---|
| 默认 | `background/surface` | `border/default` | `text/secondary` |
| Hover / Drag over | `background/subtle` | `border/focus` | `text/brand` |
| Uploading | `background/surface` | `border/focus` | `text/secondary` |
| Success | `state/success/background` | `state/success/text` | `state/success/text` |
| Error | `state/danger/background` | `state/danger/text` | `state/danger/text` |
| Disabled | `action/secondary/default` | `border/default` | `text/tertiary` |

上传组件应明确文件格式、大小限制和失败原因。批量上传时需要展示进度、可取消操作和失败重试入口。

### 4.11 步骤条 Steps

Steps 用于表达流程进度，如审批、开通、发布、配置向导。步骤状态应比装饰更重要。

| 状态 | 图标 / 序号 | 标题 | 说明 |
|---|---|---|---|
| Wait | `neutral/300` | `text/secondary` | 未开始步骤 |
| Process | `action/primary/default` | `text/primary` | 当前步骤 |
| Finish | `state/success/text` | `text/secondary` | 已完成步骤 |
| Error | `state/danger/text` | `state/danger/text` | 异常或阻断步骤 |

步骤标题使用 `body/medium`，说明使用 `caption`。步骤数量超过 5 个时，应考虑拆分流程或使用垂直步骤条。

### 4.12 卡片 Card

卡片用于承载独立信息分组，不应嵌套过多层卡片。页面级模块优先使用留白和分区，不应把所有区域都做成浮动卡片。

| 元素 | 推荐样式 |
|---|---|
| 背景 | `background/surface` |
| 边框 | `border/default` |
| 圆角 | `radius/8` |
| 标题 | `title/card` + `text/primary` |
| 正文 | `body/regular` + `text/primary` |
| 辅助信息 | `caption` + `text/tertiary` |
| 内边距 | 默认 `16px`，内容复杂时可用 `20px` |

### 4.13 导航 Navigation

导航组件包含侧边导航、顶部导航、面包屑和 Tabs。导航状态应明确表达当前位置，避免仅靠轻微文字颜色变化。

| 组件 | 默认 | Hover | Active / Selected |
|---|---|---|---|
| 侧边导航 | 文字 `text/secondary`，背景透明 | 背景 `action/secondary/default`，文字 `text/primary` | 背景 `action/primary/subtle`，文字 `text/brand` |
| 顶部导航 | 文字 `text/secondary` | 文字 `text/primary` | 文字 `text/brand`，底边 `border/brand` |
| 面包屑 | 文字 `text/tertiary` | 文字 `text/link` | 当前项 `text/primary` |
| Tabs | 文字 `text/secondary` | 文字 `text/primary` | 文字 `text/brand`，指示条 `action/primary/default` |

导航文字默认使用 `body/regular`；当前项或一级导航可使用 `body/medium`。

### 4.14 弹窗与浮层 Overlay

弹窗与浮层用于承载确认、详情、局部操作和临时说明。层级越高，越需要减少视觉噪音，保持聚焦。

| 组件 | 背景 | 标题 | 正文 | 边框 / 投影 |
|---|---|---|---|---|
| Modal | `background/elevated` | `heading/section` + `text/primary` | `body/regular` + `text/primary` | `shadow/color` |
| Drawer | `background/elevated` | `heading/section` + `text/primary` | `body/regular` + `text/primary` | `shadow/color` |
| Dropdown | `background/elevated` | `body/regular` | `body/regular` | `shadow/color` |
| Popover | `background/elevated` | `body/medium` | `body/regular` | `shadow/color` |
| Tooltip | `neutral/900` | 不使用标题 | `caption` + `text/inverse` | 无边框 |

遮罩使用 `overlay/default`。弹窗底部操作区应将主按钮放在右侧，危险操作需要与确认操作保持清晰区分。

### 4.15 反馈与状态 Feedback

反馈组件用于表达系统状态，不应只通过颜色传达结果，应搭配图标或明确文案。

| 组件 | 背景 | 文字 | 使用场景 |
|---|---|---|---|
| Alert Info | `state/info/background` | `state/info/text` | 普通信息、系统说明 |
| Alert Success | `state/success/background` | `state/success/text` | 成功提交、流程完成 |
| Alert Warning | `state/warning/background` | `state/warning/text` | 风险提示、待确认事项 |
| Alert Error | `state/danger/background` | `state/danger/text` | 操作失败、校验阻断 |
| Message | `background/elevated` | `text/primary` | 轻量即时反馈 |
| Notification | `background/elevated` | `text/primary` | 较复杂的系统通知 |
| Progress | `action/primary/default` | `text/secondary` | 上传、处理进度 |
| Skeleton | `neutral/100` / `neutral/200` | 不使用文字 | 页面或列表加载中 |
| Empty | `background/surface` | `text/tertiary` | 无数据、无搜索结果 |

### 4.16 标签与徽标 Tag & Badge

标签用于表达分类、属性和状态；徽标用于提示数量或未读状态。

| 类型 | 背景 | 文字 | 边框 |
|---|---|---|---|
| 默认标签 | `action/secondary/default` | `text/secondary` | `border/default` |
| 品牌标签 | `action/primary/subtle` | `text/brand` | `border/brand` |
| 信息标签 | `state/info/background` | `state/info/text` | `state/info/text` |
| 成功标签 | `state/success/background` | `state/success/text` | `state/success/text` |
| 警告标签 | `state/warning/background` | `state/warning/text` | `state/warning/text` |
| 错误标签 | `state/danger/background` | `state/danger/text` | `state/danger/text` |
| 数字徽标 | `state/danger/text` | `text/inverse` | 无 |

标签文字使用 `label/medium`，高度建议为 `24px`；徽标数字使用 `caption`，最小宽度不小于高度。

### 4.17 分页 Pagination

分页用于列表与表格的数据浏览。分页控件默认放在数据区域底部右侧，复杂列表可在左侧补充总数说明。

| 状态 | 背景 | 文字 | 边框 |
|---|---|---|---|
| 默认 | `background/surface` | `text/secondary` | `border/default` |
| Hover | `background/subtle` | `text/brand` | `border/focus` |
| 当前页 | `action/primary/default` | `text/inverse` | `action/primary/default` |
| Disabled | `action/secondary/default` | `text/tertiary` | `border/default` |

分页字号使用 `body/regular`，控件高度建议为 `32px`。

### 4.18 组件使用规则

- 每个页面区域只保留一个主要操作，其他操作使用次级按钮、文本按钮或下拉菜单承载。
- 表单、表格、筛选区使用统一控件高度，默认采用 `32px`。
- 表格行内操作不应超过 3 个，超过时使用 `Dropdown` 收纳。
- 弹窗用于强确认或短流程，复杂编辑任务优先使用 `Drawer` 或独立页面。
- 状态色只用于明确状态，不用于普通装饰。
- 组件文本应优先使用语义排版样式，不在组件内部临时定义字号。
- Disabled 状态需要同时降低文字、边框和背景对比，但仍需保持可识别。
- Focus 状态必须可见，优先使用 `border/focus` 或 `component/focus/ring`。

## 5. 布局原则

布局系统用于保证页面结构稳定、信息密度一致、模块关系清晰。PC 端企业级界面应优先服务高频任务、批量操作和数据扫描，不应使用过度松散或营销化的布局方式。

### 5.1 间距标准

| Token | 值 | 使用场景 |
| --- | --- | --- |
| `space/4` | `4px` | 图标与文字微间距、紧凑控件内部间距 |
| `space/8` | `8px` | 按钮图文间距、表单控件内部组合间距 |
| `space/12` | `12px` | 表格单元格横向间距、列表项内部间距 |
| `space/16` | `16px` | 默认模块间距、表单项垂直间距、卡片内边距 |
| `space/20` | `20px` | 弹窗内容区、复杂卡片内容区 |
| `space/24` | `24px` | 页面主内容边距、模块分区间距 |
| `space/32` | `32px` | 页面大区块分隔、顶部内容留白 |
| `space/40` | `40px` | 低密度说明区、复杂页面的主要分区 |

间距使用规则：

- PC 端默认以 `8px` 为基础步进，常规间距优先使用 `8 / 16 / 24 / 32`。
- 表单项之间默认使用 `16px`，表单 Label 与控件之间使用 `8px`。
- 表格单元格默认横向内边距为 `12px`，高密度表格可收缩到 `8px`。
- 卡片内容默认内边距为 `16px`，弹窗和抽屉内容区可使用 `20px` 或 `24px`。
- 不应使用无规律的临时数值，如 `13px`、`17px`、`27px`。

### 5.2 圆角规范

圆角用于表达界面元素的亲和度、层级和可点击感。本设计系统采用克制的圆角体系，整体风格保持专业、清晰、稳定，避免过度圆润造成消费化或低龄化感受。

| 变量名 | 值 | 使用场景 |
|---|---:|---|
| `radius/0` | `0px` | 表格内部网格线、贴边分割、需要严肃感的结构边界 |
| `radius/2` | `2px` | 极小标记、进度条、色块、细小状态指示 |
| `radius/4` | `4px` | 标签、Checkbox、紧凑按钮、小型输入控件 |
| `radius/6` | `6px` | 默认按钮、Input、Select、Date Picker、分页控件 |
| `radius/8` | `8px` | Card、Modal、Drawer、Popover、Dropdown、Table 外容器 |
| `radius/12` | `12px` | 数据概览卡片、强调型容器、轻量引导模块 |
| `radius/full` | `999px` | Badge、Pill Tag、Switch 圆点、头像、圆形图标按钮 |

圆角使用规则：

- PC 端默认控件圆角使用 `radius/6`。
- 卡片、弹窗、抽屉、浮层默认使用 `radius/8`。
- 表格内部单元格不单独设置圆角，仅表格外容器可使用 `radius/8`。
- 标签类组件可使用 `radius/4` 或 `radius/full`，但同一产品内应保持一致。
- 强业务系统不建议大量使用 `radius/12` 以上圆角。
- `radius/full` 仅用于胶囊形、圆形或强状态标记，不应用于普通按钮和卡片。
- 圆角不应与边框、阴影冲突；有阴影的浮层应保持清晰边界。

### 5.3 栅格系统

PC 端布局建议使用 24 栅格体系，便于处理管理后台常见的多列筛选、卡片组合和详情信息排布。

| 项目 | 建议值 | 说明 |
|---|---:|---|
| 栅格列数 | `24` | 适合企业级复杂页面，兼容 2、3、4、6、8、12 等分栏 |
| 页面最小宽度 | `1280px` | 常规 PC 后台建议最低适配宽度 |
| 内容最大宽度 | `1440px` / `1600px` | 数据密集型页面可铺满，阅读型页面应限制宽度 |
| 栅格间距 Gutter | `16px` / `24px` | 默认 `16px`，宽松页面可使用 `24px` |
| 页面边距 | `24px` / `32px` | 常规页面 `24px`，大屏或看板 `32px` |

常用分栏：

| 布局 | 栅格占比 | 使用场景 |
|---|---|---|
| 单栏 | `24` | 表格列表、详情页、配置页 |
| 双栏等分 | `12 + 12` | 对比信息、左右表单 |
| 主次双栏 | `16 + 8` / `18 + 6` | 主内容 + 侧栏信息 |
| 三栏 | `8 + 8 + 8` | 指标卡片、概览模块 |
| 四栏 | `6 + 6 + 6 + 6` | 数据看板、快捷入口 |
| 筛选 + 内容 | 固定筛选区 + 自适应内容区 | 高级筛选、列表页 |

### 5.4 留白运用理念

留白用于表达信息关系，而不是简单扩大页面空隙。企业级界面的留白应帮助用户更快完成任务。

- **同组信息靠近**：标题、说明、操作按钮应与所属内容保持紧密关系。
- **异组信息拉开**：不同模块之间使用更大的间距，避免用户误认为属于同一组。
- **操作区保持稳定**：主操作、批量操作、分页等区域位置应稳定，减少重复使用时的寻找成本。
- **高频页面不做过度留白**：表格、筛选、配置页面应保持中高密度。
- **阅读型页面适当收窄**：说明文档、详情文本、审批意见等长文本不应横向铺满。

### 5.5 页面结构建议

| 页面类型 | 推荐结构 | 说明 |
|---|---|---|
| 列表页 | 页面标题区 + 筛选区 + 操作栏 + 表格 + 分页 | 适合大多数业务管理页面 |
| 详情页 | 标题区 + 状态摘要 + 信息分组 + 操作区 | 信息分组应清晰，避免一屏内堆叠过多字段 |
| 表单页 | 标题区 + 表单分组 + 底部操作栏 | 长表单建议分组或使用步骤条 |
| 看板页 | 指标区 + 趋势区 + 明细区 | 先展示关键指标，再展示分析和明细 |
| 配置页 | 侧边配置导航 + 配置内容 + 保存操作 | 保存操作应固定或保持可见 |

## 6. 深度与层次

深度系统用于表达界面表面的前后关系。PC 端界面不应依赖强烈阴影制造装饰感，而应通过背景、边框、阴影和遮罩共同建立层级。

### 6.1 表面层级

| 层级 | 名称 | 背景 | 边框 | 阴影 | 使用场景 |
|---|---|---|---|---|---|
| Level 0 | Page | `background/page` | 无 | 无 | 页面底色 |
| Level 1 | Surface | `background/surface` | `border/default` | 无或极弱 | 表格、卡片、表单容器 |
| Level 2 | Raised | `background/elevated` | `border/default` | `shadow/sm` | 下拉菜单、轻量浮层 |
| Level 3 | Overlay | `background/elevated` | 无或 `border/default` | `shadow/md` | Popover、Date Picker、Select 下拉 |
| Level 4 | Modal | `background/elevated` | 无 | `shadow/lg` + `overlay/default` | Modal、Drawer、全局确认 |

### 6.2 阴影体系

| 变量名 | 推荐值 | 使用场景 |
|---|---|---|
| `shadow/sm` | `0 2px 8px rgba(15, 42, 92, 0.08)` | 下拉、轻量浮层、悬浮卡片 |
| `shadow/md` | `0 6px 16px rgba(15, 42, 92, 0.12)` | Popover、Date Picker、Select 下拉 |
| `shadow/lg` | `0 12px 32px rgba(15, 42, 92, 0.16)` | Modal、Drawer、复杂浮层 |
| `shadow/focus` | `0 0 0 2px rgba(44, 104, 255, 0.16)` | 输入框、按钮、选择器聚焦 |

阴影使用规则：

- 常规卡片优先使用边框而不是阴影。
- 浮层必须有明确的层级差异，可使用阴影或遮罩表达。
- 阴影颜色统一基于 `shadow/color`，避免使用纯黑高透明阴影。
- 页面中不应出现大量同等级强阴影，会削弱层级判断。
- Modal 和 Drawer 必须配合 `overlay/default` 使用，避免与页面内容混淆。

### 6.3 层级关系

| 界面元素 | 建议层级 | 说明 |
|---|---:|---|
| 页面背景 | Level 0 | 承载全局底色 |
| 表格 / 卡片 / 表单容器 | Level 1 | 页面主要内容表面 |
| 固定工具栏 / Sticky 表头 | Level 2 | 与内容保持分离但不打断任务 |
| Dropdown / Tooltip / Popover | Level 2-3 | 临时信息或操作集合 |
| Drawer / Modal | Level 4 | 阻断或半阻断任务 |
| Toast / Message | Level 4 | 全局即时反馈，显示时间短 |

## 7. 设计准则与禁忌

### 7.1 必须遵循

- 使用语义变量而不是直接使用色值，组件内优先引用 `text/*`、`background/*`、`border/*`、`action/*`。
- 文字层级必须来自排版样式，不应临时创建相近字号。
- 页面中主操作必须明确，主按钮数量应受到控制。
- 表格、表单、筛选区应保持统一控件高度和统一对齐方式。
- 交互状态必须完整覆盖默认、Hover、Active、Focus、Disabled、Error。
- 错误、警告、成功状态必须配合文案或图标，不得只依赖颜色。
- 信息分组应通过标题、间距、边框或背景建立，不应只靠位置猜测。
- 所有可交互元素必须有可见的 Hover 或 Focus 状态。

### 7.2 禁止与避免

| 反模式 | 问题 | 正确做法 |
|---|---|---|
| 在业务页面直接使用基础色值 | 后续维护和换肤困难 | 使用语义变量 |
| 多个主按钮并列 | 用户无法判断优先级 | 一个主按钮 + 次级按钮 |
| 用危险色做普通强调 | 状态语义被破坏 | 普通强调使用 `text/brand` |
| 表格行内操作过多 | 扫描效率下降 | 超过 3 个操作收进 Dropdown |
| 大面积使用品牌蓝背景 | 视觉疲劳、层级过重 | 品牌蓝用于关键操作和选中态 |
| 卡片嵌套卡片 | 层级混乱、空间浪费 | 使用分组标题、分割线或间距 |
| 小字号使用浅灰 | 可读性不足 | 正文使用 `text/primary` 或 `text/secondary` |
| 页面过度留白 | 降低 PC 端任务效率 | 采用中高密度布局 |
| 临时新增相近颜色 | 设计系统失控 | 先判断现有 token 是否可覆盖 |
| 弹窗承载复杂长流程 | 操作空间不足 | 使用 Drawer 或独立页面 |

### 7.3 可访问性要求

- 正文和关键操作文本应满足足够的明度对比，不应使用 `text/tertiary` 承载重要信息。
- Focus 状态必须可被键盘用户识别。
- 错误信息需要明确指出问题和修正方式。
- 禁用状态不应作为隐藏信息的手段，必要时应说明禁用原因。
- 图标按钮必须有可理解的文本标签或 Tooltip。

### 7.4 设计交付与开发实现约定

设计规范需要同时服务 Figma 设计资产和代码实现。设计交付时应确保变量、组件状态和页面结构能够被开发稳定复现。

| 约定 | 说明 |
|---|---|
| Token 命名 | Figma 变量使用 `/` 分层，代码侧可转换为 kebab-case，如 `text/primary` 对应 `--color-text-primary` |
| 颜色引用 | 组件和页面不得直接写死 hex，必须优先引用语义变量 |
| 字体引用 | 页面文字必须使用语义排版样式，如 `body/regular`、`heading/page` |
| 圆角引用 | 组件统一引用 `radius/*`，不得再新增 `component/radius/*` 这类重复 token |
| 状态覆盖 | 组件交付需覆盖 default、hover、active、focus、disabled、error 等必要状态 |
| 组件标注 | 复杂组件需标注尺寸、高度、间距、状态和使用限制 |
| 新增 Token | 只有现有 token 无法覆盖稳定语义时才允许新增，新增时需补齐命名、值、用途和禁用场景 |
| 设计与代码同步 | Figma 变量变更后，应同步更新代码 token、组件样式和文档说明 |

实现建议：

- 基础变量用于定义原子值，语义变量用于组件和页面调用。
- 组件样式中不应引用业务名称作为 token，如 `finance-blue`、`approval-red`。
- 新增状态色时应同时补充浅背景、文字 / 图标色和使用规则。
- 开发侧应保留 token 映射表，避免设计变量和 CSS 变量各自演化。
- 视觉走查时应重点检查颜色、字号、圆角、阴影、间距和交互状态是否来自规范。

## 8. 响应式行为

PC 端规范应优先覆盖桌面宽度，同时兼容窄屏笔记本、平板横屏和移动查看场景。响应式策略应围绕“保留任务主线、降低横向拥挤、优先保证可操作”展开。

### 8.1 断点设置

| 断点 | 宽度范围 | 设备 / 场景 | 布局策略 |
|---|---:|---|---|
| `screen/xs` | `< 576px` | 手机查看 | 单栏布局，复杂表格转卡片或横向滚动 |
| `screen/sm` | `576px - 767px` | 大屏手机、小平板 | 单栏为主，筛选项折叠 |
| `screen/md` | `768px - 991px` | 平板竖屏 | 双栏谨慎使用，导航可折叠 |
| `screen/lg` | `992px - 1199px` | 小屏笔记本 | 保持 PC 结构，减少列数 |
| `screen/xl` | `1200px - 1599px` | 标准桌面 | 默认 PC 布局 |
| `screen/xxl` | `>= 1600px` | 大屏桌面 | 增加内容宽度或展示更多辅助信息 |

### 8.2 触控目标尺寸

| 场景 | 最小尺寸 | 建议尺寸 |
|---|---:|---:|
| 鼠标操作控件 | `28px` | `32px` |
| 触控操作控件 | `40px` | `44px` |
| 图标按钮 | `28px` | `32px` |
| 移动端图标按钮 | `40px` | `44px` |
| 表格行点击区域 | `36px` | `44px` |

触控规则：

- 当页面进入 `md` 以下宽度时，按钮和表单控件建议提升到 `40px`。
- 图标按钮必须保留足够点击热区，不应只按图标视觉尺寸计算。
- 表格内密集操作在窄屏下应收纳为更多菜单。

### 8.3 布局调整策略

| 模块 | 桌面端 | 窄屏 / 移动 |
|---|---|---|
| 侧边导航 | 固定展开或可折叠 | 抽屉式导航或顶部菜单 |
| 顶部筛选区 | 多列横向排列 | 折叠为单列或“更多筛选” |
| 表格 | 多列展示，支持固定列 | 重要列保留，次要列隐藏、折叠或卡片化 |
| 卡片网格 | 3-4 列 | 1-2 列 |
| 表单 | 2-3 列 | 单列 |
| 弹窗 | 居中固定宽度 | 接近全屏或改用 Drawer |
| 操作栏 | 横向排列 | 主操作保留，次操作收纳 |

### 8.4 表格响应式原则

- 业务关键字段优先保留，如名称、状态、时间、主要操作。
- 次要字段可隐藏到展开行、详情抽屉或卡片详情中。
- 金额、数量、状态等字段应保持对齐规则，不因响应式改变含义。
- 横向滚动仅作为复杂数据表的兜底方案，不应成为所有窄屏页面的默认方案。

## 9. 智能体提示指南

本章节用于帮助 AI 设计智能体、设计生成工具或代码生成智能体快速理解并复用本设计系统。

### 9.1 快速色彩参考

| 场景 | 优先使用 |
|---|---|
| 页面背景 | `background/page` = `#F7F9FD` |
| 内容容器 | `background/surface` = `#FFFFFF` |
| 主操作 | `action/primary/default` = `#2C68FF` |
| 主操作 Hover | `action/primary/hover` = `#1F54D9` |
| 主操作 Disabled | `action/primary/disabled` = `#8EAEFF` |
| 链接 | `text/link` = `#2C68FF` |
| 一级文字 | `text/primary` = `#0F172A` |
| 二级文字 | `text/secondary` = `#475569` |
| 弱提示 | `text/tertiary` = `#94A3B8` |
| 默认边框 | `border/default` = `#DDE5F0` |
| 聚焦边框 | `border/focus` = `#5F89FF` |
| 信息 | `state/info/text` = `#2C68FF` |
| 成功 | `state/success/text` = `#16A34A` |
| 警告 | `state/warning/text` = `#F59E0B` |
| 错误 / 危险 | `state/danger/text` = `#DC2626` |

### 9.2 快速字体参考

| 场景 | 使用样式 |
|---|---|
| 页面标题 | `heading/page`：`24px / 32px / 600` |
| 模块标题 | `heading/section`：`20px / 28px / 500` |
| 卡片标题 | `title/card`：`16px / 24px / 500` |
| 正文 | `body/regular`：`14px / 22px / 400` |
| 强调正文 | `body/medium`：`14px / 22px / 500` |
| 标签 | `label/medium`：`12px / 18px / 500` |
| 按钮 | `button/medium`：`14px / 22px / 500` |
| 说明文字 | `caption`：`12px / 18px / 400` |

### 9.3 通用生成提示语

```text
请基于企业级 PC 端设计系统生成界面。整体风格清晰、专业、克制，主色使用 #2C68FF，中性色使用带蓝色倾向的灰阶。页面背景使用 background/page，内容容器使用 background/surface。正文使用 PingFang SC，默认 body/regular 为 14px / 22px / 400。主按钮使用 action/primary/default，边框使用 border/default，聚焦态使用 border/focus。布局采用 24 栅格体系，默认页面边距 24px，模块间距 16-24px。
```

### 9.4 列表页生成提示语

```text
生成一个 PC 端企业后台列表页。页面结构包含标题区、筛选区、操作栏、数据表格和分页。筛选控件高度 32px，表格默认行高 44px，表头背景使用 neutral/100，表格边框使用 border/default。主操作按钮使用 action/primary/default，次级操作使用 action/secondary/default。行内操作使用 text/link，超过 3 个操作收纳到 Dropdown。
```

### 9.5 表单页生成提示语

```text
生成一个 PC 端表单页面。使用 PingFang SC 字体，表单 Label 使用 text/secondary，输入内容使用 text/primary，占位文字使用 text/tertiary。输入框默认边框为 border/default，聚焦边框为 border/focus，错误边框为 state/danger/text。表单项垂直间距 16px，分组之间 24px，底部操作区包含一个主按钮和一个次级按钮。
```

### 9.6 看板页生成提示语

```text
生成一个 PC 端数据看板页面。页面背景使用 background/page，指标卡片使用 background/surface 和 border/default。关键数字使用 display/data，颜色可使用 text/primary 或 text/brand。卡片圆角 8px，内边距 16px。图表区域保持克制，不使用大面积品牌蓝，主色只用于关键趋势、选中态和高亮数据。
```

### 9.7 禁忌提示语

```text
不要使用大面积渐变背景，不要使用过度装饰性的卡片堆叠，不要在一个区域放置多个主按钮，不要直接使用临时色值，不要用浅灰承载重要正文，不要让错误、成功、警告状态只依赖颜色表达。PC 端页面应保持中高信息密度，避免营销页式的大标题和过度留白。
```
