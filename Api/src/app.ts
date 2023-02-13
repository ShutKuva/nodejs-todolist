import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import taskRouter from './taskRouter';

const app = express();

const port = 8080;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  try {
    next();
  } catch (e) {
    res.status(400).json(e);
  }
});

app.use('/task', taskRouter);

app.listen(port);
