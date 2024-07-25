import { v4 as uuidv4 } from 'uuid';
import { Booking } from '../interfaces/booking.interface';
import { sqlConfig } from '../config/sqlConfig';
import mssql from 'mssql';

export class BookService {
  async createBook(booking: Partial<Booking>) {
    try {
      const pool = await mssql.connect(sqlConfig);

      // Generate id and bookingDate internally
      const id = uuidv4();
      const bookingDate = new Date();

      console.log("Booking data being passed to the stored procedure:", {
        id,
        userId: booking.userId,
        eventId: booking.eventId,
        type: booking.type,
        numberOfPeople: booking.numberOfPeople,
        bookingDate
      });

      const result = await pool.request()
        .input("BookingId", mssql.VarChar(50), id) // Assuming `BookingId` is now VARCHAR(50)
        .input("UserId", mssql.VarChar(255), booking.userId)
        .input("EventId", mssql.NVarChar(36), booking.eventId)
        .input("Type", mssql.NVarChar(10), booking.type)
        .input("NumberOfPeople", mssql.Int, booking.numberOfPeople)
        .execute("insertBooking");

      console.log("Stored Procedure Result:", result);

      if (result.recordset && result.recordset.length > 0 && result.recordset[0].BookingId) {
        return {
          BookingId: result.recordset[0].BookingId,
          message: "Event booked successfully"
        };
      } else {
        return {
          error: "Unable to book Event ..."
        };
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error creating booking:", errorMessage);
      return {
        error: errorMessage
      };
    }
  }

  async getAllBook() {
    const pool = await mssql.connect(sqlConfig);

    const response = (await pool.request().query('SELECT * FROM Bookings')).recordset;

    return {
      bookings: response
    };
  }

  async deleteBook(id: string) {
    const pool = await mssql.connect(sqlConfig);

    const response = await (await pool.request().query(`SELECT * FROM Bookings WHERE Id = '${id}'`)).recordset;

    if (response.length < 1) {
      return {
        error: "The event specified is not found ..."
      };
    } else {
      await pool.request().query(`DELETE FROM Bookings WHERE Id = '${id}'`);
      return {
        message: "Event deleted successfully ..."
      };
    }
  }

  async getBookByID(id: string) {
    const pool = await mssql.connect(sqlConfig);

    const response = await (await pool.request().query(`SELECT * FROM Bookings WHERE Id = '${id}'`)).recordset;

    if (response.length < 1) {
      return {
        error: "Sorry there are no results for the specified event."
      };
    } else {
      return {
        booking: response[0]
      };
    }
  }
}
