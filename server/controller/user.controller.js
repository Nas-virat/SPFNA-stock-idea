const User = require("../model/User");
const ErrorHandler = require("../utils/errorHandler");
const sendCookie = require("../utils/sendCookie");

// // GET all users 
// // Page: LeaderBoard Page
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Post a new user
// // Page: Register Page
const registerUser = async (req, res, next) => {

    const { username,image,role,email,password} = req.body;

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (user) {
        if (user.username === username) {
            res.json({success:false,message: "Username already exists"});
            return next(new ErrorHandler("Username already exists", 401));
        }
        res.json({success:false,message:"Email already exists"});
        return next(new ErrorHandler("Email already exists", 401));
    }
    else if(password.length < 6){
      res.json({sucecess:false,message:"password must be at least 6 characters"});
      return next(new ErrorHandler("password must be at least 6 characters",401));
    }
    const newUser = await User.create({
        username,
        image,
        role, 
        email,
        password,
    })
   sendCookie(newUser,201,res);
};
// // Post user by id
// // Page Login Page
const loginUser = async (req,res,next) =>{
  const {userId,password} = req.body;

  const user = await User.findOne({
   $or: [{email : userId},{username : userId}]
  });
    if(!user){
        res.json({success:false,message:"User not found"});
        return next(new ErrorHandler("User not found",401));
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        res.json({success:false,message:"Incorrect password"});
        return next(new ErrorHandler("Incorrect password",401));
    }
    sendCookie(user,201,res);
}
// // Logout user
// // logout page
const logoutUser = async (req,res,next) =>{
  res.cookie('token',null,{
    expires : new Date(Date.now()),
    httpOnly : true, 
  });
  res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}
// // Get user by id
// // Page: myport Page
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    loginUser,
    logoutUser,
    registerUser,
    getUserById
}

