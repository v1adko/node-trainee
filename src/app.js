import express from 'express';
import applyMiddleware from './middlewares';
import db from './db';

const app = express();

db.connect();

applyMiddleware(app);

export default app;
