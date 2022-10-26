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
    comment: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;