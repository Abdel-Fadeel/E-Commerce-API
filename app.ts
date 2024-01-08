import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
// ROUTERS
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
// Middlewares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
// Access .env file
dotenv.config();
// Create HTTP Server
const app = express();
// Morgan Middleware for Development
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));
// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookiesParser(process.env.JWT_SECRET));
// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// NOT FOUND Handler
app.use(notFoundMiddleware);
// Global Error Handler
app.use(errorHandlerMiddleware);
// Connect to Database and Start Listening
try {
  await mongoose.connect(process.env.MONGO_URI!);
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
} catch (err) {
  console.log(err);
  process.exit(0);
}
