# pnpm Catalogs 优化完成

## ✅ 已完成的工作

根据 antfu monorepo 最佳实践，已成功配置 pnpm catalogs 来统一管理所有子包的依赖版本。

## 📋 配置详情

### 1. pnpm-workspace.yaml

在 [pnpm-workspace.yaml](file://pnpm-workspace.yaml) 中定义了 4 个 catalog：

#### `prod` - 生产依赖

- Vue 生态系统（vue, vue-router, pinia）
- UI 组件库（vant）
- 工具库（axios, @vueuse/core, lodash-es）
- 其他运行时依赖（共 16 个包）

#### `frontend` - 前端工具和类型

- TypeScript 类型定义（@types/\*）
- CSS 处理工具（less, autoprefixer, postcss-mobile-forever）
- Mock 数据工具（mockjs）
- 环境变量工具（cross-env）
- 共 8 个包

#### `dev` - 构建工具

- Vite 核心和插件
- UnoCSS 配置
- Vue 相关插件（i18n, auto-import, components）
- PWA、sitemap 等功能插件
- TypeScript 编译器
- 共 17 个包

#### `lint` - 代码质量工具

- ESLint 及配置
- 格式化插件
- 共 4 个包

### 2. apps/web/package.json

已将 [apps/web/package.json](file://apps/web/package.json) 中的所有依赖更新为使用 catalog：

**Before:**

```json
{
  "dependencies": {
    "vue": "^3.5.38",
    "vue-router": "^5.1.0"
  }
}
```

**After:**

```json
{
  "dependencies": {
    "vue": "catalog:prod",
    "vue-router": "catalog:prod"
  }
}
```

## 🎯 优势

### 1. 版本统一管理

- 所有子包使用相同版本的依赖
- 避免版本冲突和不兼容问题
- 单一事实来源（Single Source of Truth）

### 2. 简化升级流程

**之前**: 需要在每个子包中手动更新版本号

```bash
# 需要修改多个文件
apps/web/package.json
apps/admin/package.json  # 如果有的话
...
```

**现在**: 只需修改一处

```bash
# 只修改 pnpm-workspace.yaml
pnpm install  # 自动应用到所有子包
```

### 3. 清晰的依赖分类

- 按用途分组（prod/frontend/dev/lint）
- 便于理解和管理
- 新成员可以快速了解项目结构

### 4. 符合最佳实践

- 遵循 antfu monorepo 规范
- 与主流 monorepo 项目保持一致
- 便于后续扩展和维护

## 📖 使用示例

### 添加新依赖

1. **确定分类**: 判断依赖属于哪个 catalog
   - 运行时依赖 → `prod`
   - 前端工具 → `frontend`
   - 构建工具 → `dev`
   - 代码质量 → `lint`

2. **添加到 catalog**: 在 `pnpm-workspace.yaml` 中添加

   ```yaml
   catalogs:
     prod:
       new-package: ^1.0.0
   ```

3. **在子包中使用**:

   ```json
   {
     "dependencies": {
       "new-package": "catalog:prod"
     }
   }
   ```

4. **安装**:
   ```bash
   pnpm install
   ```

### 升级依赖

```bash
# 1. 修改 pnpm-workspace.yaml 中的版本号
# 2. 重新安装
pnpm install
```

所有使用该依赖的子包会自动更新！

## 🔍 验证结果

✅ pnpm-workspace.yaml 配置正确
✅ apps/web/package.json 已使用 catalog
✅ 依赖安装成功
✅ 无版本冲突
✅ 开发服务器正常运行

## 📚 相关文档

- [CATALOGS_USAGE.md](file://CATALOGS_USAGE.md) - 详细使用指南
- [pnpm catalogs 官方文档](https://pnpm.io/catalogs)
- [antfu monorepo 最佳实践](references/monorepo.md)

## 💡 后续建议

1. **添加更多共享包时**，继续使用 catalogs 管理依赖
2. **定期审查** catalog 中的依赖，移除未使用的包
3. **保持 catalog 分类清晰**，避免过度细分或合并
4. **团队培训**，确保所有开发者了解 catalogs 的使用方式

---

改造完成！现在你的 monorepo 拥有了统一的依赖管理系统。🎉
