// const jest = require('jest');
const request = require('supertest');
const app = require('../index');
const expectedResponse = {
  id: 7,
  email: 'lorenzopiattifadda@gmail.com',
  password: '$2b$10$ZQETacuVvpk7mU5.G3PtnO9kQKZiegDGteTFPBMJXrRaauxj1slZO',
  recoveryToken: null,
  role: 'customer',
  createdAt: '2023-09-10T02:11:03.492Z',
}; 

describe('GET /api/v1/users/:id', () => {
  test('should responde with an object', async () => {
    const response = await request(app).get('/api/v1/users/1').send();
    expect(response.statusCode).toBe(200);
    // i want to check if the response is an object with the same propertys as expectedResponse

    expect(response.body).toBeInstanceOf(Object);
    for (const prop in expectedResponse) {
      expect(response.body).toHaveProperty(prop);
    }
  });
});

// describe('POST /api/v1/users', () => {
//   test('should create a new user', async () => {
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
