import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../Src/Models/UserModel';
import { createUser } from '../Src/Controllers/UserController';
import { successResponse } from '../Src/Services/Response';
import { ConflictException } from '../Src/Exceptions/ConflictException';

jest.mock('../Src/Services/Response');

// Mock UUID generation function
jest.mock('uuid', () => ({
  v4: () => 'ca8bfaf8-b688-4b00-814f-475452bb1633',
}));

describe('CreateUser Function', () => {
  const req: Request = {
    body: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'jsmith@gmail.com',
      password: 'password@',
    },
  } as Request;
  const res: Response = {} as Response;
  const next = jest.fn();

  it('should create a new user and return success response', async () => {
    const hashedPassword = 'hashed_password';
    const newUser = {
      id: 1,
      uuid: 'ca8bfaf8-b688-4b00-814f-475452bb1633',
      firstName: 'John',
      lastName: 'Smith',
      email: 'jsmith@gmail.com',
      password: hashedPassword,
    };

    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
    jest.spyOn(User, 'create').mockResolvedValue(newUser);

    await createUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'jsmith@gmail.com' },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith('password@', expect.any(Number));
    expect(User.create).toHaveBeenCalledWith({
      uuid: 'ca8bfaf8-b688-4b00-814f-475452bb1633',
      firstName: 'John',
      lastName: 'Smith',
      email: 'jsmith@gmail.com',
      password: hashedPassword,
    });
    expect(successResponse).toHaveBeenCalledWith(
      res,
      'User created successfully',
      { newUser }
    );
  });

  it('should throw ConflictException if email already exists', async () => {
    const existingUser = {
      id: 1,
      uuid: 'ca8bfaf8-b688-4b00-814f-475452bb1633',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jsmith@gmail.com',
      password: 'hashed_password',
    };
    const findOneMock = jest.fn().mockResolvedValue(existingUser);

    jest.spyOn(User, 'findOne').mockImplementation(findOneMock);

    await createUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'jsmith@gmail.com' },
    });
    expect(next).toHaveBeenCalledWith(
      new ConflictException('Email already exists')
    );
  });
});
