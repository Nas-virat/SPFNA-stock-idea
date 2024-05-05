const User = require("../model/User");
const ErrorHandler = require("../utils/errorHandler");
const sendCookie = require("../utils/sendCookie");
const stockdata = require('../utils/yahoofinance');
const currencyconvert = require('../utils/convert');

// // GET all users 
// // Page: LeaderBoard Page
const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find();

        let listuser = []

        for (let i = 0; i < users.length; i++) {
            if(users[i].port.stock.length == 0)
                continue;
            _user = users[i].toObject();
            listuser.push(_user);
        }

        for (let user of listuser) {
            let balance = 0;
            let rate = 1;
            
            for (let stock of user.port.stock) {
                let price = await stockdata(stock.symbol + stock.country);
                stock.price = price;
                if (stock.country !== '') {
                    stock.rate = await currencyconvert(stock.currency, 'USD', 1);
                }
                else{
                    stock.rate = 1;
                }
                balance += (price) * stock.quantity * stock.rate;
            }

            /*user.port.cash.forEach( item => {
                if (item.currency !== 'USD') {
                    balance += item.amount;
                }
                else{
                    balance += item.amount;
                }
            });*/
            for(let item of user.port.cash){
                if(item.currency !== 'USD'){
                    rate = await currencyconvert(item.currency, 'USD', 1);
                }
                else{
                    rate = 1;
                }
                balance += item.amount*rate;
            }

            user.balance = balance;

            listuser.sort((a, b) => {
                return b.balance - a.balance;
            })
        }

        res.status(200).json({
            success: true,
            users: listuser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // GET Current logged in user
// // Global 
const getUser = async (req,res) => {
    try {
        if (req.user == undefined || req.user == null) {
            res.json({ success: false, message: "User not found" });
        }
        const user = await User.findById(req.user._id);
        if (user == null) {
            return res.status(404).json({message: "No user found"});
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({message: error.message});
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
   
    newUser.port.cash.push({
        currency: "USD",
        amount: 200000,
    });
    await newUser.save();


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
    getLeaderboard,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    getUserById
}

