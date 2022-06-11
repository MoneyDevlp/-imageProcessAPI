import express from 'express';
import { Request, Response } from 'express';
import images from './routes/images';

const app = express();
const port = 3000;

app.use('/api/images', images);

app.get('*', (req: Request, res: Response): void => {
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
app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`);
});

export default app;
