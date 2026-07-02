#!/usr/bin/env node

/**
 * Create a new app in the monorepo
 * Usage: pnpm create-app <app-name>
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import readline from 'node:readline'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const APPS_DIR = path.join(ROOT_DIR, 'apps')
const TEMPLATE_DIR = path.join(APPS_DIR, 'web')

// Colors for terminal output
const colors = {
  reset: '\x1B[0m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  red: '\x1B[31m',
  cyan: '\x1B[36m',
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

function validateAppName(name) {
  // Only allow lowercase letters, numbers, and hyphens
  const validPattern = /^[a-z0-9-]+$/
  if (!validPattern.test(name)) {
    return 'App name can only contain lowercase letters, numbers, and hyphens'
  }
  if (name.length < 2) {
    return 'App name must be at least 2 characters long'
  }
  return null
}

async function main() {
  log('\n🚀 Vue3 Vant Mobile - Create New App\n', colors.cyan)

  // Get app name from command line or prompt
  let appName = process.argv[2]

  if (!appName) {
    appName = await askQuestion('Enter app name (e.g., admin, docs): ')
  }

  // Validate app name
  const validationError = validateAppName(appName)
  if (validationError) {
    log(`\n❌ Error: ${validationError}\n`, colors.red)
    process.exit(1)
  }

  const appDir = path.join(APPS_DIR, appName)

  // Check if app already exists
  if (fs.existsSync(appDir)) {
    log(`\n❌ Error: App "${appName}" already exists at ${appDir}\n`, colors.red)
    process.exit(1)
  }

  log(`\n📦 Creating new app: ${colors.green}@vue3-vant-mobile/${appName}${colors.reset}`)
  log(`📂 Location: ${colors.blue}${appDir}${colors.reset}\n`)

  // Copy template files
  log('📋 Copying template files...', colors.yellow)
  copyDirectory(TEMPLATE_DIR, appDir, appName)

  // Update package.json
  log('⚙️  Updating package.json...', colors.yellow)
  updatePackageJson(appDir, appName)

  log('\n✅ App created successfully!', colors.green)
  log(`\n📝 Next steps:`, colors.cyan)
  log(`   1. cd apps/${appName}`, colors.blue)
  log(`   2. pnpm install`, colors.blue)
  log(`   3. pnpm dev`, colors.blue)
  log(`\n💡 Or from root:`, colors.cyan)
  log(`   pnpm dev --filter=@vue3-vant-mobile/${appName}`, colors.blue)
  log('')
}

function copyDirectory(src, dest) {
  // Files and directories to exclude
  const excludePatterns = [
    'node_modules',
    '.turbo',
    'dist',
    '.eslintcache',
    '.git',
  ]

  function shouldExclude(name) {
    return excludePatterns.includes(name)
  }

  function copy(srcPath, destPath) {
    const stats = fs.statSync(srcPath)

    if (stats.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true })
      }

      const entries = fs.readdirSync(srcPath)
      for (const entry of entries) {
        if (shouldExclude(entry))
          continue

        const srcEntry = path.join(srcPath, entry)
        const destEntry = path.join(destPath, entry)
        copy(srcEntry, destEntry)
      }
    }
    else {
      fs.copyFileSync(srcPath, destPath)
    }
  }

  copy(src, dest)
}

function updatePackageJson(appDir, appName) {
  const packageJsonPath = path.join(appDir, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  // Update package name
  packageJson.name = `@vue3-vant-mobile/${appName}`

  // Update description
  packageJson.description = `A mobile web app based on Vue 3 ecosystem`

  // Write back
  fs.writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    'utf-8',
  )
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}\n`, colors.red)
  console.error(error)
  process.exit(1)
})
