import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import env from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: env.nodeEnv });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

