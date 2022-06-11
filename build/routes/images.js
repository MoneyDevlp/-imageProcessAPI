"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configFolder_1 = __importDefault(require("../configFolder"));
const imageProcess_1 = __importDefault(require("../utilities/imageProcess"));
const checkFiles_1 = require("../utilities/checkFiles");
const images = express_1.default.Router();
const inputFile = configFolder_1.default.ASSETS + '/imageFull/';
const outputFile = configFolder_1.default.ASSETS + '/imageThumb/';
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const imageAfterResize = configFolder_1.default.ASSETS +
        '/imageThumb/' +
        filename +
        `_thumb-${width}x${height}.jpg`;
    // Handle image resize
    if (!filename || !width || !height) {
        res.send('Filename, width or height does not exist on url ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
    }
    else if (width <= 0 || height <= 0) {
        res.send('Invalid width or height ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
    }
    else if (!(0, checkFiles_1.checkExistImageFull)(inputFile, filename)) {
        res.send('Filename is not exist ! Please enter another filename');
    }
    else if ((0, checkFiles_1.checkExistImageResize)(outputFile, filename, width, height)) {
        res.status(200).sendFile(imageAfterResize);
        console.log('Image already exists, no need to process');
    }
    else {
        yield (0, imageProcess_1.default)(filename, width, height);
        res.status(200).sendFile(imageAfterResize);
    }
}));
exports.default = images;
