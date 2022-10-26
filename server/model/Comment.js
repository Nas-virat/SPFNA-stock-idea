const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        default: Date.now
    },
    commentUser: { 
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;