import axios from 'axios';

const EXCHANGE_API_HOST = 'https://openexchangerates.org/api';

// eslint-disable-next-line import/prefer-default-export
export const getCurrencyList = () => axios.get(`${EXCHANGE_API_HOST}/currencies.json`);
