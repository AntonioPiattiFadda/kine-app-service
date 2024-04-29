// // const jest = require('jest');
// //El framework recomienda inportarlo con ese nombre porque es como si fuera el axios, el va a hacer la peticio y jest lo va a testar.
// const request = require('supertest');
// const app = require('../index');

// describe('GET /api/v1/unit-price', () => {
//   test('should responde with an array', async () => {
//     const response = await request(app).get('/api/v1/unit-price').send();
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//   });

//   test('should responde with an array of unit prices', async () => {
//     const response = await request(app).get('/api/v1/unit-price').send();
//     const [unitPrice] = response.body;
//     expect(unitPrice).toHaveProperty('id');
//     expect(unitPrice).toHaveProperty('name');
//     expect(unitPrice).toHaveProperty('value');
//     expect(unitPrice).toHaveProperty('blocked');
//     expect(unitPrice).toHaveProperty('productId');
//   });
// });

// describe('POST /api/v1/unit-price', () => {
//   test('should create a new unit price', async () => {
//     // El validador no me permite porner id y blocked pero el modelo si lo permite
//     const newUnitPrice = {
//       id: 99499,
//       name: '100gr',
//       value: 9999999,
//       blocked: false,
//       productId: 39,
//     };
//     const response = await request(app)
//       .post('/api/v1/unit-price')
//       .send(newUnitPrice);
//     expect(response.statusCode).toBe(201);
//     expect(response.body).toMatchObject(newUnitPrice);
//   });

//   test("should have a content-type 'application/json' in header", async () => {
//     const newUnitPrice = {
//       id: 927853,
//       name: '100gr',
//       value: 9999999,
//       blocked: false,
//       productId: 39,
//     };
//     const response = await request(app)
//       .post('/api/v1/unit-price')
//       .send(newUnitPrice);
//     expect(response.headers['content-type']).toMatch(/json/);
//   });

//   test("should responde with an json object with a property 'id'", async () => {
//     const newUnitPrice = {
//       id: 9734564,
//       name: '100gr',
//       value: 9999999,
//       blocked: false,
//       productId: 39,
//     };
//     const response = await request(app)
//       .post('/api/v1/unit-price')
//       .send(newUnitPrice);
//     expect(response.body).toHaveProperty('id');
//   });
// });
