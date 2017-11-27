import mongoose from 'mongoose';
import { flags, connectionDBString } from './config';
import logger from './utils/logger';
import { MissConnectionError } from './errors';

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
      logger.info(
        'Connection already exists, use "getConnection" for get existing connection or do close it before creating a new one.'
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
    return db;
  };

  tryReopen = () => {
    console.error('Trying reopen database connection');
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
    throw Error("DB connection doesn't exist yet.");
  };

  closeConnection = () => {
    if (db) {
      db.disconnect(() => {
        logger.info('Mongoose disconnected on app');
      });
    } else {
      throw Error("DB connection doesn't exist yet.");
    }
  };
}

export default new MongoConnetor();
