const mongoose = require("mongoose");

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("DB connected.");
  } catch (err) {
    console.log("DB connection error");
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
