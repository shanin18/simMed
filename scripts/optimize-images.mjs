import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
const directory = path.resolve('public/images')
const output = path.join(directory, 'optimized')
await fs.mkdir(output, { recursive: true })
let original = 0
let optimized = 0
for (const file of await fs.readdir(directory)) {
  if (!/\.(jpg|png|webp)$/i.test(file)) continue
  const source = path.join(directory, file)
  const target = path.join(output, file.replace(/\.[^.]+$/, '.webp'))
  let pipeline = sharp(source).rotate()
  // The supplied cardiology photo has a baked-in label; crop it before adding the UI label.
  if (file === 'service-2.jpg') pipeline = pipeline.extract({ left: 0, top: 0, width: 1082, height: 750 })
  await pipeline.resize({ width: file.startsWith('avatar-') ? 160 : file.startsWith('hero-') ? 1920 : 1200, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 }).toFile(target)
  original += (await fs.stat(source)).size
  optimized += (await fs.stat(target)).size
  console.log(`${file}: ${((await fs.stat(target)).size / 1024).toFixed(0)} KB`)
}
console.log(`Total: ${(original / 1048576).toFixed(2)} MB → ${(optimized / 1048576).toFixed(2)} MB (${(100 * (1 - optimized / original)).toFixed(1)}% smaller)`)
