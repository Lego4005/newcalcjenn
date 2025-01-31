import fs from 'fs';
import path from 'path';

export function getLogoDataUrl(): string {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'roca-logo.png');
    const logoBuffer = fs.readFileSync(logoPath);
    const base64Logo = logoBuffer.toString('base64');
    return `data:image/png;base64,${base64Logo}`;
  } catch (error) {
    console.error('Error loading logo:', error);
    return '';
  }
}