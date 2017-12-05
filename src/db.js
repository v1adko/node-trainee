import mongoose from 'mongoose';
import { flags, connectionDBString } from './config';
import logger from './lib/logger';

mongoose.Promise = global.Promise;
if (flags.debug) {
  mongoose.set('debug', true);
}

let db = null;

const setConnect = () => {
  const connect = mongoose.connect(
    connectionDBString,
    { useMongoClient: true },
    (error) => {
      if (error) {
        logger.info(`Database connection can not be created:\n${error}`);
      }
      return error;
    }
  );
  return () => connect;
};

class MongoConnector {
  connect = () => {
    if (db === null) {
      const connector = setConnect();
      db = connector();

      logger.info('Database connection was created');

      const self = this;
      db.connection.on('error', (errorConnection) => {
        logger.info(`Database connection error:\n${errorConnection}`);
        self.tryReopen();
      });
    } else {
      logger.info(
        'Connection already exists, use "getConnection" for get existing connection or do close it before creating a new one.'
      );
    }
    return db;
  };

  tryReopen = () => {
    logger.info('Trying reopen database connection');

    try {
      this.closeConnection();
      this.connect();
    } catch (error) {
      logger.info(
        `Cannot reopen connect, app will close with error status:\n${error}`
      );
      process.exit(1);
    }
    return db;
  };

  getConnection = () => {
    if (db) {
      return db;
    }
    throw Error("DB connection doesn't exist yet.");
  };

  closeConnection = () => {
    if (db) {
      db.disconnect(() => {
        logger.info('Mongoose disconnected on app');
      });
      db = null;
    } else {
      throw Error("DB connection doesn't exist yet.");
    }
  };
}

export default new MongoConnector();
