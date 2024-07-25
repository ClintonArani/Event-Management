import { Router } from 'express';
import multer from 'multer'; // Import multer
import { 
  addNewEvent, 
  assignEvent, 
  fetchAllCreatedEvents, 
  fetchEventByID, 
  getUnAssignedEvents, 
  removeEvent, 
  updateExistingEvent 
} from '../controllers/event.controller';
import { verifyToken } from '../middlewares/verifyToken';

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Define upload destination

export let my_route = Router();

// Apply fileUpload middleware only to the route that handles file uploads
my_route.post('/new-event', verifyToken, upload.single('Image'), addNewEvent); // Handle single file upload
my_route.get('/all-events', verifyToken, fetchAllCreatedEvents);
my_route.get('/unassigned-events', verifyToken, getUnAssignedEvents);
my_route.put('/assign-event/:id', verifyToken, assignEvent);
my_route.put('/update-event/:id', verifyToken, upload.single('Image'), updateExistingEvent); // Handle single file upload
my_route.delete('/delete-event/:id', verifyToken, removeEvent);
my_route.get('/one-event/:id', verifyToken, fetchEventByID);
