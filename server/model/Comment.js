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
        type : ObjectId, 
        ref: 'User' 
    }
});