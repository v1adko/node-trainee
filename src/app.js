import express from 'express';

import db from './db';
import applyMiddleware from './middlewares';
import v1routes from './v1/routes';

const app = express();

db.connect();

applyMiddleware(app);

app.use('/v1', v1routes);

export default app;
