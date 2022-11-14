// import .env file asap
require("dotenv").config();
//connect with db
require("./config/database").connect();

// importing node inbuilt packages/libraries
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// importing custom modules
const User = require("./model/user");
const auth = require("./middleware/auth");

// MIDDLWARE
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // The middleware will parse the Cookie header on the request and expose the cookie data as the property req.cookies

// routing for homepage
app.get("/", (req, res) => {
  res.status(200).send("welcome on homepage2");
  // res.write("Hello");
  // next();
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("user already exists. please login");
    }

    // 4. encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // console.log(encryptedPassword);

    // 5. save user's to db and send a token to client
    // saving to db - method 1
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    // saving to db - method 2
    //  const user = new User({name, email, password})
    //  await user.save();
    // console.log(user);

    // creating a token using jwt
    let token = jwt.sign({ id: user._id, email }, `${process.env.SECRET}`, {
      expiresIn: "2h",
    });
    // console.log(token);
    user.token = token;
    //don't want to send the password
    user.password = undefined;

    // send final response to client
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});



app.listen(`${process.env.PORT}`, ()=>{console.log("listening at port");})

console.log(typeof app);
// module.exports =  app ;
