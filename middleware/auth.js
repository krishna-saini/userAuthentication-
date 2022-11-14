const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // console.log("cookies:", req.cookies);
  const {token} = req.cookies || req.header || req.body
    // Authorization: "Bearer longtokenvalue"
    // const token = req.header("Authorization").replace("Bearer ", "")

  //what if token is not there
  if (!token) {
    return res.status(400).send("unauthorized access");
  }
  //verify token
  try {
    // lets decode our token, since we passed id and email while creating token, it will return them 
    const decode = jwt.verify(token, `${process.env.SECRET}`);
    // console.log(decode);

    // add this decoded info to the request object by creating another key to it 
    req.user = decode;
  } catch (err) {
    res.status(403).send(err.message)
  }

  next();
};
module.exports = auth;
