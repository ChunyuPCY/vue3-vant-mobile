# 创建新应用 - 快速参考

## 🚀 一行命令创建新应用

```bash
pnpm create-app <app-name>
```

## 📝 示例

```bash
# 创建管理后台
pnpm create-app admin

# 创建文档站点
pnpm create-app docs

# 交互式（会提示输入名称）
pnpm create-app
```

## ✅ 自动完成

- ✓ 复制 `apps/web` 模板
- ✓ 更新 package.json 包名
- ✓ 保留所有配置文件

## 📌 下一步

```bash
cd apps/<app-name>
pnpm install
pnpm dev
```

## ⚠️ 命名规则

- ✅ 小写字母、数字、连字符
- ❌ 不要大写、下划线、特殊字符

**有效：** `admin`, `docs-site`, `h5-app`
**无效：** `Admin`, `docs_site`, `my.app`

---

详细文档：[CREATE_APP_GUIDE.md](file://scripts/CREATE_APP_GUIDE.md)
