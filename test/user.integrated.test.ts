import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import app from '../Src/Index';
import { sequelize } from '../Src/Db/Db';

describe('User Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({
          uuid: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          password: 'password@',
        })
        .expect(200);
      expect(res.body.message).toBe('User created successfully');
      expect(res.body.payload.newUser.firstName).toBe('John');
      expect(res.body.payload.newUser.lastName).toBe('Doe');
      expect(res.body.payload.newUser.email).toBe('johndoe@example.com');
      expect(res.body.payload.newUser.password).not.toBe('password@');
    });

    it('should return 400 if any required parameter is missing', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({
          uuid: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
        })
        .expect(422);
      expect(res.body.message).toBe('Unprocessable Entity');
      expect(res.body.errors.password).toBe('password is required');
    });

    it('should return 409 if email already exists', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({
          uuid: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          password: 'password@',
        })
        .expect(409);
      expect(res.body.message).toBe('Email already exists');
    });
  });
});
