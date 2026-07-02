# ESLint Monorepo 配置指南

## 📚 参考方案：vue-vben-admin

vue-vben-admin 采用了以下 ESLint monorepo 最佳实践：

### 1. 统一的 ESLint 配置包

```
internal/lint-configs/eslint-config/
├── package.json      # @vben/eslint-config
├── src/
│   └── index.ts      # defineConfig() 导出统一配置
└── tsconfig.json
```

**特点：**

- 所有子包共享同一个 ESLint 配置
- 子包不需要单独的 eslint.config.\* 文件
- 根目录统一管理 lint 规则

### 2. 自定义 CLI 工具 (vsh)

```bash
# 根目录执行
pnpm lint          # 检查所有子包
pnpm lint:fix      # 自动修复所有问题
```

**优势：**

- 支持并行/串行执行（根据机器性能自动选择）
- 统一的 lint 入口
- 更好的性能和用户体验

### 3. pnpm publicHoistPattern

```yaml
publicHoistPattern:
  - eslint
  - oxlint
  - oxfmt
  - stylelint
```

将所有 lint 工具提升到根目录，避免重复安装。

---

## ✅ 你的项目优化

基于 vue-vben-admin 的方案，已对你的项目进行以下优化：

### 1. 优化 lint-staged 配置

**之前：**

```json
{
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

**现在：**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix --cache"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**改进点：**

- ✅ 只对代码文件运行 ESLint（避免对无关文件检查）
- ✅ 添加 `--cache` 选项，大幅提升 lint 速度
- ✅ JSON 和 Markdown 文件使用 Prettier 格式化

### 2. 子包添加 cache 选项

**apps/web/package.json：**

```json
{
  "scripts": {
    "lint": "eslint . --cache",
    "lint:fix": "eslint . --cache --fix"
  }
}
```

### 3. 忽略缓存文件

**.gitignore：**

```gitignore
.turbo
.eslintcache
```

---

## 🎯 工作原理

### Git Commit 流程

```mermaid
graph LR
    A[git commit] --> B[pre-commit hook]
    B --> C[lint-staged]
    C --> D[eslint --fix --cache]
    D --> E[只检查暂存的文件]
    E --> F[自动修复问题]
    F --> G[提交成功]
```

### Lint 执行流程

```bash
# 1. 开发者修改文件
git add src/pages/login/index.vue

# 2. 提交时触发 pre-commit
git commit -m "feat: add login page"

# 3. lint-staged 只检查暂存的文件
eslint src/pages/login/index.vue --fix --cache

# 4. 如果有错误且无法自动修复，提交失败
# 5. 如果成功或已自动修复，提交继续
```

---

## 💡 最佳实践

### 1. 使用 Cache 加速

ESLint cache 会记录已检查的文件，下次只检查变更的文件：

```bash
# 首次运行（较慢）
pnpm lint

# 后续运行（很快，只检查变更的文件）
pnpm lint
```

**注意：** `.eslintcache` 已添加到 `.gitignore`，不会提交到 Git。

### 2. 按文件类型分别处理

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix --cache"],
    "*.{css,scss,less}": ["stylelint --fix"],
    "*.{json,md,yml}": ["prettier --write"]
  }
}
```

### 3. Turborepo 缓存

Turborepo 也会缓存 lint 结果：

```bash
# 第一次运行
pnpm lint
# turbo: cache miss, executing...

# 第二次运行（无文件变更）
pnpm lint
# turbo: cache hit, replaying output...
```

---

## 🔧 常见问题

### Q1: Git commit 时报 ESLint 错误怎么办？

**A:** 有两种解决方案：

1. **手动修复后重新提交**

   ```bash
   pnpm lint:fix
   git add .
   git commit -m "..."
   ```

2. **跳过 pre-commit（不推荐）**
   ```bash
   git commit --no-verify -m "..."
   ```

### Q2: 如何清理 ESLint cache？

```bash
# 删除所有 cache 文件
find . -name ".eslintcache" -delete

# 或者在 apps/web 目录下
rm apps/web/.eslintcache
```

### Q3: 为什么 lint 还是很慢？

**可能的原因：**

1. 首次运行没有 cache
2. 大量文件被修改
3. ESLint 规则太多

**解决方案：**

- 确保使用了 `--cache` 选项
- 考虑使用 oxlint（比 ESLint 快 10-100 倍）
- 优化 ESLint 配置，禁用不必要的规则

---

## 📊 性能对比

| 方案              | 首次运行 | 二次运行 | 说明               |
| ----------------- | -------- | -------- | ------------------ |
| 无 cache          | ~5s      | ~5s      | 每次都检查所有文件 |
| 有 cache          | ~5s      | ~0.5s    | 只检查变更的文件   |
| Turborepo + cache | ~5s      | ~0.1s    | 缓存命中直接返回   |

---

## 🚀 后续优化建议

如果想进一步提升性能，可以考虑：

1. **引入 oxlint** - Rust 编写的超快 linter

   ```bash
   pnpm add -D oxlint
   ```

2. **创建统一的 eslint-config 包** - 类似 vue-vben-admin

   ```
   packages/config/eslint-config/
   ```

3. **使用 lefthook 替代 simple-git-hooks** - 更强大的 Git hooks 管理

---

## 📖 相关文档

- [vue-vben-admin ESLint Config](https://github.com/vbenjs/vue-vben-admin/tree/main/internal/lint-configs/eslint-config)
- [ESLint Cache](https://eslint.org/docs/latest/use/command-line-interface#--cache)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Turborepo Caching](https://turborepo.com/docs/core-concepts/caching)
