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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint', () => {
    describe('Test endpoint /api', () => {
        it('Gets the /api endpoint successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api');
            expect(response.status).toBe(200);
        }));
    });
    describe('Test endpoint /api/images', () => {
        it('Gets the /api/images endpoint successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images');
            expect(response.status).toBe(200);
        }));
    });
    describe('Test endpoint /api/images not exist filename', () => {
        it('Gets the /api/images endpoint failed, filename is not exist successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=xyzzyx&width=200&height=200');
            expect(response.text).toBe('Filename is not exist ! Please enter another filename');
        }));
    });
});
