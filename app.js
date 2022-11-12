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

// routing for registration
app.post("/registration", async (req, res) => {
    try {
      // 1. get all data from req.body
      const { name, email, password } = req.body;
  
      // 2. validate
      if (!(email || password)) {
        res.status(400).send("enter email and/or password");
      }
  
      // 3. check if user exists in db
      const existingUser = await User.findOne({ email: email });
      console.log(existingUser);
      if (existingUser) {
        res.status(400).send("user already exists. please login");
        return;
      }
  
      // 4. encrypt the password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // 5. save to db and send a token
      // saving to db
      const user = await User.create({
        name,
        email,
        password: encryptedPassword,
      });
  
      // creating a token using jwt
      let token = jwt.sign({ id: user._id }, `${process.env.SECRET}`);
      // console.log(token);
      res.send("success");
    } catch (err) {
      console.log(err);
    }
  });
// create server
app.listen(4000, () => {
  console.log("listening on port");
});
