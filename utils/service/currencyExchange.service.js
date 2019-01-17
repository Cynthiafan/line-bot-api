require('dotenv').config();
import axios from '../axios';

const baseURL = 'https://www.alphavantage.co/query';
const apikey = process.env.CURRENCY_API_KEY;

export function getCurrencyExchange(from, to) {

  return axios
    .get(`${baseURL}`, {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: from,
        to_currency: to,
        apikey,
      }
    })
    .then(res => res.data['Realtime Currency Exchange Rate'])
    .catch(err => errorResponse(err));
}
