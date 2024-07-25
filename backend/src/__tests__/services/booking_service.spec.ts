import { BookService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking.interface';
import { sqlConfig } from '../../config/sqlConfig';
import mssql from 'mssql';
import { v4 as uuidv4 } from 'uuid';

jest.mock('mssql');
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const mockPool = {
  request: jest.fn().mockReturnThis(),
  input: jest.fn().mockReturnThis(),
  execute: jest.fn(),
  query: jest.fn()
};

(mssql as jest.Mocked<typeof mssql>).connect = jest.fn().mockResolvedValue(mockPool);

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error to suppress errors
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore(); // Restore console.error after each test
  });

  describe('createBook', () => {
    it('should create a booking and return the booking ID', async () => {
      const mockBooking: Partial<Booking> = {
        userId: 'user123',
        eventId: 'event123',
        type: 'single',
        numberOfPeople: 1
      };
      const mockUuid = 'mock-uuid';
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
      const mockDate = new Date();
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date);

      mockPool.execute.mockResolvedValue({
        recordset: [{ BookingId: mockUuid }]
      });

      const result = await bookService.createBook(mockBooking);

      expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
      expect(mockPool.request).toHaveBeenCalledTimes(1); // Ensure only one request
      expect(mockPool.input).toHaveBeenCalledWith('BookingId', mssql.VarChar(50), mockUuid);
      expect(mockPool.input).toHaveBeenCalledWith('UserId', mssql.VarChar(255), mockBooking.userId);
      expect(mockPool.input).toHaveBeenCalledWith('EventId', mssql.NVarChar(36), mockBooking.eventId);
      expect(mockPool.input).toHaveBeenCalledWith('Type', mssql.NVarChar(10), mockBooking.type);
      expect(mockPool.input).toHaveBeenCalledWith('NumberOfPeople', mssql.Int, mockBooking.numberOfPeople);
      expect(mockPool.execute).toHaveBeenCalledWith('insertBooking');
      expect(result).toEqual({
        BookingId: mockUuid,
        message: 'Event booked successfully'
      });
    });

    it('should return an error if booking fails', async () => {
      const mockBooking: Partial<Booking> = {
        userId: 'user123',
        eventId: 'event123',
        type: 'single',
        numberOfPeople: 1
      };
      const mockError = new Error('Test error');
      mockPool.execute.mockRejectedValue(mockError);

      const result = await bookService.createBook(mockBooking);

      expect(result).toEqual({
        error: 'Test error'
      });
    });
  });

  describe('getAllBook', () => {
    it('should return all bookings', async () => {
      const mockBookings = [{ id: '1', userId: 'user1', eventId: 'event1' }];
      mockPool.query.mockResolvedValue({ recordset: mockBookings });

      const result = await bookService.getAllBook();

      expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM Bookings');
      expect(result).toEqual({ bookings: mockBookings });
    });
  });

  describe('deleteBook', () => {
    it('should delete a booking if it exists', async () => {
      const mockId = '1';
      const mockBooking = [{ id: mockId }];
      mockPool.query.mockResolvedValueOnce({ recordset: mockBooking });
      mockPool.query.mockResolvedValueOnce({});

      const result = await bookService.deleteBook(mockId);

      expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
      expect(mockPool.request).toHaveBeenCalledTimes(2); // Two requests expected: one for checking existence and one for deleting
      expect(mockPool.query).toHaveBeenCalledWith(`SELECT * FROM Bookings WHERE Id = '${mockId}'`);
      expect(mockPool.query).toHaveBeenCalledWith(`DELETE FROM Bookings WHERE Id = '${mockId}'`);
      expect(result).toEqual({ message: 'Event deleted successfully ...' });
    });

    it('should return an error if booking does not exist', async () => {
      const mockId = '1';
      mockPool.query.mockResolvedValueOnce({ recordset: [] });

      const result = await bookService.deleteBook(mockId);

      expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
      expect(mockPool.request).toHaveBeenCalledTimes(1); // Only one request expected for checking existence
      expect(mockPool.query).toHaveBeenCalledWith(`SELECT * FROM Bookings WHERE Id = '${mockId}'`);
      expect(result).toEqual({ error: 'The event specified is not found ...' });
    });
  });

  describe('getBookByID', () => {
    it('should return a booking if it exists', async () => {
      const mockId = '1';
      const mockBooking = { id: mockId, userId: 'user1', eventId: 'event1' };
      mockPool.query.mockResolvedValue({ recordset: [mockBooking] });

      const result = await bookService.getBookByID(mockId);

      expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
      expect(mockPool.request).toHaveBeenCalledTimes(1); // Only one request expected
      expect(mockPool.query).toHaveBeenCalledWith(`SELECT * FROM Bookings WHERE Id = '${mockId}'`);
      expect(result).toEqual({ booking: mockBooking });
    });

    it('should return an error if booking does not exist', async () => {
      const mockId = '1';
      mockPool.query.mockResolvedValue({ recordset: [] });

      const result = await bookService.getBookByID(mockId);

      expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
      expect(mockPool.request).toHaveBeenCalledTimes(1); // Only one request expected
      expect(mockPool.query).toHaveBeenCalledWith(`SELECT * FROM Bookings WHERE Id = '${mockId}'`);
      expect(result).toEqual({ error: 'Sorry there are no results for the specified event.' });
    });
  });
});
