import express, { NextFunction, Request, Response, json } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import user_router from './routers/user.router';
import auth_router from './routers/auth.router';
import { my_route } from './routers/event.route';
import { book_route } from './routers/booking.route';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { welcomeUser } from './services/welcomeUser';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(fileUpload({ 
  createParentPath: true, // Create parent directories if they don't exist
  limits: { fileSize: 50 * 1024 * 1024 } // Limit file size to 50MB
}));

// Add logging middleware to capture request details
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Add routers
app.use('/users', user_router);
app.use('/auth', auth_router);
app.use('/events', my_route); // Ensure these routes are protected if needed
app.use('/books', book_route); // Ensure these routes are protected if needed

// Handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const run = async () => {
  cron.schedule('*/5 * * * * *', async () => {
    console.log('checking the database');
    await welcomeUser();
  });
};

run();

const PORT = 5400;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
