import { fileURLToPath } from 'url';
import path from 'path';
import { exploreDirectory } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [
  '../static/photos/carousel',
  '../static/photos/fleeting-embrace',
  '../static/photos/cerulean-sky',
  '../static/photos/smile',
  '../static/photos/whisper',
  '../static/photos/'
].map((directory) => path.join(__dirname, directory));

const resolutions = [100, 200, 400, 800, 1000, 1400, 1800];

for (const directory of directories) {
  await exploreDirectory(directory, resolutions);
  console.log(`Finished compressing images in ${directory}`);
}
