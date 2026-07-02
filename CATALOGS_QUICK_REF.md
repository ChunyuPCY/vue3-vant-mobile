# pnpm Catalogs 快速参考

## 📦 Catalog 分类速查

| Catalog    | 用途           | 示例包                       |
| ---------- | -------------- | ---------------------------- |
| `prod`     | 生产运行时依赖 | vue, pinia, axios, vant      |
| `frontend` | 前端工具和类型 | @types/\*, less, mockjs      |
| `dev`      | 构建工具       | vite, typescript, unocss     |
| `lint`     | 代码质量       | eslint, @antfu/eslint-config |

## 🔧 常用操作

### 添加新依赖到 catalog

```yaml
# pnpm-workspace.yaml
catalogs:
  prod:
    new-package: ^1.0.0 # 添加到对应分类
```

### 在子包中使用

```json
{
  "dependencies": {
    "new-package": "catalog:prod"
  }
}
```

### 升级依赖版本

```bash
# 1. 修改 pnpm-workspace.yaml 中的版本号
# 2. 运行
pnpm install
```

### 查看当前 catalog

```bash
# 查看 pnpm-workspace.yaml 中的 catalogs 部分
cat pnpm-workspace.yaml | grep -A 50 "catalogs:"
```

## ⚡ 快捷命令

```bash
# 安装所有依赖
pnpm install

# 仅安装 frozen lockfile（CI 环境）
pnpm i --frozen-lockfile

# 更新某个 catalog 中的所有包
pnpm update <package-name>

# 清理并重新安装
pnpm clean && pnpm install
```

## 🎯 最佳实践

✅ **DO**

- 使用 catalog 管理所有共享依赖
- 保持 catalog 分类清晰
- 定期审查和清理未使用的依赖
- 使用 caret (^) 允许小版本更新

❌ **DON'T**

- 不要在同一项目混用 catalog 和固定版本
- 不要创建过多细碎的 catalog 分类
- 不要忘记运行 `pnpm install` 更新依赖

## 📊 当前统计

- **prod**: 16 个包
- **frontend**: 8 个包
- **dev**: 17 个包
- **lint**: 4 个包
- **总计**: 45 个统一管理版本的包

---

💡 提示：详细信息请查看 [CATALOGS_USAGE.md](./CATALOGS_USAGE.md)
