import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const directories = ['./static/photos', './static/photos/fleeting-embrace'];
const directories = [
  '../static/photos/carousel',
  '../static/photos/fleeting-embrace',
  '../static/photos/cerulean-sky',
  '../static/photos/smile',
  '../static/photos/whisper',
  '../static/photos/'
].map((directory) => path.join(__dirname, directory));

const resolutions = [100, 200, 400, 800, 1000, 1400, 1800];

function exploreDirectory(directory) {
  console.log(`Exploring ${directory}`);
  fs.readdirSync(directory).forEach((file) => {
    console.log(file);
    if (fs.lstatSync(`${directory}/${file}`).isDirectory()) {
      return;
    }

    const fileExtension = path.extname(file);
    //ignore the file if it's already a webp
    if (fileExtension === '.webp') {
      return;
    }
    const baseName = path.basename(file, fileExtension);

    resolutions.forEach((resolution) => {
      sharp(`${directory}/${file}`)
        .resize(resolution)
        .toFormat('webp')
        .toFile(`${directory}/${baseName}-${resolution}.webp`);
    });
  });
}

directories.forEach((directory) => {
  exploreDirectory(directory);
});
