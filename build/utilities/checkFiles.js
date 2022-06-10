"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistImageFull = exports.checkExistImageResize = void 0;
const fs_1 = __importDefault(require("fs"));
// Check file image resize exist
function checkExistImageResize(outputFile, filename, width, height) {
    const fileInImageThumb = fs_1.default.readdirSync(outputFile);
    const fileResizeUrl = filename + '_thumb-' + width + 'x' + height + '.jpg';
    function checkImageResize(element) {
        return element === fileResizeUrl;
    }
    const isCheckImageResize = fileInImageThumb.some(checkImageResize);
    return isCheckImageResize;
}
exports.checkExistImageResize = checkExistImageResize;
// Check file image full exist
function checkExistImageFull(inputFile, filename) {
    const FileInImageFull = fs_1.default.readdirSync(inputFile);
    const fileFullUrl = filename + '.jpg';
    function checkImageFull(element) {
        return element === fileFullUrl;
    }
    const isCheckImageFull = FileInImageFull.some(checkImageFull);
    return isCheckImageFull;
}
exports.checkExistImageFull = checkExistImageFull;
