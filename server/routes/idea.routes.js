const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllIdeas,
       getIdeasByUserId,
       addIdea,
       draftIdea,
       addComment} = require('../controller/idea.controller');

// // GET all ideas
// // Page: Allideas Page
router.route('/all').get(verifyToken, getAllIdeas);

// // GET all ideas by user id
// // Page: Profile Page
router.route('/:id').get(verifyToken, getIdeasByUserId);

// // Add a new idea
// // Page: Writeidea Page
router.route('/add').post(verifyToken, addIdea);

// // Add a new comment to the idea
// // Page: AllIdea Page
router.route('/addcomment').post(verifyToken, addComment);

module.exports = router;
