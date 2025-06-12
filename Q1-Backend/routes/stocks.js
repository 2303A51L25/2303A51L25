const express = require('express');
const router = express.Router();
const { getAveragePrice, getCorrelation } = require('../services/fetchPrices');

router.get('/stocks/:ticker', getAveragePrice);
router.get('/correlation', getCorrelation);

module.exports = router;
