const User = require("../model/User");
const Stock = require('../models/Stock');
const currencyconvert = require("../utils/convert");
const stockdata = require('../utils/yahoofinance');


// // GET all stocks by user id
// // Page: Myport Page
const getStocksByUserId = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const stocks = user.port.stock;
        for(let i = 0; i < stocks.length; i++){
           symbol = stocks[i].symbol;
           country = stocks[i].country;
           const data = await stockdata(symbol+country);
           stocks[i].price = data.price;
        }
        console.log(user);
        res.json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

// // Add a new stock to the user's portfolio
// // Page: Myport Page
const addStock = async (req, res) => {
    const { symbol,cost_price,country, quantity } = req.body;
    const user = await User.findById(req.user.id);
    //if the stock is not in the user's portfolio
    if(!user.port.stock.some(stock => stock.symbol === symbol)){
        const newStock = new Stock({
            symbol,
            cost_price,
            country,
            quantity
        });
        user.port.stock.push(newStock);
        await user.save();
        res.json({ success: true, message: "Stock added successfully" });
    }
    //if the stock is already in the user's portfolio
    else{
        //add the quantity to the existing stock
        user.port.stock.forEach(stock => {
            if(stock.symbol === symbol){
                stock.quantity += quantity;
            }
        });
    }
}

// // update a stock position of the user's portfolio
// // Page: Myport Page
const updateStock = async (req, res) => {

    try{
        user.port.stock.forEach(stock => {
            if(stock.symbol === symbol){
                stock.quantity -= quantity;
            }
        });
        await user.save();
        res.json({ success: true, message: "Stock update successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


// // get cash balance of the user
// // Page: convert currency Page
const getCashBalance = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const cash = user.port.cash;
        res.json({cash});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

// // convert currency
// // Page: convert currency Page
const updateCurrency = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const cash = user.port.cash;
        const {from,to,amount} = req.body;
        const convertamount = await currencyconvert(from,to,amount);
        //if the from currency is not in the user's portfolio
        if(!user.port.cash.some(currency => currency.currency === from)){
            res.status(500).json({ message: "You don't have this currency" });
        }
        //if the to currency isn't already in the user's portfolio
        else if(!user.port.cash.some(currency => currency.currency === to)){
            user.port.cash.push({currency:to,amount:convertamount});
        }
        //if the currency is already in the user's portfolio
        else{
            //add the quantity to the existing stock
            user.port.cash.forEach(currency => {
                if(currency.currency === to){
                    currency.amount += convertamount;
                }
            });
        }
        await user.save();
        res.json({ success: true, message: "Currency converted successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

// // get rate of a currency
// // Page: convert currency Page
const getRate = async (req, res) => {
    try{
        const {from,to} = req.body;
        const rate = await currencyconvert(from,to,1);
        res.json({rate});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getStocksByUserId,
    addStock,
    updateStock,
    getCashBalance,
    updateCurrency,
    getRate
}

