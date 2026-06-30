import { createRemToPxProcessor } from '@unocss/preset-wind4/utils'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-2 py-1 rounded-1 border-none inline-block bg-green-400 text-white cursor-pointer outline-hidden hover:bg-green-600 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  presets: [
    presetWind4({
      preflights: {
        theme: {
          process: createRemToPxProcessor(),
        },
      },
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        'pure-icons': FileSystemIconLoader(
          './src/assets/icons/pure',
          (svg) => {
            return svg.replace(/^<svg /, '<svg fill="currentColor" ')
          },
        ),
        'multi-icons': FileSystemIconLoader(
          './src/assets/icons/multi-color',
        ),
      },
      customizations: {
        iconCustomizer(collection, _icon, props) {
          if (collection === 'pure-icons' || collection === 'multi-icons') {
            props.width = '2rem'
            props.height = '2rem'
          }
        },
      },
    }),
  ],
  postprocess: [
    createRemToPxProcessor(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
