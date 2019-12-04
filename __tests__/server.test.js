const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');
const request = require('supertest');
const app = require('../server/server');

iconv.encodings = encodings;

describe('GET /api/images/3 ', () => {
  test('It should respond with an object', async () => {
    const response = await request(app).get('/api/images/3');
    expect(typeof response.body).toEqual('object');
    expect(response.statusCode).toBe(200);
  });
});
