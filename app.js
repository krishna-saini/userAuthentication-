// import .env file asap
require("dotenv").config();
//connect with db
require("./config/database").connect();

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");

// MIDDLWARE
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// for homepage
app.get("/", (req, res) => {
  res.status(200).send("welcome on homepage");
});


// create server
app.listen(4000, () => {
  console.log("listening on port");
});
