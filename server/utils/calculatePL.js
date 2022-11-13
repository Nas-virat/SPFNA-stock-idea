
const stockdata = require('../utils/yahoofinance');

const calculatePL = async (stocks,cash) => {

    const stocklist = [];
    let balance = 0;
    let totalvalue = 0;
    let pl = 0;
    let plpercent = 0;
    let costTotal = 0;

    for (let i = 0; i < stocks.length; i++) {
        symbol = stocks[i].symbol;
        cost_price = stocks[i].cost_price;
        country = stocks[i].country;
        quantity = stocks[i].quantity;
        currency = stocks[i].currency;
        const price = await stockdata(symbol + country);

        const rate = 1;

        balance += price * quantity;
        totalvalue += price * quantity;
        pl += (price - cost_price) * quantity;
        costTotal += cost_price * quantity;
        stocklist.push({ symbol, price, cost_price, quantity, rate });
    }
    cash.forEach( item => {
        balance += item.amount;
    });

    //check is stocklist is empty or not
    if (stocklist.length > 0) {
        plpercent = pl / costTotal * 100;
    }
    else {
        plpercent = 0;
    }
    return { stocklist, balance, totalvalue, pl, plpercent };
}


module.exports = calculatePL;