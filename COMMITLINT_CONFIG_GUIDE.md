# Commitlint 配置指南

## ✅ 问题已解决

**错误信息：**

```
✖ Please add rules to your `commitlint.config.js`
    - Getting started guide: https://commitlint.js.org/guides/getting-started
    - Example config: https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/src/index.ts [empty-rules]
```

**原因：**
Monorepo 改造后，根目录缺少 `commitlint.config.ts` 配置文件。

**解决方案：**
已在根目录创建 [commitlint.config.ts](file://commitlint.config.ts) 配置文件。

---

## 📋 配置文件说明

### 根目录配置

[commitlint.config.ts](file://commitlint.config.ts)

```typescript
import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'perf', // 性能优化
        'style', // 代码格式（不影响功能）
        'docs', // 文档更新
        'test', // 测试相关
        'refactor', // 重构
        'build', // 构建系统或外部依赖变更
        'ci', // CI 配置文件和脚本的更改
        'chore', // 其他不修改源代码的更改
        'revert', // 回滚之前的提交
        'wip', // 工作进行中
        'workflow', // 工作流相关
        'types', // 类型定义相关
        'release', // 发布相关
      ],
    ],
  },
}

export default Configuration
```

### Web 应用配置

[apps/web/commitlint.config.ts](file://apps/web/commitlint.config.ts)

与根目录配置相同，保持统一规范。

---

## 🔧 Git Hooks 配置

在 [package.json](file://package.json) 中配置：

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged",
    "commit-msg": "pnpm commitlint $1"
  }
}
```

**安装/重新安装 hooks：**

```bash
pnpm prepare
```

---

## 📝 Commit Message 格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type       | 说明       | 示例                               |
| ---------- | ---------- | ---------------------------------- |
| `feat`     | 新功能     | `feat: add user login page`        |
| `fix`      | 修复 bug   | `fix: resolve navigation issue`    |
| `perf`     | 性能优化   | `perf: optimize image loading`     |
| `style`    | 代码格式   | `style: format code with prettier` |
| `docs`     | 文档更新   | `docs: update README.md`           |
| `test`     | 测试相关   | `test: add unit tests for utils`   |
| `refactor` | 重构       | `refactor: simplify auth logic`    |
| `build`    | 构建系统   | `build: update dependencies`       |
| `ci`       | CI 配置    | `ci: update github actions`        |
| `chore`    | 其他更改   | `chore: update .gitignore`         |
| `revert`   | 回滚       | `revert: revert last commit`       |
| `wip`      | 工作进行中 | `wip: implement feature X`         |
| `workflow` | 工作流     | `workflow: add new script`         |
| `types`    | 类型定义   | `types: add user interface`        |
| `release`  | 发布       | `release: v3.15.0`                 |

### Scope（可选）

影响范围的名称，例如：

- `feat(auth): add login page`
- `fix(router): resolve redirect issue`
- `docs(readme): update installation guide`

### Subject

简短描述（不超过 50 字符）：

- 使用祈使句、现在时态（"add" 而非 "added" 或 "adds"）
- 不要大写首字母
- 不要在末尾添加句号

### Body（可选）

更详细的描述，使用单数现在时态：

- 解释**为什么**做这个更改，而不是**做了什么**
- 可以包含多行

### Footer（可选）

用于引用 issue 或其他元数据：

- `Closes #123`
- `BREAKING CHANGE: ...`

---

## ✅ 示例

### 好的 Commit Messages

```bash
# 简单的新功能
feat: add dark mode support

# 带 scope 的 bug 修复
fix(auth): resolve token refresh issue

# 性能优化
perf(chart): reduce re-rendering frequency

# 文档更新
docs: add API documentation

# 重构
refactor(utils): simplify date formatting logic

# 带 body 和 footer
feat(api): add user profile endpoint

Add new endpoint to fetch and update user profile information.

Closes #456
```

### 不好的 Commit Messages

```bash
# ❌ 缺少 type
add new feature

# ❌ 大写首字母
Feat: Add Login Page

# ❌ 末尾有句号
feat: add login page.

# ❌ 描述不清
fix: fix stuff

# ❌ 过去时态
feat: added user authentication
```

---

## 🧪 测试配置

### 手动测试

```bash
# 测试最后一次提交
pnpm exec commitlint --last

# 测试特定的 commit message
echo "feat: test message" | pnpm exec commitlint
```

### 实际提交测试

```bash
git add .
git commit -m "chore: test commitlint configuration"
```

如果配置正确，应该看到：

```
✔ commit message passed validation
```

---

## ⚙️ 自定义规则

如果需要添加更多规则，可以在 `commitlint.config.ts` 中添加：

```typescript
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 已有的 type-enum 规则

    // 限制 subject 长度
    'subject-max-length': [
      RuleConfigSeverity.Error,
      'always',
      72,
    ],

    // 要求 subject 不能为空
    'subject-empty': [
      RuleConfigSeverity.Error,
      'never',
    ],

    // 要求 body 不能为空（可选）
    'body-empty': [
      RuleConfigSeverity.Warning,
      'never',
    ],
  },
}
```

---

## 🔗 相关资源

- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [Commitlint 官方文档](https://commitlint.js.org/)
- [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

---

**状态：** ✅ 已配置并测试通过
**最后更新：** 2026-07-02
