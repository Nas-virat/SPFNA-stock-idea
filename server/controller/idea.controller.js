const Idea = require("../model/Idea");
const User = require("../model/User");
const ErrorHandler = require("../utils/errorHandler");


// // GET all ideas
// // Page: Allideas Page
const getAllIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find({ status: "publish" }).sort({ date: -1 });
        for(let i = 0; i < ideas.length; i++) {
            const user = await User.findOne({ _id: ideas[i].user });
            ideas[i].user = user;
        }
        res.status(200).json({
            success: true,
            count: ideas.length,
            ideas: ideas,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// // GET a single idea
// // Page: Viewpost Page
const getSingleIdea = async (req, res) => {
    try {
        
        console.log(req.params.id);
        const idea = await Idea.findById(req.params.id);
        const user = await User.findOne({ _id: idea.user });
        idea.user = user;
        for(let i = 0; i < idea.comment.length; i++) {
            const commentuser = await User.findOne({ _id: idea.comment[i].commentUser });
            idea.comment[i].commentUser = commentuser;
        }
        console.log(idea);
        res.status(200).json({
            success: true,
            idea: idea,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// // GET all ideas by user id
// // Page: Profile Page
const getIdeasByUserId = async (req, res) => {
    try {
        const ideas = await Idea.find({ user: req.params.id });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // Add a new idea
// // Page: Writeidea Page
const addIdea = async (req, res, next) => {
    const { title, details, status} = req.body;
    console.log(title, details);
    const user = await User.findById(req.user._id);
    const idea = await Idea.findOne({ title });
    if (idea && idea.title === title) {
        res.json({success:false,message: "Title already exists"});
        return next(new ErrorHandler("Title already exists", 401));
    }
    else if(title.length < 6 && status == 'publish'){
        res.json({sucecess:false,message:"Title must be at least 6 characters"});
        return next(new ErrorHandler("Title must be at least 6 characters",401));
    }
    else if(details.length < 6 && status == 'publish'){
        res.json({sucecess:false,message:"Details must be at least 6 characters"});
        return next(new ErrorHandler("Details must be at least 6 characters",401));
    }
    const newIdea = await Idea.create({
        title,
        details,
        status,
        user: user._id
    });
    res.json({ success: true, message: "Idea created successfully" });
}

// // Add a new comment to the idea
// // Page: AllIdea Page
const addComment = async (req, res) => {
    const { commentBody, ideaId } = req.body;
    const idea = await Idea.findById(ideaId);
    const user = await User.findById(req.user._id);
    const newComment = { commentBody, commentUser: user._id, commentDate: Date.now() };
    idea.comment.push(newComment);
    await idea.save();
    res.json({ success: true, message: "Comment added successfully" });
}

module.exports = {
    getAllIdeas,
    getSingleIdea,
    getIdeasByUserId,
    addIdea,
    addComment
}
