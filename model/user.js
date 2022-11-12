// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, default: null },
//   email: {
//     type: String,
//     required: [true, "send an email"],
//   },
//   password: {
//     type: String,
//   },
//   token: String,
// });

// module.exports = mongoose.model("user", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
    require: [true, "Please enter first Name"],
  },
  
  email: {
    type: String,
    unique: true,
    require: [true, "Please enter email"],
  },
  password: {
    type: String,
    require: [true, "Please enter password"],
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
