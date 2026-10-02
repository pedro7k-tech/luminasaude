import fs from 'fs';
import path from 'path';

const baseDir = 'c:/Users/User/OneDrive/Área de Trabalho/LUMINA SAÚDE';

function fileToBase64(filePath, mimeType) {
  const fullPath = path.join(baseDir, filePath);
  if (!fs.existsSync(fullPath)) {
    console.error('File not found:', fullPath);
    return '';
  }
  const buffer = fs.readFileSync(fullPath);
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

const images = {
  logoHeader: fileToBase64('public/logo-header-transparent.png', 'image/png'),
  alanaHero: fileToBase64('public/alana-costa.jpg', 'image/jpeg'),
  alanaSobre: fileToBase64('public/alana-costa-sobre.jpg', 'image/jpeg'),
  facade: fileToBase64('public/espaco/facade.jpg', 'image/jpeg'),
  consultorio: fileToBase64('public/espaco/consultorio.jpg', 'image/jpeg'),
  recepcao: fileToBase64('public/espaco/recepcao.jpg', 'image/jpeg'),
  espacoKids: fileToBase64('public/espaco/espaco-kids.jpg', 'image/jpeg'),
};

const tsContent = `// Auto-generated Base64 Image Assets for single-file deployment

export const IMAGES = {
  logoHeader: "${images.logoHeader}",
  alanaHero: "${images.alanaHero}",
  alanaSobre: "${images.alanaSobre}",
  facade: "${images.facade}",
  consultorio: "${images.consultorio}",
  recepcao: "${images.recepcao}",
  espacoKids: "${images.espacoKids}",
};
`;

const targetPath = path.join(baseDir, 'src/assets/images.ts');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, tsContent, 'utf8');

console.log('Successfully generated Base64 images module at:', targetPath);
console.log('Logo Base64 length:', images.logoHeader.length);
console.log('Hero Base64 length:', images.alanaHero.length);
