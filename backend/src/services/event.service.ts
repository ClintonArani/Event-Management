import mssql from 'mssql';
import { v4 } from 'uuid';
import { Event } from '../interfaces/event.interface';
import fs from 'fs';
import path from 'path';
import { sqlConfig } from '../config/sqlConfig';
import e from 'cors';
import ConnectionDB from '../helpers/dbhelper';
import lodash from "lodash"

export class EventService {

  async createEvent(event: Event) {
    console.log(event);
  
    // let result = (
    //   await pool.request()
    //     .input('id', v4())
    //     .input('Image', event.Image)
    //     .input('EventDate', event.EventDate)
    //     .input('EventTime', event.EventTime)
    //     .input('Location', event.Location)
    //     .input('Description', event.Description)
    //     .input('Price', event.Price)
    //     .execute('InsertEvent')
    // ).rowsAffected;

    let result = (await ConnectionDB.executeQuery("InsertEvent", {
      id: v4(),
      Image: event.Image,
      EventDate:event.EventDate,
      EventTime:event.EventTime,
      Location:event.Location,
      Description:event.Description,
      Price:event.Price
    })).rowsAffected;

    console.log(result);
  
    if (Array.isArray(result) && result[0] < 0) {
      return {
        error: 'Unable to create event',
      };
    } else {
      return {
        message: 'Event created successfully',
      };
    }
  }
  

  async getAllEvents() {
    let pool = await mssql.connect(sqlConfig);

    let response = (await pool.request().query('SELECT * FROM events')).recordset;

    return {
      events: response
    };
  }

  async updateEvent(id: string, event: Event) {
    let pool = await mssql.connect(sqlConfig);

    let result = await pool.request()
      .input("Id", id)
      .input("Image", event.Image)
      .input("EventDate", event.EventDate)
      .input("EventTime", event.EventTime)
      .input("Location", event.Location)
      .input("Price", event.Price)
      .input("Description", event.Description)
      .execute("UpdateEventById");

    console.log('Update result:', result);

    if (result.rowsAffected[0] < 1) {
      return {
        error: "Event not found"
      };
    } else {
      return {
        message: "Event updated successfully"
      };
    }
  }

  async deleteEvent(id: string) {
    let pool = await mssql.connect(sqlConfig);

    let response = await (await pool.request().query(`SELECT * FROM events WHERE id = '${id}'`)).recordset;

    if (response.length < 1) {
      return {
        error: "The event specified is not found"
      };
    } else {
      await pool.request().query(`DELETE FROM events WHERE id = '${id}'`);
      return {
        message: "Event deleted successfully"
      };
    }
  }

  async getEventByID(id: string) {
    let pool = await mssql.connect(sqlConfig);

    let response = await (await pool.request().query(`SELECT * FROM events WHERE id = '${id}'`)).recordset;

    if (response.length < 1) {
      return {
        error: "Sorry, there are no results for the specified event."
      };
    } else {
      return {
        event: response[0]
      };
    }
  }

  async fetchUnAssignedEvents() {
    let pool = await mssql.connect(sqlConfig);

    let response = (await pool.request().query('SELECT * FROM events WHERE isBooked = 0')).recordset;

    if (response.length < 1) {
      return {
        error: "No items to display"
      };
    } else {
      return {
        events: response
      };
    }
  }

  async setAssigned(id: string) {
    let pool = await mssql.connect(sqlConfig);

    let request = (await pool.request().query(`UPDATE events SET isBooked = 1 WHERE id = '${id}'`)).rowsAffected;

    if (request[0] < 1) {
      return {
        error: "Unable to book event"
      };
    } else {
      return {
        message: "Event booked successfully"
      };
    }
  }
}
