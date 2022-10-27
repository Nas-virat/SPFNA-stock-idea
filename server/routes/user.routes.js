const express = require('express');
const router = express.Router();



const { getAllUsers,
        registerUser,
        getUserById } = require('../controller/user.controller');

// // GET all users 
// // Page: LeaderBoard Page
// // GET /api/users
router.get('/',getAllUsers);

// // Post a new user
// // Page: Signup Page
// // POST /api/users/register
router.post('/register',registerUser);

// // GET user by id
// // Page: otherport Page
// // GET /api/users/:id
router.get('/:id',getUserById);



module.exports = router;