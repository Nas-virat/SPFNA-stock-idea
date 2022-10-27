const mongoose = require("mongoose");


const AnnounceSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now
    }
});

const Announce = mongoose.model("Announce", AnnounceSchema);

module.exports = Announce;

