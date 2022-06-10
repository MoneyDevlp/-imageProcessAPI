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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const checkFiles_1 = require("../utilities/checkFiles");
const images = express_1.default.Router();
const inputFile = configFolder_1.default.ASSETS + '/imageFull/';
const outputFile = configFolder_1.default.ASSETS + '/imageThumb/';
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    // Handle image resize
    if (!filename || !width || !height) {
        res.send('Filename, width or height does not exist on url ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
    }
    else if (Number(width) <= 0 || Number(height) <= 0) {
        res.send('Invalid width or height ! Please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
    }
    else if (!(0, checkFiles_1.checkExistImageFull)(inputFile, filename)) {
        res.send('Filename is not exist ! Please enter another filename');
    }
    else if ((0, checkFiles_1.checkExistImageResize)(outputFile, filename, Number(width), Number(height))) {
        res.sendFile(path_1.default.join(outputFile, filename + `_thumb-${width}x${height}.jpg`));
    }
    else {
        yield (0, sharp_1.default)(inputFile + filename + '.jpg')
            .resize({
            width: Number(width),
            height: Number(height),
        })
            .toFile(outputFile + filename + `_thumb-${width}x${height}.jpg`);
        res.sendFile(path_1.default.join(outputFile, filename + `_thumb-${width}x${height}.jpg`));
    }
}));
exports.default = images;
