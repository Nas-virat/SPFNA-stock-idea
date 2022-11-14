const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllIdeas,
       getSingleIdea,
       getIdeasByUserId,
       addIdea,
       addComment,
       publishDraft} = require('../controller/idea.controller');

// // GET all ideas
// // Page: Allideas Page
router.route('/all').get(verifyToken, getAllIdeas);

// // GET a single idea
// // Page: Viewpost Page
router.route('/post/:id').get(verifyToken, getSingleIdea);

// // GET all ideas by user id
// // Page: Profile Page
router.route('/userpost').get(verifyToken, getIdeasByUserId);

// // Add a new idea
// // Page: Writeidea Page
router.route('/add').post(verifyToken, addIdea);

// // Add a new comment to the idea
// // Page: AllIdea Page
router.route('/addcomment').post(verifyToken, addComment);

// // publish an draft idea
// // Page: Profile Page
router.route('/publishDraft').post(verifyToken, publishDraft);

module.exports = router;
