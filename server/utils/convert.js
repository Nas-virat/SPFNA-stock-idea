const CC = require("currency-converter-lt");

const currencyconvert = async (from, to, amount) => {
  const rate = await CC.getRate(from, to);
  return rate * amount;
}

module.exports = currencyconvert;