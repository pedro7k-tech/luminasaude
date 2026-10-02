import sharp from 'sharp';
import path from 'path';

const inputPath = 'c:/Users/User/OneDrive/Área de Trabalho/LUMINA SAÚDE/public/logo-header.png';
const outputPath = 'c:/Users/User/OneDrive/Área de Trabalho/LUMINA SAÚDE/public/logo-header-transparent.png';

async function processLogo() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Make pixels close to white transparent
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // If pixel is near white (r, g, b > 235)
    if (r > 235 && g > 235 && b > 235) {
      // Smooth alpha transition for near-white anti-aliasing
      const avg = (r + g + b) / 3;
      if (avg > 250) {
        data[i + 3] = 0; // Fully transparent
      } else {
        const factor = (250 - avg) / 15; // 0 to 1
        data[i + 3] = Math.round(factor * 255);
      }
    }
  }

  await sharp(data, {
    raw: { width, height, channels }
  })
  .png()
  .toFile(outputPath);

  console.log('Processed transparent logo saved to:', outputPath);
}

processLogo().catch(console.error);
