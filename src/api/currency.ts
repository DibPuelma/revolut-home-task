import axios from 'axios';

const EXCHANGE_API_HOST = 'https://openexchangerates.org/api';
const API_ID = process.env.REACT_APP_OPEN_EXCHANGE_RATES_ID;

// eslint-disable-next-line import/prefer-default-export
export const getCurrencyList = () => axios.get(`${EXCHANGE_API_HOST}/currencies.json`);

export const getAllRatesForSymbol = (baseCurrency: string) => axios.get(
  `${EXCHANGE_API_HOST}/latest.json?app_id=${API_ID}&base=${baseCurrency}`,
);

export const getPairRate = (baseCurrency: string, secondaryCurrency: string) => axios.get(
  `${EXCHANGE_API_HOST}/latest.json?app_id=${API_ID}&base=${baseCurrency}&symbols=${secondaryCurrency}`,
);

// It is not possible to use the API for other base currencies on the free plan.
// Everything will be calculated based on USD rates
export const getAllRatesForUSD = () => axios.get(
  `${EXCHANGE_API_HOST}/latest.json?app_id=${API_ID}`,
);
