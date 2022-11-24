const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllPublishAnnounces,
        getAllDraftAnnounces,
        addAnnounce,
        getDraftAnnounceById,
        updateDraftAnnounceById} = require('../controller/admin.controller');

// // GET all Publish announces
// // Page: Home Page
router.route('/allpublish').get(getAllPublishAnnounces);

// // GET all Draft announces
// // Page: Admin control Page
router.route('/alldraft').get(verifyToken, getAllDraftAnnounces);

// // Add a new announce
// // Page: Admin control Page
router.route('/add').post(verifyToken, addAnnounce);

// // get draft announce by id
// // Page: Admin control Page
router.route('/draft/:id').get(verifyToken, getDraftAnnounceById);
 
// // update draft announce by id
// // Page: Admin control Page
router.route('/update').put(verifyToken, updateDraftAnnounceById);

module.exports = router;