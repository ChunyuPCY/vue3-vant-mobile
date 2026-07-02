# ESLint Monorepo 配置（使用 @antfu/eslint-config）

## ✅ 最终方案

本项目**继续使用 `@antfu/eslint-config`**，参考 vue-vben-admin 的 monorepo 最佳实践进行优化。

---

## 📋 核心配置

### 1. 根目录 ESLint 配置

**文件：** [eslint.config.mjs](file://eslint.config.mjs)

```javascript
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: true,
  },
  {
    rules: {
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',
    },
  },
  {
    ignores: [
      'apps/**',
      'packages/**',
      '.turbo/**',
      'node_modules/**',
      'dist/**',
    ],
  },
)
```

**关键点：**

- 忽略所有子包目录（apps/**, packages/**）
- 子包有自己独立的 eslint 配置
- 根目录只管理根级文件

### 2. 子包 ESLint 配置

**文件：** [apps/web/eslint.config.ts](file://apps/web/eslint.config.ts)

```typescript
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',
    },
  },
  {
    ignores: ['.github/**'],
  },
)
```

### 3. pnpm Catalogs 统一管理

**文件：** [pnpm-workspace.yaml](file://pnpm-workspace.yaml)

```yaml
catalogs:
  lint:
    '@antfu/eslint-config': 9.0.0
    '@unocss/eslint-config': 66.7.2
    eslint: ^10.5.0
    eslint-plugin-format: ^2.0.1
    prettier: ^3.0.0

  git:
    '@commitlint/cli': ^21.0.2
    lint-staged: ^17.0.8
    # ... 其他 git 工具
```

**根目录 package.json：**

```json
{
  "devDependencies": {
    "@antfu/eslint-config": "catalog:lint",
    "eslint": "catalog:lint"
  }
}
```

**子包 package.json：**

```json
{
  "devDependencies": {
    "@antfu/eslint-config": "catalog:lint",
    "eslint": "catalog:lint"
  }
}
```

### 4. lint-staged 优化

**文件：** [package.json](file://package.json#L44-L50)

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix --cache"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## 🎯 工作原理

### Monorepo ESLint 架构

```
vue3-vant-mobile/
├── eslint.config.mjs          # 根目录配置（忽略子包）
├── apps/
│   └── web/
│       ├── eslint.config.ts   # Web 应用独立配置
│       └── src/
└── packages/
    └── config/
        └── tsconfig/
```

### Lint 执行流程

```bash
# 1. 根目录执行（通过 Turborepo）
pnpm lint:fix

# 2. Turborepo 并行执行所有子包的 lint
turbo run lint:fix

# 3. 每个子包独立运行自己的 eslint
apps/web: eslint . --cache --fix
```

### Git Commit 流程

```bash
git add .
git commit -m "feat: your changes"
# → pre-commit hook
# → lint-staged (只检查暂存的文件)
# → eslint --fix --cache (快速检查)
```

---

## 💡 关键优势

### 1. 保持 @antfu/eslint-config

- ✅ 继续使用 Anthony Fu 的最佳实践
- ✅ 自动包含 Vue、TypeScript、格式化等配置
- ✅ 无需自己维护复杂的 ESLint 规则

### 2. Monorepo 隔离

- ✅ 根目录和子包配置独立
- ✅ 避免配置冲突
- ✅ 每个子包可以自定义规则

### 3. 性能优化

- ✅ ESLint cache 加速二次检查
- ✅ Turborepo 缓存任务结果
- ✅ lint-staged 只检查变更文件

### 4. 版本统一管理

- ✅ pnpm catalogs 统一依赖版本
- ✅ 一处修改，全局生效
- ✅ 避免版本冲突

---

## 🔧 常用命令

```bash
# 检查所有子包
pnpm lint

# 修复所有问题
pnpm lint:fix

# 仅检查 web 应用
pnpm --filter @vue3-vant-mobile/web lint

# 格式化代码
pnpm format

# 清理缓存
rm -rf .turbo apps/web/.eslintcache
```

---

## ⚠️ 注意事项

### 1. 根目录 vs 子包配置

**根目录 eslint.config.mjs：**

- 只管理根目录的文件
- 必须忽略 `apps/**` 和 `packages/**`
- 不需要安装所有子包的依赖

**子包 eslint.config.ts：**

- 管理各自目录的文件
- 可以有自己的规则覆盖
- 独立运行 lint

### 2. 依赖安装

```bash
# 根目录需要安装
pnpm add -D @antfu/eslint-config eslint

# 子包也需要安装（通过 catalog）
pnpm add -D @antfu/eslint-config eslint --filter @vue3-vant-mobile/web
```

### 3. Cache 管理

- `.eslintcache` 已添加到 `.gitignore`
- 每次修改 ESLint 配置后，建议清除 cache
- Turborepo 会自动管理任务缓存

---

## 📊 与 vue-vben-admin 对比

| 特性        | vue-vben-admin             | 你的项目             |
| ----------- | -------------------------- | -------------------- |
| ESLint 配置 | 自定义 @vben/eslint-config | @antfu/eslint-config |
| 配置位置    | internal/lint-configs      | 各包独立             |
| CLI 工具    | 自定义 vsh                 | 原生 eslint + turbo  |
| 版本管理    | pnpm catalogs              | pnpm catalogs ✅     |
| Cache 优化  | oxlint + eslint            | eslint --cache ✅    |

**结论：** 你选择了更简单、更主流的方案，同时保留了 monorepo 的最佳实践。

---

## 🚀 后续优化建议

1. **添加更多共享包时**，为每个包创建独立的 eslint.config.ts
2. **考虑引入 oxlint** 作为更快的替代方案（可选）
3. **定期更新 @antfu/eslint-config** 获取最新规则
4. **监控 lint 性能**，必要时调整 cache 策略

---

## 📖 相关文档

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [ESLint Cache](https://eslint.org/docs/latest/use/command-line-interface#--cache)
- [Turborepo Caching](https://turborepo.com/docs/core-concepts/caching)
- [pnpm Catalogs](https://pnpm.io/catalogs)

---

✅ **配置完成！** 你现在拥有一个基于 @antfu/eslint-config 的企业级 monorepo ESLint 配置。
