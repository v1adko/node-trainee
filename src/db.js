import mongoose from 'mongoose';
import { flags, connectionDBString } from './config';

mongoose.Promise = global.Promise;
if (flags.debug) {
  mongoose.set('debug', true);
}

let db = null;

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error:\n${err}`);
  process.exit(1);
});

const setConnect = () => {
  const connect = mongoose.connect(
    connectionDBString,
    { useMongoClient: true },
    (error) => {
      if (error) {
        console.error(`Database connection can not be created:\n${error}`);
      }
    }
  );
  return connect;
};

class MongoConnetor {
  connect = async () => {
    if (db === null) {
      db = setConnect();

      console.log('Database connection was created');

      const self = this;
      db.connection.on('error', (errorConnection) => {
        console.error(`Database connection error:\n${errorConnection}`);
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
    console.error('Trying reopen database connection');
    try {
      this.close();
      this.connect();
    } catch (error) {
      console.error(
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
        console.log('Mongoose disconnected on app');
      });
    } else {
      throw new Error("DB connection doesn't exist yet.");
    }
  };
}

export default new MongoConnetor();
