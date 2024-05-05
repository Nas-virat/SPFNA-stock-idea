const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getPrice,
       getPort,
       getPortByUserId,
       buyStock,
       sellStock,
       getCashBalance,
       updateCurrency,
       getRate} = require('../controller/port.controller');

// // Get stock price
// // Page : Portfolio
// // GET : /api/port/price
router.route('/price').post(getPrice);

// // Get all stocks by login user
// // Page: Portfolio
// // GET /api/port/me
router.route('/me').get(getPort);

// // Get cash balance
// // Page: myPortfolio
// // GET /api/port/cash
router.route('/cash').get(getCashBalance);

// // Get all stocks by user id
// // Page: otherport
// // GET /api/port/:userId
router.route('/:id').get(getPortByUserId);

// // Buy stock
// // Page: myPortfolio
// // POST /api/port/buy
router.route('/buy').post(buyStock);

// // Sell stock
// // Page: myPortfolio
// // DELTE /api/port/sell
router.route('/sell').post(sellStock);

// // Update currency
// // Page: ConvertCurrency
// // PUT /api/port/updatecurrency
router.route('/updatecurrency').post(updateCurrency);

// // Get rate
// // Page: ConvertCurrency
// // GET /api/port/rate
router.route('/rate').post(getRate);


module.exports = router;