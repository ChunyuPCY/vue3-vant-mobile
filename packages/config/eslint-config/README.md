# @vue3-vant-mobile/eslint-config

共享的 ESLint 配置包，基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 封装，为 vue3-vant-mobile monorepo 提供统一的代码规范。

## 安装

在子包的 `package.json` 中添加依赖：

```json
{
  "devDependencies": {
    "@vue3-vant-mobile/eslint-config": "workspace:*"
  }
}
```

然后运行：

```bash
pnpm install
```

## 使用

### 基础用法

创建 `eslint.config.ts`（或 `.mjs`）：

```typescript
import { createEslintConfig } from "@vue3-vant-mobile/eslint-config";

export default await createEslintConfig({
  vue: true,
  typescript: true,
  formatters: true,
});
```

### 高级配置

```typescript
import { createEslintConfig } from "@vue3-vant-mobile/eslint-config";

export default await createEslintConfig({
  // 启用 Vue 支持
  vue: true,

  // 启用 TypeScript 支持
  typescript: true,

  // 启用 UnoCSS 支持
  unocss: true,

  // 启用代码格式化
  formatters: true,

  // 自定义规则（会覆盖默认规则）
  rules: {
    "no-console": "warn",
    "vue/max-attributes-per-line": ["error", { singleline: 3, multiline: 1 }],
  },

  // 额外的忽略文件
  ignores: ["some-custom-folder/**"],
});
```

## 配置选项

| 选项         | 类型                  | 默认值  | 说明                     |
| ------------ | --------------------- | ------- | ------------------------ |
| `vue`        | `boolean`             | `true`  | 是否启用 Vue 支持        |
| `typescript` | `boolean`             | `true`  | 是否启用 TypeScript 支持 |
| `unocss`     | `boolean`             | `false` | 是否启用 UnoCSS 支持     |
| `formatters` | `boolean`             | `true`  | 是否启用代码格式化       |
| `rules`      | `Record<string, any>` | `{}`    | 自定义规则，覆盖默认规则 |
| `ignores`    | `string[]`            | `[]`    | 额外的忽略文件模式       |

## 默认行为

- **自动关闭的规则**：
  - `perfectionist/sort-imports`
  - `perfectionist/sort-exports`
  - `perfectionist/sort-named-exports`

- **默认忽略的文件**：
  - `.github/**`
  - `.turbo/**`
  - `node_modules/**`
  - `dist/**`

## 示例

### Web 应用配置

[apps/web/eslint.config.ts](../../apps/web/eslint.config.ts)：

```typescript
import { createEslintConfig } from "@vue3-vant-mobile/eslint-config";

export default await createEslintConfig({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: true,
});
```

### 根目录配置

[eslint.config.mjs](../../eslint.config.mjs)：

```javascript
import { createEslintConfig } from "@vue3-vant-mobile/eslint-config";

export default await createEslintConfig({
  vue: true,
  typescript: true,
  formatters: true,
  unocss: false,
  ignores: [
    "apps/**",
    "packages/**",
    ".turbo/**",
    "node_modules/**",
    "dist/**",
  ],
});
```

## 开发

### 构建

```bash
pnpm build
```

### 开发模式（监听变化）

```bash
pnpm stub
```

## 更新日志

- **v0.0.0** - 初始版本，基于 @antfu/eslint-config 封装
