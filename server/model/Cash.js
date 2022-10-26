const mongoose = require("mongoose");

const CashSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Cash = mongoose.model("Cash", CashSchema);

module.exports = Cash;