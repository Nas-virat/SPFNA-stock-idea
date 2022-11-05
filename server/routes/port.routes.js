const express = require('express');
const router = express();

const verifyToken = require('../middleware/auth');

const {getPort,
       getPortByUserId,
       buyStock,
       sellStock,
       getCashBalance,
       updateCurrency,
       getRate} = require('../controller/port.controller');

// // Get all stocks by login user
// // Page: Portfolio
// // GET /api/port/me
router.get('/me',verifyToken, getPort);

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

// // Get cash balance
// // Page: myPortfolio
// // GET /api/port/cash
router.route('/cash').get(verifyToken, getCashBalance);

// // Update currency
// // Page: ConvertCurrency
// // PUT /api/port/currency
router.route('/updatecurrency').post(verifyToken, updateCurrency);

// // Get rate
// // Page: ConvertCurrency
// // GET /api/port/rate
router.route('/rate').get(verifyToken, getRate);


module.exports = router;