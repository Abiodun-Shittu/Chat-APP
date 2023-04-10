import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { initiate } from './Db/Db';
import userRoute from './Routes/UserRoute';
import { errorHandler } from './Middlewares/ErrorHandle';
import { NotFoundException } from './Exceptions/NotFoundException';

const app: Application = express();
const PORT = Number(process.env.PORT || 6000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initiate();

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Chat API is Running!!!' });
});

// Mount Routes
app.use('/api/users', userRoute);

// Catch-all 404 route
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(
    new NotFoundException(
      `This route ${req.originalUrl} does not exist on this server.`
    )
  );
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
