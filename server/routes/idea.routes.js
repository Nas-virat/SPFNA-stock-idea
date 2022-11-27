const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllIdeas,
       getSingleIdea,
       getIdeasByUserId,
       addIdea,
       addComment,
       publishDraft,
       updateIdea} = require('../controller/idea.controller');

// // GET all ideas
// // Page: Allideas Page
// // GET /api/idea/all
router.route('/all').get(verifyToken, getAllIdeas);

// // GET a single idea
// // Page: Viewpost Page
// // GET /api//idea/post/:id
router.route('/post/:id').get(verifyToken, getSingleIdea);

// // GET all ideas by user id
// // Page: Profile Page
// // GET /api/idea/userpost
router.route('/userpost').get(verifyToken, getIdeasByUserId);

// // Add a new idea
// // Page: Writeidea Page
// // POST /api/idea/add
router.route('/add').post(verifyToken, addIdea);

// // Add a new comment to the idea
// // Page: AllIdea Page
// // POST /api/idea/addcomment
router.route('/addcomment').post(verifyToken, addComment);

// // publish an draft idea
// // Page: Profile Page
// // PUT /api/idea/publishDraft
router.route('/publishDraft').post(verifyToken, publishDraft);

// // Update an idea
// // Page: Writeidea Page
// // PUT /api/idea/update
router.route('/update').put(verifyToken, updateIdea);

module.exports = router;
