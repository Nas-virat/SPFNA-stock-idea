const yahooFinance = require('yahoo-finance2').default;


const stockdata = async (symbol) => {
    try{
        const data = await yahooFinance.quote(symbol);
        const price = data.regularMarketPrice;
        return price;
    } catch (err) {
        console.log("error get price from yahoo finance", err);
        return -1;
    }
    };

module.exports = stockdata;