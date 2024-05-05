const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getAllIdeas,
       getSingleIdea,
       getIdeasByUserId,
       addIdea,
       addComment,
       updateIdea} = require('../controller/idea.controller');

// // GET all ideas
// // Page: Allideas Page
// // GET /api/idea/all
router.route('/all').get(getAllIdeas);

// // GET a single idea
// // Page: Viewpost Page
// // GET /api//idea/post/:id
router.route('/post/:id').get(getSingleIdea);

// // GET all ideas by user id
// // Page: Profile Page
// // GET /api/idea/userpost
router.route('/userpost').get(getIdeasByUserId);

// // Add a new idea
// // Page: Writeidea Page
// // POST /api/idea/add
router.route('/add').post(addIdea);

// // Add a new comment to the idea
// // Page: AllIdea Page
// // POST /api/idea/addcomment
router.route('/addcomment').post(addComment);

// // Update an idea
// // Page: Writeidea Page , Profile Page
// // PUT /api/idea/update
router.route('/update').put(updateIdea);

module.exports = router;
