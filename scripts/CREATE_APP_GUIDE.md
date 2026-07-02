# 创建新应用指南

## 🚀 快速开始

### 方法一：交互式创建

```bash
pnpm create-app
```

系统会提示你输入应用名称。

### 方法二：直接指定名称

```bash
pnpm create-app admin
```

这将创建一个名为 `@vue3-vant-mobile/admin` 的新应用。

---

## 📋 使用示例

```bash
# 创建管理后台应用
pnpm create-app admin

# 创建文档站点
pnpm create-app docs

# 创建移动端 H5 应用
pnpm create-app h5

# 创建小程序 webview
pnpm create-app mini-webview
```

---

## ✨ 功能特性

### 自动完成的任务

1. ✅ **复制模板文件**
   - 从 `apps/web` 复制所有源文件
   - 排除 `node_modules`, `.turbo`, `dist` 等目录

2. ✅ **更新 package.json**
   - 修改包名为 `@vue3-vant-mobile/<app-name>`
   - 保持所有依赖和脚本不变

3. ✅ **保留完整配置**
   - ESLint 配置
   - TypeScript 配置
   - Vite 配置
   - UnoCSS 配置
   - 环境变量文件

---

## 📝 命名规范

应用名称必须遵循以下规则：

- ✅ 只允许小写字母、数字和连字符
- ✅ 至少 2 个字符
- ❌ 不允许大写字母
- ❌ 不允许下划线
- ❌ 不允许特殊字符

**有效示例：**

- `admin`
- `docs-site`
- `h5-app`
- `mini-webview`

**无效示例：**

- `Admin` (包含大写)
- `docs_site` (包含下划线)
- `my.app` (包含点号)

---

## 🔧 创建后的步骤

### 1. 安装依赖

```bash
cd apps/<app-name>
pnpm install
```

或者从根目录：

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
cd apps/<app-name>
pnpm dev
```

或者从根目录：

```bash
pnpm dev --filter=@vue3-vant-mobile/<app-name>
```

### 3. 自定义配置

根据新应用的需求，可能需要修改：

- **package.json**: 修改描述、版本号等
- **vite.config.ts**: 调整构建配置
- **.env**: 设置环境变量
- **index.html**: 修改 HTML 标题和 meta 标签
- **src/**: 删除或修改源代码

---

## 💡 高级用法

### 批量创建多个应用

```bash
pnpm create-app admin
pnpm create-app docs
pnpm create-app h5
```

### 在 CI/CD 中使用

```bash
# 非交互模式
pnpm create-app my-app
```

---

## ⚠️ 注意事项

1. **不要覆盖现有应用**
   - 如果应用已存在，脚本会报错并退出
   - 请先检查 `apps/` 目录

2. **端口冲突**
   - 如果同时运行多个应用，需要修改端口配置
   - 在 `vite.config.ts` 中修改 `server.port`

3. **共享依赖**
   - 所有应用共享根目录的依赖
   - 新增依赖时建议在根目录的 catalog 中统一管理

4. **Git 提交**
   - 新创建的应用会自动被 Git 跟踪
   - 记得提交初始代码

---

## 🎯 实际案例

### 案例 1：创建管理后台

```bash
$ pnpm create-app admin

🚀 Vue3 Vant Mobile - Create New App

Enter app name (e.g., admin, docs): admin

📦 Creating new app: @vue3-vant-mobile/admin
📂 Location: /path/to/apps/admin

📋 Copying template files...
⚙️  Updating package.json...

✅ App created successfully!

📝 Next steps:
   1. cd apps/admin
   2. pnpm install
   3. pnpm dev

💡 Or from root:
   pnpm dev --filter=@vue3-vant-mobile/admin
```

### 案例 2：创建文档站点

```bash
$ pnpm create-app docs

🚀 Vue3 Vant Mobile - Create New App

📦 Creating new app: @vue3-vant-mobile/docs
📂 Location: /path/to/apps/docs

📋 Copying template files...
⚙️  Updating package.json...

✅ App created successfully!
```

---

## 🔍 脚本工作原理

1. **验证名称**：检查应用名称是否符合规范
2. **检查重复**：确保应用不存在
3. **复制文件**：从 `apps/web` 复制所有文件（排除缓存和依赖）
4. **更新配置**：修改 `package.json` 中的包名
5. **输出提示**：显示下一步操作指南

---

## 🛠️ 自定义脚本

如果需要修改模板或添加额外逻辑，可以编辑：

- **脚本文件**：[scripts/create-app.js](file://scripts/create-app.js)
- **模板目录**：[apps/web](file://apps/web)

例如，添加更多排除项：

```javascript
const excludePatterns = [
  'node_modules',
  '.turbo',
  'dist',
  '.eslintcache',
  '.git',
  'your-custom-folder', // 添加新的排除项
]
```

---

## 📚 相关文档

- [Monorepo 架构说明](file://MONOREPO.md)
- [Turborepo 配置](file://turbo.json)
- [pnpm Workspace](file://pnpm-workspace.yaml)

---

**最后更新：** 2026-07-02
