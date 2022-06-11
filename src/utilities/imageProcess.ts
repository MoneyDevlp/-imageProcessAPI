import sharp from 'sharp';
import configFolder from '../configFolder';

const imageProcess = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  const inputFile = configFolder.ASSETS + '/imageFull/' + filename + '.jpg';
  const outputFile =
    configFolder.ASSETS +
    '/imageThumb/' +
    filename +
    `_thumb-${width}x${height}.jpg`;

  await sharp(inputFile)
    .resize({
      width: Number(width),
      height: Number(height),
    })
    .toFile(outputFile);
};

export default imageProcess;
