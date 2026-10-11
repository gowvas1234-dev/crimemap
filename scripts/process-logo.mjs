import sharp from 'sharp'

async function processLogo() {
  const inputPath = 'C:\\Users\\gowva\\OneDrive\\Desktop\\crimemap\\pp logo 2.webp'
  const img = sharp(inputPath)
  const meta = await img.metadata()
  const width = meta.width
  const height = meta.height

  const { data } = await img.raw().toBuffer({ resolveWithObject: true })

  // 4 channels RGBA
  const outData = Buffer.alloc(width * height * 4)

  // BFS flood-fill from corners to find connected background
  const visited = new Uint8Array(width * height)
  const queue = []

  function isBg(r, g, b) {
    // Background is near white/light-gray: r>235 && g>235 && b>235
    return r >= 235 && g >= 235 && b >= 235
  }

  // Seed with all edge pixels that match background
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const idx = (y * width + x) * 3
      if (isBg(data[idx], data[idx + 1], data[idx + 2])) {
        const p = y * width + x
        visited[p] = 1
        queue.push(p)
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      const idx = (y * width + x) * 3
      if (isBg(data[idx], data[idx + 1], data[idx + 2])) {
        const p = y * width + x
        if (!visited[p]) {
          visited[p] = 1
          queue.push(p)
        }
      }
    }
  }

  let head = 0
  while (head < queue.length) {
    const curr = queue[head++]
    const cx = curr % width
    const cy = Math.floor(curr / width)

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ]

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const np = ny * width + nx
        if (!visited[np]) {
          const nidx = np * 3
          if (isBg(data[nidx], data[nidx + 1], data[nidx + 2])) {
            visited[np] = 1
            queue.push(np)
          }
        }
      }
    }
  }

  // Write out pixels: visited background becomes transparent, emblem retains full opacity
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x
      const inIdx = p * 3
      const outIdx = p * 4

      const r = data[inIdx]
      const g = data[inIdx + 1]
      const b = data[inIdx + 2]

      outData[outIdx] = r
      outData[outIdx + 1] = g
      outData[outIdx + 2] = b

      if (visited[p]) {
        outData[outIdx + 3] = 0 // completely transparent
      } else {
        // Soft edge anti-aliasing near background
        if (r > 230 && g > 230 && b > 230) {
          const brightness = (r + g + b) / 3
          const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * 4)))
          outData[outIdx + 3] = alpha
        } else {
          outData[outIdx + 3] = 255
        }
      }
    }
  }

  // Save transparent versions in public/
  await sharp(outData, { raw: { width, height, channels: 4 } })
    .webp({ quality: 95 })
    .toFile('public/pp-logo-2.webp')

  await sharp(outData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/pp-logo-2.png')

  console.log('Successfully created clean transparent pp-logo-2 assets!')
}

processLogo().catch(console.error)
