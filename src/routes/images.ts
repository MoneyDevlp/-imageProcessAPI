import express from 'express';
import { Request, Response } from 'express';
import configFolder from '../configFolder';
import imageProcess from '../utilities/imageProcess';
import {
  checkExistImageResize,
  checkExistImageFull,
} from '../utilities/checkFiles';

const images = express.Router();

const inputFile = configFolder.ASSETS + '/imageFull/';
const outputFile = configFolder.ASSETS + '/imageThumb/';

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const imageAfterResize =
    configFolder.ASSETS +
    '/imageThumb/' +
    filename +
    `_thumb-${width}x${height}.jpg`;

  // Handle image resize
  if (!filename || !width || !height) {
    res.send(
      'Filename, width or height does not exist on url ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300'
    );
  } else if (width <= 0 || height <= 0) {
    res.send(
      'Invalid width or height ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300'
    );
  } else if (!checkExistImageFull(inputFile, filename)) {
    res.send('Filename is not exist ! Please enter another filename');
  } else if (checkExistImageResize(outputFile, filename, width, height)) {
    res.status(200).sendFile(imageAfterResize);
    console.log('Image already exists, no need to process');
  } else {
    await imageProcess(filename, width, height);
    res.status(200).sendFile(imageAfterResize);
  }
});

export default images;
