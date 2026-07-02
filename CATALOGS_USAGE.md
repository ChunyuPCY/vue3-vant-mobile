# pnpm Catalogs 使用指南

本项目使用 pnpm catalogs 来统一管理 monorepo 中所有子包的依赖版本。

## 📚 Catalogs 分类

### 1. `prod` - 生产依赖

包含应用运行时需要的核心库：

- Vue 生态系统（vue, vue-router, pinia）
- UI 组件库（vant）
- 工具库（axios, @vueuse/core, lodash-es）
- 其他运行时依赖

### 2. `frontend` - 前端工具和类型

包含前端开发相关的辅助库：

- TypeScript 类型定义
- CSS 处理工具（less, autoprefixer, postcss-mobile-forever）
- Mock 数据工具
- 环境变量工具

### 3. `dev` - 构建工具

包含 Vite 及其插件：

- Vite 核心和插件
- UnoCSS 配置
- Vue 相关插件（i18n, auto-import, components）
- PWA、sitemap 等功能插件
- TypeScript 编译器

### 4. `lint` - 代码质量工具

包含代码检查和格式化工具：

- ESLint 及配置
- 格式化插件

## 🔧 使用方法

### 在子包中使用 catalog

在 `apps/web/package.json` 或其他子包中，使用 `catalog:` 前缀引用：

```json
{
  "dependencies": {
    "vue": "catalog:prod",
    "vue-router": "catalog:prod",
    "pinia": "catalog:prod",
    "vant": "catalog:prod",
    "axios": "catalog:prod"
  },
  "devDependencies": {
    "vite": "catalog:dev",
    "@vitejs/plugin-vue": "catalog:dev",
    "typescript": "catalog:dev",
    "eslint": "catalog:lint",
    "@antfu/eslint-config": "catalog:lint"
  }
}
```

### 优势

1. **版本统一**: 所有子包使用相同版本的依赖
2. **易于升级**: 只需在 `pnpm-workspace.yaml` 中修改一次
3. **避免冲突**: 防止不同子包使用不同版本导致的兼容性问题
4. **清晰分类**: 按用途分组，便于管理

### 添加新依赖

1. 确定依赖属于哪个 catalog（prod/frontend/dev/lint）
2. 在 `pnpm-workspace.yaml` 的对应 catalog 中添加版本号
3. 在子包的 `package.json` 中使用 `catalog:<name>` 引用
4. 运行 `pnpm install`

### 升级依赖

只需在 `pnpm-workspace.yaml` 中修改版本号，然后运行：

```bash
pnpm install
```

所有使用该依赖的子包会自动更新到新版本。

## ⚠️ 注意事项

- workspace 协议（如 `"@vue3-vant-mobile/tsconfig": "workspace:*"`）不受 catalog 影响
- 某些特殊依赖可能需要保持独立版本，可以不使用 catalog
- catalog 中的版本号应该使用 caret (^) 或 tilde (~) 来允许小版本更新

## 📖 更多信息

- [pnpm catalogs 官方文档](https://pnpm.io/catalogs)
- [antfu monorepo 最佳实践](https://github.com/antfu-collective/skills/blob/main/references/monorepo.md)
