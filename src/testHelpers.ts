export const topCurrency = {
  symbol: 'GBP',
  balance: 0,
  name: 'Pound sterling',
};

export const bottomCurrency = {
  symbol: 'USD',
  balance: 0,
  name: 'United States Dollar',
};

export const currenciesWithBalance = [
  {
    symbol: 'EUR',
    balance: 1000,
    name: 'Euro',
  },
  {
    symbol: 'CLP',
    balance: 2500000,
    name: 'Chilean Peso',
  },
];

export const tick = () => new Promise((resolve) => {
  setTimeout(resolve, 1000);
});

export const currentRate = 1.32;
