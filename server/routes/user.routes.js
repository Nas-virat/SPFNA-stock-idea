const express = require('express');
const router = express.Router();



const { getAllUsers,
        registerUser,
        getUserById } = require('../controller/user.controller');

// // GET all users 
// // Page: LeaderBoard Page
router.get('/user',getAllUsers);

// // Post a new user
// // Page: Signup Page
router.post('/register',registerUser);

// // GET user by id
// // Page: otherport Page
router.get('/user/:id',getUserById);



module.exports = router;