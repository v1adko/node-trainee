import express from 'express';
import applyMiddleware from './middlewares';
import runServices from './services';
import db from './db';

const app = express();

db.connect();

applyMiddleware(app);

runServices(app);

export default app;
