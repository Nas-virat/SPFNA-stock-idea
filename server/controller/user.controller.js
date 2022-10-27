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

    const { username,image,email,password} = req.body;

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

    const newUser = await User.create({
        username,
        image,
        email,
        password,
    })

    sendCookie(newUser, 201, res);
};


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
    registerUser,
    getUserById
}

