# Vue 3 前端开发规范

## 一、项目目录结构

遵循“按功能分层，页面与组件分离”原则，推荐统一目录：

```text
src/
├── api/                # 接口请求层（按模块拆分）
│   ├── request.ts      # axios 实例、拦截器
│   └── modules/        # 业务接口模块
├── assets/             # 静态资源（图片、字体、图标）
├── components/         # 全局公共组件
│   └── BaseButton.vue
├── composables/        # 组合式函数（复用逻辑）
│   └── useAuth.ts
├── directives/         # 全局自定义指令
├── layouts/            # 布局组件
│   ├── DefaultLayout.vue
│   └── AdminLayout.vue
├── router/             # 路由配置
│   ├── index.ts
│   └── routes.ts
├── store/              # Pinia 状态管理
│   └── modules/
├── styles/             # 全局样式、变量、混入
│   ├── variables.scss
│   └── global.scss
├── types/              # TypeScript 全局类型声明
│   ├── global.d.ts
│   └── api.d.ts
├── utils/              # 工具函数
├── views/              # 页面组件（按路由划分）
│   ├── home/
│   │   ├── index.vue
│   │   └── components/ # 页面私有组件
│   └── user/
├── App.vue
└── main.ts
```

- `components/` 放置跨页面复用的组件，页面私有组件放在对应 `views/[page]/components/` 下。
- 不提倡在 `components/` 下按业务再设深层次子目录，除非组件数量巨大且有清晰边界。

---

## 二、命名规范

### 1. 文件与目录
- **组件文件**：一律使用 **PascalCase**（大驼峰），如 `UserCard.vue`、`BaseTable.vue`。
- **页面文件**：推荐 `kebab-case` 或与路由名对应的小写，如 `user-profile/index.vue`。
- **Composable**：使用 `use` 前缀 + camelCase，文件名如 `useAuth.ts`。
- **工具 / 常量 / 类型文件**：camelCase 或 kebab-case，如 `formatDate.ts`、`api-types.ts`。
- **目录名**：kebab-case，如 `user-profile/`。

### 2. 变量、函数与常量
- **变量 / 函数**：camelCase（驼峰），如 `userName`、`handleSubmit`。
- **常量**：UPPER_SNAKE_CASE（全大写蛇形），如 `MAX_RETRY_COUNT`。
- **类型与接口**：PascalCase，如 `UserInfo`，且建议以 `I` 前缀或无前缀，团队自定，如 `IUserInfo` 或 `UserInfo`。

### 3. CSS 类名
- 推荐 **BEM** 或 **组件作用域 + kebab-case**。  
  例：`.user-card__title--active`，核心保证不污染全局。

---

## 三、Vue 组件规范

### 1. 统一使用 `<script setup>`
所有新组件都必须使用 `<script setup>` 语法，享受更精简的代码与更好的 TypeScript 支持。

**结构顺序：**
```vue
<script setup lang="ts">
// 逻辑代码
</script>

<template>
  <!-- 模板 -->
</template>

<style scoped lang="scss">
/* 样式 */
</style>
```

### 2. Props 与 Emits
- 使用 `defineProps` 与 `defineEmits`，并尽量与 TypeScript 类型结合：
```typescript
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'close'): void
}>()
```

- 对于复杂运行时校验，可保留运行时声明，但类型优先。

### 3. 模板规范
- 指令使用简写：`:` (v-bind)、`@` (v-on)、`#` (v-slot)。
- 多属性时，按以下顺序排列：  
  `v-for` → `v-if`/`v-show` → `id` → `ref` → `key` → 普通属性 → 事件 → 指令。
- 属性较多时（超过 3 个）换行，每个属性一行，结尾 `>` 单独一行。
- 避免在模板中写复杂表达式，使用 computed 或方法。
- `v-for` 必须绑定唯一 `key`，且不要用索引。

### 4. 组件通信
- **父传子**：Props。
- **子传父**：Emits。
- **跨层级**：优先使用 `provide/inject`，但仅在明确的 “组件树” 内部使用，不推荐作为全局状态管理。
- **全局状态**：使用 Pinia。
- 避免直接调用子组件方法（Template Refs 用于聚焦等少数场景），保持单向数据流。

---

## 四、组合式 API 与 Composables

### 1. 编写原则
- 所有可复用逻辑必须写成 composable，函数命名以 `use` 开头。
- 返回值使用 `ref` / `reactive`，对于对象类型，如需解构，使用 `toRefs` 包裹，避免丢失响应式。
- Composables 应该是 **纯逻辑**，不包含模板或样式。
- 明确 composable 的副作用（如事件监听、定时器），在必要时使用 `onUnmounted` 清理。

**示例：**
```typescript
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e: MouseEvent) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

### 2. 响应式 API 选择
- **基本类型 / 需要在解构后保持响应式** → `ref`。
- **整体一个对象且不频繁解构** → `reactive`，但必须注意解构丢失响应式，此时使用 `toRefs`。
- `computed` 用于派生状态，禁止在里面执行副作用或异步操作。
- `watch` / `watchEffect` 用于副作用，避免过度使用，优先考虑 computed。

---

## 五、TypeScript 规范

- 所有 `.vue`、`.ts` 文件使用严格的 TypeScript 配置（`"strict": true`）。
- 使用 `interface` 定义数据结构，`type` 用于联合类型或工具类型。
- 给 composable 函数显式定义返回类型。
- Props、Emits、Provide/Inject 需提供类型参数。
- `ref` 使用泛型标注包裹类型：
  ```typescript
  const count = ref<number>(0)
  const user = ref<UserInfo | null>(null)
  ```
- 模板中访问变量时，通过类型推断自动获得类型守卫。

---

## 六、状态管理（Pinia）

- 统一使用 **Pinia**，不再使用 Vuex。
- Store 名以 `use` 开头 + `Store` 结尾，如 `useUserStore`。
- 使用 **组合式 API 风格**（setup stores）编写 Store，使其更贴近组件的书写方式。

**示例：**
```typescript
// store/useCounterStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, double, increment }
})
```

- 复杂项目按模块拆分 store，统一从 `store/modules` 导出。
- Store 中避免放入组件特定的 UI 状态。

---

## 七、路由规范

- 使用 Vue Router 4，路由配置文件放在 `router/routes.ts`，主文件 `index.ts` 负责创建路由实例。
- 页面组件使用**懒加载**：
  ```typescript
  const Home = () => import('@/views/home/index.vue')
  ```
- 路由命名使用 `kebab-case` 或和功能一致，由团队约定。
- 路由 `meta` 中存放权限、标题、缓存等信息，保持结构的稳定。
- 如有路由守卫，统一在 `router/guards.ts` 中编写，保持入口文件简洁。

---

## 八、样式规范

- **开启 scoped**：所有组件样式必须加 `scoped` 属性，防止全局污染。
- 修改子组件样式时，使用 **`:deep()` 深度选择器**：
  ```scss
  .parent :deep(.child-class) { ... }
  ```
- 推荐使用 **SCSS**，利用变量和混入统一视觉规范。
- 全局 BEM 风格：块名以组件为大写前缀，如 `UserCard` 的根类名可为 `user-card`。
- 禁止使用 `!important` 除非特殊覆盖第三方库样式。
- 样式回退与响应式设计应遵循移动优先原则。

---

## 九、API 请求与错误处理

- 在 `api/request.ts` 中封装 axios 实例，统一处理 token、超时、错误提示。
- 按业务模块拆分请求函数，返回值使用 Promise，显式定义返回类型。
- 对于 API 错误，统一在拦截器中进行 toast 提示，并抛出业务错误码。
- composable 或组件中调用 API 时，搭配 `try-catch` 或 `.catch()`，避免未捕获的异常。

---

## 十、代码质量工具

### 1. ESLint + Prettier
- 使用 `eslint-plugin-vue`、`@typescript-eslint/parser` 进行 lint。
- 规则集推荐：
  - `plugin:vue/vue3-essential` (或 `vue3-strongly-recommended`)
  - `@vue/typescript/recommended`
- Prettier 统一格式化，配置 `.prettierrc` 与 ESLint 规则不冲突（使用 `eslint-config-prettier`）。

## 十一、性能优化

- 路由懒加载、组件异步加载 (`defineAsyncComponent`)。
- 大型列表使用虚拟滚动 (vue-virtual-scroller)。
- 避免在模板中使用直接调用方法（每次渲染都会执行），改用 computed。
- 减少不必要的响应式数据，对于仅展示一次且不变的数据，使用 `shallowRef` 或 `Object.freeze`。
- 合理使用 `v-memo` 和 `v-once` 来控制子树更新。
- 图片懒加载、静态资源 CDN 化。

---

## 十二、其他要点

- **环境变量**：通过 `.env` 文件管理，使用 `import.meta.env.VITE_XXX` 访问，禁止硬编码。
- **国际化**（若有）：使用 `vue-i18n`，文案键值按模块划分。
- **目录导入**：统一使用 `@/` 别名指向 `src` 目录，避免大量 `../../`。
- **组件 export**：公共组件必须在 `components/index.ts` 中统一注册或导出，方便批量引入。

---