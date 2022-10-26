const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    cost_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;