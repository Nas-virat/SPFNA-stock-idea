
const stockdata = require('../utils/yahoofinance');

const currencyconvert = require('../utils/convert');

const calculatePL = async (stocks,cash) => {

    const stocklist = [];
    let balance = 0;
    let totalvalue = 0;
    let pl = 0;
    let plpercent = 0;
    let costTotal = 0;
    let rate = 1;

    for (let i = 0; i < stocks.length; i++) {
        symbol = stocks[i].symbol;
        cost_price = stocks[i].cost_price;
        country = stocks[i].country;
        quantity = stocks[i].quantity;
        currency = stocks[i].currency;
        const price = await stockdata(symbol + country);

        if(country !== ''){
            rate = await currencyconvert(currency, 'USD', 1);
        }
        else{
            rate = 1;
        }

        balance += price * quantity*rate;
        totalvalue += price * quantity*rate;
        pl += (price - cost_price) * quantity*rate;
        costTotal += cost_price * quantity*rate;

        stocklist.push({ symbol,country, price, cost_price, quantity, rate });
    }

    for(let item of cash){
        if(item.currency !== 'USD'){
            rate = await currencyconvert(item.currency, 'USD', 1);
        }
        else{
            rate = 1;
        }
        balance += item.amount*rate;
    }

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