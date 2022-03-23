/////////////////////////////
// work in progress
/////////////////////////////

// const mongoose = require("mongoose");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// let mongod = new MongoMemoryServer();

// //////////////////////////////////////
// // Connect to the in-memory database.
// //////////////////////////////////////

// module.exports.connect = async () => {
//   const uri = mongod.getUri();
//   //   mongod = await MongoMemoryServer.create();

//   const mongooseOpts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 10,
//     // autoReconnect: true,
//     // reconnectTries: Number.MAX_VALUE,
//     // reconnectInterval: 1000,
//   };

//   await mongoose.connect(uri, mongooseOpts);
// };

// //////////////////////////////////////
// // Drop database, close the connection and stop mongod.
// //////////////////////////////////////

// module.exports.closeDatabase = async () => {
//   if (mongod) {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongod.stop();
//   }
// };

// //////////////////////////////////////
// // Remove all the data for all db collections.
// //////////////////////////////////////

// module.exports.clearDatabase = async () => {
//   if (mongod) {
//     const collections = mongoose.connection.collections;

//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany();
//     }
//   }
// };
