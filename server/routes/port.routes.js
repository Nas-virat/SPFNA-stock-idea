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
router.route('/price').post(verifyToken, getPrice);

// // Get all stocks by login user
// // Page: Portfolio
// // GET /api/port/me
router.route('/me').get(verifyToken, getPort);

// // Get cash balance
// // Page: myPortfolio
// // GET /api/port/cash
router.route('/cash').get(verifyToken, getCashBalance);

// // Get all stocks by user id
// // Page: otherport
// // GET /api/port/:userId
router.route('/:id').get(verifyToken, getPortByUserId);

// // Buy stock
// // Page: myPortfolio
// // POST /api/port/buy
router.route('/buy').post(verifyToken, buyStock);

// // Sell stock
// // Page: myPortfolio
// // DELTE /api/port/sell
router.route('/sell').post(verifyToken, sellStock);

// // Update currency
// // Page: ConvertCurrency
// // PUT /api/port/updatecurrency
router.route('/updatecurrency').post(verifyToken, updateCurrency);

// // Get rate
// // Page: ConvertCurrency
// // GET /api/port/rate
router.route('/rate').post(verifyToken, getRate);


module.exports = router;