const express = require('express');
const router = express.Router();



const   {
    getAllUsers,
    loginUser,
    logoutUser,
    registerUser,
    getUserById
} = require('../controller/user.controller');

// // GET all users 
// // Page: LeaderBoard Page
// // GET /api/users
router.get('/',getAllUsers);

// // login users
// // Page: Login Page
// // POST /api/user/login
router.post('/login',loginUser);

// // logout users
// // Page: logout Page
// // GET : /api/user/logout
router.get('/logout',logoutUser);
// // Post a new user
// // Page: Signup Page
// // POST /api/users/register
router.post('/register',registerUser);

// // GET user by id
// // Page: otherport Page
// // GET /api/users/:id
router.get('/:id',getUserById);



module.exports = router;
