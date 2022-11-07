const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Title already exists"]
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    comment: [{
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;