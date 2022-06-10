import express from 'express';
import { Request, Response } from 'express';
import configFolder from '../configFolder';
import sharp from 'sharp';
import path from 'path';
import {
  checkExistImageResize,
  checkExistImageFull,
} from '../utilities/checkFiles';

const images = express.Router();

const inputFile = configFolder.ASSETS + '/imageFull/';
const outputFile = configFolder.ASSETS + '/imageThumb/';

images.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;

  // Handle image resize
  if (!filename || !width || !height) {
    res.send('Filename, width or height does not exist on url ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
  } else if (Number(width) <= 0 || Number(height) <= 0) {
    res.send('Invalid width or height ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
  } else if (!checkExistImageFull(inputFile, filename as string)) {
    res.send('Filename is not exist ! Please enter another filename');
  } else if (
    checkExistImageResize(
      outputFile,
      filename as string,
      Number(width),
      Number(height)
    )
  ) {
    res.sendFile(
      path.join(
        outputFile,
        (filename as string) + `_thumb-${width}x${height}.jpg`
      )
    );
  } else {
    await sharp(inputFile + filename + '.jpg')
      .resize({
        width: Number(width),
        height: Number(height),
      })
      .toFile(outputFile + filename + `_thumb-${width}x${height}.jpg`);

    res.sendFile(
      path.join(
        outputFile,
        (filename as string) + `_thumb-${width}x${height}.jpg`
      )
    );
  }
});

export default images;
