const CC = require("currency-converter-lt");



const currencyconvert = async (from, to, amount) => {

  let currencyConverter = new CC(
    {
      from: from,
      to: to,
      amount: amount
    }
  );
  
 const result = await currencyConverter.convert();
  return result;
}

module.exports = currencyconvert;