const axios = require('axios');
const { getAuthToken } = require('../utils/authToken');

exports.getAveragePrice = async (req, res) => {
  const { ticker } = req.params;
  const { minutes } = req.query;
  const token = await getAuthToken();

  const url = `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`;
  const resp = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const prices = resp.data.map(p => p.price);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  res.json({ averageStockPrice: avg, priceHistory: resp.data });
};

exports.getCorrelation = async (req, res) => {
  const { minutes, ticker1, ticker2 } = req.query;
  const token = await getAuthToken();

  const [s1, s2] = await Promise.all([
    axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker1}?minutes=${minutes}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker2}?minutes=${minutes}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  const prices1 = s1.data.map(d => d.price);
  const prices2 = s2.data.map(d => d.price);
  const n = Math.min(prices1.length, prices2.length);

  const avg1 = prices1.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const avg2 = prices2.slice(0, n).reduce((a, b) => a + b, 0) / n;

  let numerator = 0, denom1 = 0, denom2 = 0;
  for (let i = 0; i < n; i++) {
    const diff1 = prices1[i] - avg1;
    const diff2 = prices2[i] - avg2;
    numerator += diff1 * diff2;
    denom1 += diff1 ** 2;
    denom2 += diff2 ** 2;
  }

  const correlation = numerator / Math.sqrt(denom1 * denom2);
  res.json({ correlation, stocks: { [ticker1]: prices1, [ticker2]: prices2 } });
};
