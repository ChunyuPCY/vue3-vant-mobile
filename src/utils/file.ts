import consola from 'consola'

interface ImageFileInfo {
  path?: string
  extension?: string
}

const basicInfo: Required<ImageFileInfo> = { extension: 'png', path: 'images' }

// 使用 import.meta.glob 预加载图片资源
// eager: true 会立即加载并返回处理后的 URL，确保打包后路径正确
// 只匹配常用图片格式: png, jpg, jpeg, gif, svg, webp, ico
const modules = import.meta.glob<{ default: string }>('../assets/**/*.{png,jpg,jpeg,gif,svg,webp,ico}', { eager: true })

export function getImageUrl(name: string, info?: ImageFileInfo): string {
  const { path, extension } = { ...basicInfo, ...info }
  const fullPath = `../assets/${path}/${name}.${extension}`

  // 从预加载的模块中获取处理后的 URL
  const matchedModule = modules[fullPath]

  if (matchedModule) {
    return matchedModule.default
  }

  // 如果找不到，打印警告并返回空字符串
  consola.warn(`Image not found: ${fullPath}`)
  consola.warn('Available paths:', Object.keys(modules))
  return ''
}
