import { userService } from '../../services/user.service';
import mssql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import lodash from 'lodash';
import { user as User } from '../../interfaces/user.interface';

// Mock dependencies
jest.mock('mssql');
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(),
}));
jest.mock('lodash', () => ({
  isEmpty: jest.fn(),
}));

describe('userService', () => {
  let service: userService;
  let mockRequest: any;
  let mockPool: any;

  beforeEach(() => {
    service = new userService();
    mockRequest = {
      input: jest.fn().mockReturnThis(),
      execute: jest.fn(),
      query: jest.fn(),
    };
    mockPool = {
      request: jest.fn().mockReturnValue(mockRequest),
      connected: true,
    };

    (mssql.connect as jest.Mock).mockResolvedValue(mockPool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a single user successfully', async () => {
    const user_id = 'test-user-id';
    const mockUser = {
      id: user_id,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'hashed-password',
      profile: 'profile-url',
      role: 'user',
      createdAt: '2024-07-19T14:14:19.671448',
    };

    mockRequest.execute.mockResolvedValue({
      recordset: [mockUser],
    });

    const result = await service.fetchSingleUser(user_id);

    expect(result).toEqual({ user: mockUser });
    expect(mockRequest.input).toHaveBeenCalledWith('user_id', mssql.VarChar, user_id);
  });

  it('should return error if user not found', async () => {
    const user_id = 'non-existing-user-id';

    mockRequest.execute.mockResolvedValue({
      recordset: [],
    });

    const result = await service.fetchSingleUser(user_id);

    expect(result).toEqual({ error: 'User not found' });
  });

  it('should switch roles successfully', async () => {
    const user_id = 'test-user-id';

    mockRequest.execute.mockResolvedValueOnce({
      recordset: [{ role: 'user' }], // current role fetch
    }).mockResolvedValueOnce({
      rowsAffected: [1], // role update
    });

    const result = await service.switchRoles(user_id);

    expect(result).toEqual({ message: 'Role switched successfully' });
    expect(mockRequest.input).toHaveBeenCalledWith('user_id', mssql.VarChar, user_id);
  });

  it('should return error if unable to switch roles', async () => {
    const user_id = 'test-user-id';

    mockRequest.execute.mockResolvedValueOnce({
      recordset: [{ role: 'user' }], // current role fetch
    }).mockResolvedValueOnce({
      rowsAffected: [0], // no role update
    });

    const result = await service.switchRoles(user_id);

    expect(result).toEqual({ error: 'Unable to switch role' });
  });

  it('should register a user successfully', async () => {
    const mockUser: User = {
      id: 'unique-id',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
      profile: 'profile-url',
      role: 'user',
      createdAt: '2024-07-19T14:14:19.671448',
    };

    (uuidv4 as jest.Mock).mockReturnValue('unique-id');
    (bcrypt.hashSync as jest.Mock).mockReturnValue('hashed-password');
    (lodash.isEmpty as unknown as jest.Mock).mockReturnValue(true);

    mockRequest.query.mockResolvedValueOnce({ recordset: [] }) // email does not exist
      .mockResolvedValueOnce({ recordset: [] }); // phone number does not exist

    mockRequest.execute.mockResolvedValue({
      rowsAffected: [1],
    });

    const result = await service.registerUser(mockUser);

    expect(result).toEqual({ message: 'Account created successfully' });
    expect(mockRequest.input).toHaveBeenCalledWith('id', mssql.VarChar, 'unique-id');
  });

  it('should return error if email already in use', async () => {
    const mockUser: User = {
      id: 'unique-id',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
      profile: 'profile-url',
      role: 'user',
      createdAt: '2024-07-19T14:14:19.671448',
    };

    (uuidv4 as jest.Mock).mockReturnValue('unique-id');
    (bcrypt.hashSync as jest.Mock).mockReturnValue('hashed-password');
    (lodash.isEmpty as unknown as jest.Mock).mockReturnValueOnce(false); // email exists

    mockRequest.query.mockResolvedValueOnce({
      recordset: [{ email: 'john.doe@example.com' }],
    });

    const result = await service.registerUser(mockUser);

    expect(result).toEqual({ error: 'Email already in use' });
  });

  it('should return error if phone number already in use', async () => {
    const mockUser: User = {
      id: 'unique-id',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
      profile: 'profile-url',
      role: 'user',
      createdAt: '2024-07-19T14:14:19.671448',
    };

    (uuidv4 as jest.Mock).mockReturnValue('unique-id');
    (bcrypt.hashSync as jest.Mock).mockReturnValue('hashed-password');
    (lodash.isEmpty as unknown as jest.Mock)
      .mockReturnValueOnce(true) // email does not exist
      .mockReturnValueOnce(false); // phone number exists

    mockRequest.query.mockResolvedValueOnce({ recordset: [] }) // email does not exist
      .mockResolvedValueOnce({
        recordset: [{ phoneNumber: '1234567890' }],
      });

    const result = await service.registerUser(mockUser);

    expect(result).toEqual({ error: 'Phone number already in use' });
  });

  it('should fetch all users successfully', async () => {
    const mockUsers = [{
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'hashed-password',
      profile: 'profile-url',
      role: 'user',
      createdAt: '2024-07-19T14:14:19.671448',
    }];

    mockRequest.execute.mockResolvedValue({
      recordset: mockUsers,
    });

    const result = await service.fetchAllUsers();

    expect(result).toEqual({ users: mockUsers });
  });

  it('should return message if no users found', async () => {
    mockRequest.execute.mockResolvedValue({
      recordset: [],
    });

    const result = await service.fetchAllUsers();

    expect(result).toEqual({ message: 'No users at the moment' });
  });
});
