import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Access .env file
dotenv.config();
// Create HTTP Server
const app = express();

// Connect to Database and Start Listening
try {
  await mongoose.connect(process.env.MONGO_URI!);
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
} catch (error) {
  console.log(error);
  process.exit(0);
}
