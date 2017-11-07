const { flags, connectionDBString } = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (flags.debug) {
  mongoose.set('debug', true);
}

let db = null;

const connect = () => {
  if (db === null) {
    db = mongoose.connect(connectionDBString, {
      useMongoClient: true
    });
  } else {
    throw new Error('DB instance already exists, use existing connection or close it before creating a new one.');
  }
};

const getConnection = () => {
  if (db) {
    return db;
  }
  throw new Error("DB connection doesn't exist yet.");
};

const close = () => {
  if (db) {
    db.close(() => {
      console.log('Mongoose disconnected on app');
    });
  } else {
    throw new Error("DB connection doesn't exist yet.");
  }
};

module.exports = {
  connect,
  getConnection,
  close
};

