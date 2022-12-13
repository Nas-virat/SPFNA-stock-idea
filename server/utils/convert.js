const yahooFinance = require('yahoo-finance2').default;

const currencyconvert = async (from, to, amount) => {

  if (from === to) {
    return amount;
  }

  try{
    const rate = await yahooFinance.quote(from + to + '=X');
    
    return rate.regularMarketPrice * amount;
  } catch (err) {
    console.log(err);
    return -1;
  }
}



module.exports = currencyconvert;