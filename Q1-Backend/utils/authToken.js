const axios = require('axios');
require('dotenv').config();

let cachedToken = null;

exports.getAuthToken = async () => {
  if (cachedToken) return cachedToken;
  const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
    email: process.env.EMAIL,
    name: process.env.NAME,
    rollNo: process.env.ROLL_NO,
    accessCode: process.env.ACCESS_CODE,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  cachedToken = res.data.access_token;
  return cachedToken;
};
