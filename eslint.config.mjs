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
