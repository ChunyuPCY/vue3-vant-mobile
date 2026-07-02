# Monorepo 结构说明

本项目已改造为 monorepo 架构，使用 pnpm workspaces 和 Turborepo 进行管理。

## 目录结构

```
vue3-vant-mobile/
├── apps/                    # 应用目录
│   └── web/                # 主 Web 应用
│       ├── src/            # 源代码
│       ├── public/         # 静态资源
│       ├── package.json    # 应用依赖
│       └── vite.config.ts  # Vite 配置
├── packages/               # 共享包目录
│   └── config/            # 配置包
│       └── tsconfig/      # TypeScript 配置
├── turbo.json             # Turborepo 配置
├── package.json           # 根 package.json
└── pnpm-workspace.yaml    # pnpm workspace 配置
```

## 常用命令

### 开发

```bash
# 启动所有应用（开发模式）
pnpm dev

# 仅启动 web 应用
pnpm --filter @vue3-vant-mobile/web dev
```

### 构建

```bash
# 构建所有应用
pnpm build

# 生产环境构建
pnpm build:pro

# 开发环境构建
pnpm build:dev

# 仅构建 web 应用
pnpm --filter @vue3-vant-mobile/web build
```

### 其他命令

```bash
# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 清理缓存
pnpm clean

# 格式化代码
pnpm format
```

## 添加新应用

1. 在 `apps/` 目录下创建新的应用目录
2. 在新目录中创建 `package.json`，设置唯一的 name（如 `@vue3-vant-mobile/admin`）
3. 安装所需依赖
4. 在根目录运行 `pnpm install`

## 添加共享包

1. 在 `packages/` 目录下创建新的包目录
2. 创建 `package.json`，设置唯一的 name（如 `@vue3-vant-mobile/utils`）
3. 编写包的代码
4. 在需要使用的应用中添加依赖：`"@vue3-vant-mobile/utils": "workspace:*"`
5. 在根目录运行 `pnpm install`

## Turborepo 缓存

Turborepo 会自动缓存构建结果，加速后续构建。缓存存储在 `.turbo` 目录中。

## 注意事项

- 所有应用的依赖安装在根目录的 `node_modules`
- 使用 `workspace:*` 协议引用本地包
- 避免循环依赖
- 每个包应该有清晰的职责边界
