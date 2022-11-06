const Idea = require("../model/Idea");
const User = require("../model/User");
const Comment = require("../model/Comment");
const ErrorHandler = require("../utils/errorHandler");


// // GET all ideas
// // Page: Allideas Page
const getAllIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
    console.log(title, details, status);
    const user = await User.findById(req.user._id);
    const idea = await Idea.findOne({ title });
    if (idea && idea.title === title) {
        res.json({success:false,message: "Title already exists"});
        return next(new ErrorHandler("Title already exists", 401));
    }
    else if(title.length < 6){
        res.json({sucecess:false,message:"Title must be at least 6 characters"});
        return next(new ErrorHandler("Title must be at least 6 characters",401));
    }
    else if(details.length < 6){
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
    const { comment, user, idea_id } = req.body;
    try {
        const newComment = await Comment.create({
            comment,
            user,
            idea
        });
        const idea = await Idea.findById(idea_id);
        idea.comment.push(newComment);
        await idea.save();
        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllIdeas,
    getIdeasByUserId,
    addIdea,
    addComment
}
