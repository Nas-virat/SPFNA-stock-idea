const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllAnnounces,
        addAnnounce,
        updateStatus} = require('../controller/admin.controller');

// // GET all announces
// // Page: Home Page
router.route('/all').get(verifyToken, getAllAnnounces);

// // Add a new announce
// // Page: Admin control Page
router.route('/add').post(verifyToken, addAnnounce);

// // update status announce
// // Page: Admin control Page
router.route('/updatestatus/:id').post(verifyToken, updateStatus);

module.exports = router;