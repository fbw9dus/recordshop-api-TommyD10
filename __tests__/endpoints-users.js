const app = require('../app')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/User')
const {exec} = require('child_process')
const faker = require('faker')

let server;

describe('Users Endpoints', () => {
    test('should create new user', async done => {
        const fakeUser = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await request(app)
            .post(`/users`)
            .send(fakeUser)
        const checkUser = await User.findOne({'email': fakeUser.email})
        expect(checkUser).toHaveProperty(['email'])
        done()
    })
})

beforeAll(async (done) => {
    exec('npm run seed')
    server = app.listen(3000, () => {
        global.agent = request.agent(server);
        done();
    });
});
  
afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});