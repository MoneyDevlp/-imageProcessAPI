import supertest from 'supertest';
import app from '../index';
import images from '../routes/images';

const request = supertest(app);

describe('Test endpoint', () => {
  describe('Test endpoint /api', () => {
    it('Gets the /api endpoint successful', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });
  });

  describe('Test endpoint /api/images', () => {
    it('Gets the /api/images endpoint successful', async () => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(200);
    });
  });

  describe('Test endpoint /api/images not exist filename', () => {
    it('Gets the /api/images endpoint failed, filename is not exist successful', async () => {
      const response = await request.get(
        '/api/images?filename=xyzzyx&width=200&height=200'
      );
      expect(response.text).toBe(
        'Filename is not exist ! Please enter another filename'
      );
    });
  });

  describe('Test image processing successful', () => {
    it('Image processing successful', async () => {
      const imageProcess = await app.use('/api/images', images);
      expect(imageProcess.response.statusCode).toEqual(200);
    });
  });
});
