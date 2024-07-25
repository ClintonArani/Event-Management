import { Request, Response, request, response } from "express";
import { BookService } from "../services/booking.service";
import { Booking } from "../interfaces/booking.interface";



const eventSetter = new BookService();

export const addNewBook = async (req: Request, res: Response) => {
  try {
    const { UserId, EventId, Type, NumberOfPeople } = req.body;
    
    console.log("Received booking data:", req.body);

    // Map the request body to the Booking interface (excluding properties managed by the server)
    const booking: Partial<Booking> = {
      userId: UserId,
      eventId: EventId,
      type: Type,
      numberOfPeople: NumberOfPeople
    };

    const result = await eventSetter.createBook(booking);

    console.log("Booking result:", result);

    return res.json(result);
  } catch (error) {
    console.error("Error in addNewBook controller:", error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export let fetchAllCreatedBookings = async (req: Request, res: Response) => {
  try {
    let allEvents = await eventSetter.getAllBook();

    return res.status(201).json(
      allEvents
    )
  } catch (error) {
    return res.json({
      error: error
    })
  }
} 



export const removeEvent = async(req: Request, res: Response) => {
  
  try {

    let id = req.params.id

    let response = await eventSetter.deleteBook(id);

    return res.json(response);
    
  } catch (error) {
    return res.json({
      error: error
    })
  }

}

export const fetchTourByID = async (req: Request, res: Response) => {
  
  try {
    let id = req.params.id;

    let result = await eventSetter.getBookByID(id);

    return res.json(result)
  } catch (error) {
    return res.json({
      error: error
    })
  }

}
