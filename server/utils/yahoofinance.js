const yahooFinance = require('yahoo-finance2').default;


const stockdata = async (symbol) => {
    const data = await yahooFinance.quote(symbol);
    return data;
    };

module.exports = stockdata;