# ESLint Monorepo 快速参考

## 🎯 核心优化

### lint-staged 配置

```json
{
  "*.{js,jsx,ts,tsx,vue}": ["eslint --fix --cache"],
  "*.{json,md}": ["prettier --write"]
}
```

### 子包 lint 脚本

```json
{
  "lint": "eslint . --cache",
  "lint:fix": "eslint . --cache --fix"
}
```

---

## ⚡ 常用命令

```bash
# 检查所有子包
pnpm lint

# 修复所有问题
pnpm lint:fix

# 仅检查 web 应用
pnpm --filter @vue3-vant-mobile/web lint

# 清理缓存
rm -rf .turbo apps/web/.eslintcache
```

---

## 📊 性能对比

| 场景     | 耗时     | 提升        |
| -------- | -------- | ----------- |
| 首次运行 | ~3.67s   | -           |
| 二次运行 | **29ms** | **126x** ⚡ |

---

## 🔧 Git Commit 流程

```bash
git add .
git commit -m "feat: your changes"
# → 自动触发 lint-staged
# → 只检查代码文件
# → 使用 cache 加速
```

---

## 💡 关键要点

✅ **DO**

- 使用 `--cache` 选项
- 按文件类型分别处理
- 定期清理过期 cache

❌ **DON'T**

- 不要对非代码文件运行 ESLint
- 不要提交 `.eslintcache` 到 Git
- 不要在 CI 中依赖本地 cache

---

## 🐛 常见问题

**Q: Git commit 时报错怎么办？**

```bash
pnpm lint:fix
git add .
git commit -m "..."
```

**Q: 如何清理 cache？**

```bash
rm apps/web/.eslintcache
rm -rf .turbo
```

**Q: Cache 何时失效？**

- 修改 ESLint/TS 配置
- 更新依赖版本
- 手动删除 cache

---

📖 详细文档：[ESLINT_MONOREPO_GUIDE.md](./ESLINT_MONOREPO_GUIDE.md)
