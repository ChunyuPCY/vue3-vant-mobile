# Commitlint 快速参考

## 🚀 常用 Commit Type

```bash
feat:     # 新功能
fix:      # Bug 修复
perf:     # 性能优化
refactor: # 代码重构
docs:     # 文档更新
test:     # 测试相关
style:    # 代码格式
chore:    # 其他更改
build:    # 构建系统
ci:       # CI 配置
```

## 📝 快速示例

```bash
# ✅ 正确的格式
git commit -m "feat: add user login"
git commit -m "fix(auth): resolve token issue"
git commit -m "docs: update README"

# ❌ 错误的格式
git commit -m "add feature"           # 缺少 type
git commit -m "Feat: Add Login"       # 不要大写
git commit -m "fix: fixed the bug."   # 不要用过去时和句号
```

## 🔧 常用命令

```bash
# 重新安装 git hooks
pnpm prepare

# 测试最后一次提交
pnpm exec commitlint --last

# 手动触发 commitlint（带编辑）
pnpm commitlint
```

## ⚡ 完整格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例：**

```bash
git commit -m "feat(api): add user profile endpoint

Add new endpoint to fetch and update user profile.

Closes #123"
```

---

详细文档：[COMMITLINT_CONFIG_GUIDE.md](file://COMMITLINT_CONFIG_GUIDE.md)
