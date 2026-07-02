import { createEslintConfig } from '@vue3-vant-mobile/eslint-config'

export default await createEslintConfig({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: true,
})
