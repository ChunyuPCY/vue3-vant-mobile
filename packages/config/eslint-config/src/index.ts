import type { Linter } from 'eslint'

import antfu from '@antfu/eslint-config'

export interface EslintConfigOptions {
  /**
   * Enable Vue support
   * @default true
   */
  vue?: boolean

  /**
   * Enable TypeScript support
   * @default true
   */
  typescript?: boolean

  /**
   * Enable UnoCSS support
   * @default false
   */
  unocss?: boolean

  /**
   * Enable formatters
   * @default true
   */
  formatters?: boolean

  /**
   * Custom rules to override defaults
   */
  rules?: Record<string, any>

  /**
   * Files to ignore
   */
  ignores?: string[]
}

type FlatConfigItem = Linter.Config

/**
 * Create ESLint config for vue3-vant-mobile monorepo
 */
export async function createEslintConfig(
  options: EslintConfigOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    vue = true,
    typescript = true,
    unocss = false,
    formatters = true,
    rules = {},
    ignores = [],
  } = options

  const config = await antfu(
    {
      vue,
      typescript,
      unocss,
      formatters,
    },
    {
      rules: {
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-named-exports': 'off',
        ...rules,
      },
    },
    {
      ignores: [
        '.github/**',
        '.turbo/**',
        'node_modules/**',
        'dist/**',
        ...ignores,
      ],
    },
  )

  return config
}
