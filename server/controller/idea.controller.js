const Idea = require("../model/Idea");
const User = require("../model/User");
const Comment = require("../model/Comment");


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
const addIdea = async (req, res) => {
    const { title, details, status } = req.body;
    const user = await User.findById(req.user.id);
    const newIdea = await Idea.create({
        title,
        details,
        status,
        user: user._id
    });
    user.idea.push(newIdea._id);
    await user.save();
    res.json({ success: true, message: "Idea created successfully" });
}


// // Add a new comment to the idea
// // Page: AllIdea Page
const addComment = async (req, res) => {
    const { comment, user, idea } = req.body;
    try {
        const newComment = await Comment.create({
            comment,
            user,
            idea
        });
        const idea = await Idea.findById(idea);
        idea.comment.push(newComment);
        await idea.save();
        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}