const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllPublishAnnounces,
        getAllDraftAnnounces,
        addAnnounce,
        updateStatus,
        getDraftAnnounceById,
        deleteDraftAnnounceById} = require('../controller/admin.controller');

// // GET all Publish announces
// // Page: Home Page
router.route('/publish').get(getAllPublishAnnounces);

// // GET all Draft announces
// // Page: Admin control Page
router.route('/draft').get(verifyToken, getAllDraftAnnounces);

// // Add a new announce
// // Page: Admin control Page
router.route('/add').post(verifyToken, addAnnounce);

// // update status announce
// // Page: Admin control Page
router.route('/updatestatus').post(verifyToken, updateStatus);

// // get draft announce by id
// // Page: Admin control Page
router.route('/draft/:id').get(verifyToken, getDraftAnnounceById);

// // Delete an announce
// // Page: Admin control Page
router.delete('/delete/:id', verifyToken, deleteDraftAnnounceById);

module.exports = router;