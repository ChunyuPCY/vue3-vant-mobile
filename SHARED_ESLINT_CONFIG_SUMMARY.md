# 共享 ESLint 配置包完成总结

## ✅ 已完成的工作

### 1. 创建共享 ESLint 配置包

**位置：** [packages/config/eslint-config](file://packages/config/eslint-config)

**文件结构：**

```
packages/config/eslint-config/
├── src/
│   └── index.ts          # 核心配置逻辑
├── package.json           # 包元信息
├── tsconfig.json          # TypeScript 配置
├── tsdown.config.ts       # 构建配置
└── README.md              # 使用文档
```

### 2. 核心功能

#### `createEslintConfig` 函数

提供了一个灵活的工厂函数，支持以下选项：

```typescript
interface EslintConfigOptions {
  vue?: boolean // 默认: true
  typescript?: boolean // 默认: true
  unocss?: boolean // 默认: false
  formatters?: boolean // 默认: true
  rules?: Record<string, any> // 自定义规则
  ignores?: string[] // 额外忽略文件
}
```

**特性：**

- ✅ 基于 `@antfu/eslint-config` 封装
- ✅ 自动关闭 perfectionist 排序规则（避免不必要的冲突）
- ✅ 默认忽略常见目录（`.github`, `.turbo`, `node_modules`, `dist`）
- ✅ 支持完全自定义规则和忽略模式
- ✅ TypeScript 类型安全

### 3. 配置文件更新

#### 根目录配置

[eslint.config.mjs](file://eslint.config.mjs)

```javascript
import { createEslintConfig } from '@vue3-vant-mobile/eslint-config'

export default await createEslintConfig({
  vue: true,
  typescript: true,
  formatters: true,
  unocss: false,
  ignores: [
    'apps/**',
    'packages/**',
    '.turbo/**',
    'node_modules/**',
    'dist/**',
  ],
})
```

#### Web 应用配置

[apps/web/eslint.config.ts](file://apps/web/eslint.config.ts)

```typescript
import { createEslintConfig } from '@vue3-vant-mobile/eslint-config'

export default await createEslintConfig({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: true,
})
```

### 4. 依赖管理

#### pnpm-workspace.yaml

在 `dev` catalog 中添加了 `tsdown`：

```yaml
catalogs:
  dev:
    tsdown: ^0.16.7
    # ... 其他依赖
```

#### packages/config/eslint-config/package.json

```json
{
  "name": "@vue3-vant-mobile/eslint-config",
  "dependencies": {
    "@antfu/eslint-config": "catalog:lint",
    "eslint": "catalog:lint"
  },
  "devDependencies": {
    "@vue3-vant-mobile/tsconfig": "workspace:*",
    "tsdown": "catalog:dev",
    "typescript": "catalog:dev"
  }
}
```

#### apps/web/package.json

添加了对共享配置的引用：

```json
{
  "devDependencies": {
    "@vue3-vant-mobile/eslint-config": "workspace:*"
  }
}
```

### 5. 构建系统

使用 **tsdown**（基于 rolldown）进行构建：

- 输出格式：ESM (`.mjs`)
- 自动生成类型声明 (`.d.mts`)
- 构建产物位于 `dist/` 目录

**构建命令：**

```bash
pnpm build      # 生产构建
pnpm stub       # 开发模式（监听变化）
```

### 6. 测试验证

✅ 根目录 lint 正常工作
✅ 子包 lint 正常工作
✅ 缓存机制正常（--cache 选项）
✅ Turbo 任务编排正常

**性能测试：**

```bash
$ pnpm lint:fix
Tasks:    1 successful, 1 total
Time:    2.443s
```

## 🎯 优势

### 1. 统一管理

- 所有子包使用相同的 ESLint 基础配置
- 一处修改，全局生效
- 减少配置重复和维护成本

### 2. 灵活性

- 每个子包可以根据需要启用/禁用特定功能（如 UnoCSS）
- 支持自定义规则覆盖
- 支持自定义忽略模式

### 3. 可维护性

- 集中管理 ESLint 相关依赖版本
- 易于升级和更新
- 清晰的 API 接口

### 4. 可扩展性

- 可以轻松添加新的配置预设
- 可以为不同项目类型创建不同的配置模板
- 支持未来集成更多工具（如 oxlint）

## 📝 使用示例

### 新增子包时

1. 在子包的 `package.json` 中添加依赖：

```json
{
  "devDependencies": {
    "@vue3-vant-mobile/eslint-config": "workspace:*"
  }
}
```

2. 创建 `eslint.config.ts`：

```typescript
import { createEslintConfig } from '@vue3-vant-mobile/eslint-config'

export default await createEslintConfig({
  vue: true,
  typescript: true,
  unocss: false, // 根据需要调整
  formatters: true,
})
```

3. 运行 `pnpm install`

### 自定义规则

如果某个子包需要特殊规则：

```typescript
import { createEslintConfig } from '@vue3-vant-mobile/eslint-config'

export default await createEslintConfig({
  vue: true,
  typescript: true,
  rules: {
    // 覆盖默认规则
    'no-console': 'warn',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: 1,
      },
    ],
  },
})
```

## 🔧 技术细节

### 为什么使用 tsdown？

- **快速**：基于 rolldown（Rust 编写）
- **现代**：原生支持 ESM
- **简单**：零配置即可使用
- **类型安全**：自动生成 `.d.ts` 文件

### 导出格式

- 主入口：`dist/index.mjs`
- 类型声明：`dist/index.d.mts`
- 使用 ESM 格式以符合现代 JavaScript 标准

### Workspace 引用

使用 `workspace:*` 协议确保：

- 本地开发时使用源码
- 发布时使用构建产物
- pnpm 自动解析依赖关系

## 🚀 下一步优化建议

1. **添加更多预设配置**

   ```typescript
   // 例如：
   createEslintConfig({ preset: 'library' }) // 库开发
   createEslintConfig({ preset: 'app' }) // 应用开发
   ```

2. **集成 oxlint**（可选）
   - 更快的 lint 速度（10-100x）
   - 可以作为可选的增强功能

3. **添加测试配置**
   - 为 vitest/jest 提供专用配置
   - 自动处理测试文件的特殊规则

4. **文档完善**
   - 添加常见问题解答
   - 提供迁移指南（从旧配置迁移）

## 📚 相关文档

- [eslint-config README](file://packages/config/eslint-config/README.md)
- [根目录 eslint.config.mjs](file://eslint.config.mjs)
- [Web 应用 eslint.config.ts](file://apps/web/eslint.config.ts)
- [pnpm-workspace.yaml](file://pnpm-workspace.yaml)

---

**完成时间：** 2026-07-02
**状态：** ✅ 已完成并测试通过
