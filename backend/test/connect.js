const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

/**
 * This function is used to connect to the in-memory MongoDB server
 * for testing purposes ONLY
 **/
async function connect() {

  const mongod = await MongoMemoryServer.create({
    instance: {
      dbName: 'test',
    },
  });

  const MONGO_URI = mongod.getUri();

  mongoose.set('strictQuery', true);

  return mongoose.connect(MONGO_URI, {dbName: 'test', authSource: 'admin'});
}

/**
 * Closes the connection to the in-memory MongoDB server 
 * to avoid memory leaks and side effects
 * @return {Promise} the mongoose promise that resolves to the closing connection
 **/
function close() {
  return mongoose.disconnect();
}

module.exports = {connect, close};
