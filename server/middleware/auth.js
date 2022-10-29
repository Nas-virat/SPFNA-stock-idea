drequire('dotenv').config();

const jwt = require("jsonwebtoken");
const User = require("../model/User");
const ErrorHandler = require("../utils/errorHandler");

const verifyToken = async (req, res, next) => {


  const token = req.cookies.token;
  
  //console.log("token: " + token);
  if (!token) {
    return next(new ErrorHandler("Please Login to Access", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
