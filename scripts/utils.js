import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function exploreDirectory(directory, resolutions) {
  for (const file of fs.readdirSync(directory)) {
    if (fs.lstatSync(`${directory}/${file}`).isDirectory()) {
      continue;
    }
    if (file === '.gitignore') {
      continue;
    }

    const fileExtension = path.extname(file);
    //ignore the file if it's already a webp
    if (fileExtension === '.webp') {
      continue;
    }
    const baseName = path.basename(file, fileExtension);

    for (const resolution of resolutions) {
      await sharp(`${directory}/${file}`)
        .resize(resolution)
        .toFormat('webp')
        .toFile(`${directory}/${baseName}-${resolution}.webp`);
    }
  }
}
