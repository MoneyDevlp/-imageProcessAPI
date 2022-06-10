"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api/images', images_1.default);
app.get('*', (req, res) => {
    res.send(`
    <div>
      <img style="display:flex; margin-left:auto; margin-right:auto"
      src="https://thumbs.dreamstime.com/b/not-valid-red-stamp-text-white-48506534.jpg" />
      <p style="text-align:center; font-size: 20px; font-weight: bold;font-family: cursive"
      >Invalid path, please re-enter ! ex: http://localhost:3000/api/images?filename=fjord&width=300&height=300</p>
    </div>
  `);
});
// Listen port 3000
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
exports.default = app;
