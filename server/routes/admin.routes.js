const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllPublishAnnounces,
        getAllDraftAnnounces,
        addAnnounce,
        getDraftAnnounceById,
        updateDraftAnnounceById,
        resetUserPort} = require('../controller/admin.controller');

// // GET all Publish announces
// // Page: Home Page
// // GET /api/admin/allpublish
router.route('/allpublish').get(getAllPublishAnnounces);

// // GET all Draft announces
// // Page: Admin control Page
router.route('/alldraft').get(verifyToken, getAllDraftAnnounces);

// // Add a new announce
// // Page: Admin control Page
// // POST /api/admin/add
router.route('/add').post(verifyToken, addAnnounce);

// // get draft announce by id
// // Page: Admin control Page
// // GET /api/admin/draft/:id
router.route('/draft/:id').get(verifyToken, getDraftAnnounceById);
 
// // update draft announce by id
// // Page: Admin control Page
// // PUT /api/admin/update
router.route('/update').put(verifyToken, updateDraftAnnounceById);

// // reset user port
// // Page: Admin control Page
// // GET /api/admin/reset
router.route('/reset').get(verifyToken, resetUserPort);

module.exports = router;