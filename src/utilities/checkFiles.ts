import fs from 'fs';

// Check file image resize exist
function checkExistImageResize(
  outputFile: string,
  filename: string,
  width: number,
  height: number
): boolean {
  const fileInImageThumb = fs.readdirSync(outputFile);
  const fileResizeUrl =
    (filename as string) + '_thumb-' + width + 'x' + height + '.jpg';

  function checkImageResize(element: string) {
    return element === fileResizeUrl;
  }
  const isCheckImageResize = fileInImageThumb.some(checkImageResize);
  return isCheckImageResize;
}

// Check file image full exist
function checkExistImageFull(inputFile: string, filename: string): boolean {
  const FileInImageFull = fs.readdirSync(inputFile);
  const fileFullUrl = (filename as string) + '.jpg';

  function checkImageFull(element: string) {
    return element === fileFullUrl;
  }
  const isCheckImageFull = FileInImageFull.some(checkImageFull);
  return isCheckImageFull;
}

export { checkExistImageResize, checkExistImageFull };
