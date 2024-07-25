import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken"; // Import your middleware
import { addNewBook, fetchAllCreatedBookings, fetchTourByID, removeEvent } from "../controllers/booking.controller";

export let book_route = Router();

// Apply the verifyToken middleware to routes that need protection
book_route.post('/new-book', verifyToken, addNewBook);
book_route.get('/all-bookings', verifyToken, fetchAllCreatedBookings);
book_route.delete('/delete-event/:id', verifyToken, removeEvent);
book_route.get('/one-event/:id', verifyToken, fetchTourByID);
