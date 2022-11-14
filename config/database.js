// getting-started.js
const mongoose = require("mongoose"); // commonJS module
// import mongoose  from 'mongoose'; // ES module


exports.connect = () => {
  mongoose
    .connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("db connected successfully"))
    .catch((err) => {
      console.log("db connection failed", err);
      process.exit(1)
    });
};

// module.exports = mongoose;