import { authService } from '../../services/auth.service';
import mssql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mocking the mssql module
jest.mock('mssql');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('authService', () => {
  let service: authService;

  beforeEach(() => {
    service = new authService();
  });

  it('should return an error if user not found', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({ recordset: [] })
    };

    const mockPool = {
      request: jest.fn().mockReturnValue(mockRequest)
    };

    (mssql.connect as jest.Mock).mockResolvedValue(mockPool);

    const logins = { email: 'test@example.com', password: 'password123' };

    const result = await service.login(logins);

    expect(result).toEqual({ error: 'user not found' });
  });

  it('should return an error if password does not match', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({
        recordset: [
          { email: 'test@example.com', password: 'hashedPassword123' }
        ]
      })
    };

    const mockPool = {
      request: jest.fn().mockReturnValue(mockRequest)
    };

    (mssql.connect as jest.Mock).mockResolvedValue(mockPool);

    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    const logins = { email: 'test@example.com', password: 'password123' };

    const result = await service.login(logins);

    expect(result).toEqual({ error: 'Incorrect password' });
  });

  it('should return a token if login is successful', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({
        recordset: [
          {
            email: 'test@example.com',
            password: bcrypt.hashSync('password123', 8), // Mock hashed password
            name: 'Test User',
            phone_number: '1234567890',
            createdAt: new Date()
          }
        ]
      })
    };

    const mockPool = {
      request: jest.fn().mockReturnValue(mockRequest)
    };

    (mssql.connect as jest.Mock).mockResolvedValue(mockPool);

    const token = 'mockToken';
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(token);

    const logins = { email: 'test@example.com', password: 'password123' };

    const result = await service.login(logins);

    expect(result).toEqual({
      message: 'Logged in successfully',
      token
    });
  });
});
