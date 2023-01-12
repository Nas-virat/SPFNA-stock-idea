const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {
    getLeaderboard,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    getUserById
} = require('../controller/user.controller');

// // GET all users 
// // Page: LeaderBoard Page
// // GET /api/users
router.route('/leaderboard').get(getLeaderboard);

// // login users
// // Page: Login Page
// // POST /api/users/login
router.route('/login').post(loginUser);

// // logout users
// // Page: logout Page
// // GET : /api/users/logout
router.route('/logout').get(logoutUser);

// // current user
// // GLOBAL
// // GET: /api/users/user
router.route('/user').get(getUser);

// // Post a new user
// // Page: Signup Page
// // POST /api/users/register
router.route('/register').post(registerUser);

// // GET user by id
// // Page: otherport Page
// // GET /api/users/:id
router.route('/:id').get(getUserById);



module.exports = router;
