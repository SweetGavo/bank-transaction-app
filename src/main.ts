import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// app.ts
import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes/routes';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
