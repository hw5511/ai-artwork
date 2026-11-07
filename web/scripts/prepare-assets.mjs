// Keep large rehearsed media in their existing repository paths, copied identically for Vite/Pages.
import { cpSync, mkdirSync, rmSync, existsSync, realpathSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, sep } from 'node:path'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = resolve(root, 'public')
for (const [source, relative] of [['../lectures/images', 'lectures/images'], ['../downloads', 'downloads']]) {
  const target = resolve(publicRoot, relative)
  if (!target.startsWith(publicRoot + sep)) throw new Error(`Unsafe asset staging path: ${target}`)
  if (existsSync(target)) {
    if (!realpathSync(target).startsWith(realpathSync(publicRoot) + sep)) throw new Error(`Refusing external asset junction: ${target}`)
    rmSync(target, { recursive: true })
  }
  mkdirSync(dirname(target), { recursive: true })
  // Use the JS walker on Windows; native cpSync exits on this workspace's Unicode path.
  const options = process.platform === 'win32' ? { recursive: true, filter: () => true } : { recursive: true }
  cpSync(join(root, source), target, options)
}
