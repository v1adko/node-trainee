import mongoose from 'mongoose';
import { flags, connectionDBString } from './config';
import logger from './utils/logger';

mongoose.Promise = global.Promise;
if (flags.debug) {
  mongoose.set('debug', true);
}

let db = null;

mongoose.connection.on('error', (err) => {
  logger.error(`Database connection error:\n${err}`);
  process.exit(1);
});

const setConnect = () => {
  const connect = mongoose.connect(
    connectionDBString,
    { useMongoClient: true },
    (error) => {
      if (error) {
        logger.error(`Database connection can not be created:\n${error}`);
      }
    }
  );
  return connect;
};

class MongoConnetor {
  connect = async () => {
    if (db === null) {
      db = setConnect();

      logger.info('Database connection was created');

      const self = this;
      db.connection.on('error', (errorConnection) => {
        logger.error(`Database connection error:\n${errorConnection}`);
        self.tryReopen();
      });
    } else {
      throw new Error(
        'DB instance already exists, use existing connection or close it before creating a new one.'
      );
    }
    return db;
  };

  tryReopen = () => {
    logger.error('Trying reopen database connection');
    try {
      this.close();
      this.connect();
    } catch (error) {
      logger.error(
        `Cannot reopen connect, app will close with error status:\n${error}`
      );
      process.exit(1);
    }
  };

  getConnection = () => {
    if (db) {
      return db;
    }
    throw new Error("DB connection doesn't exist yet.");
  };

  close = () => {
    if (db) {
      db.close(() => {
        logger.info('Mongoose disconnected on app');
      });
    } else {
      throw new Error("DB connection doesn't exist yet.");
    }
  };
}

export default new MongoConnetor();
