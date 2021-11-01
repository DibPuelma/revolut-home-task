import React, { useState, useContext } from 'react';
import './App.css';
import {
  Button, Grid, IconButton, Typography,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import CurrencyCard from './components/currency/Card';
import CurrencyType from './types/currency';
import { capitalizeFirstLetter } from './helpers/strings';
import { MainContext } from './MainContext';

type TransactionType = 'sell' | 'buy';

const GBP = {
  symbol: 'GBP',
  balance: 1000,
  name: 'Pound sterling',
};

const USD = {
  symbol: 'USD',
  balance: 500,
  name: 'United States Dollar',
};

function App() {
  const { currenciesWithBalance } = useContext(MainContext);
  const defaultTop = currenciesWithBalance.find((currency) => currency.symbol === 'GBP') || GBP;
  const defaultBottom = currenciesWithBalance.find((currency) => currency.symbol === 'USD') || USD;
  const [topCurrency, setTopCurrency] = useState<CurrencyType>(defaultTop);
  const [bottomCurrency, setBottomCurrency] = useState<CurrencyType>(defaultBottom);
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');

  const switchCurrencies = () => {
    setTransactionType(transactionType === 'sell' ? 'buy' : 'sell');
  };

  const capitalizedTransactionType = capitalizeFirstLetter(transactionType);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">
          {`${capitalizedTransactionType} ${topCurrency.symbol}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CurrencyCard
          currentCurrency={topCurrency}
          handleCurrencyChange={setTopCurrency}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton
          color="primary"
          aria-label="switch currencies"
          component="span"
          onClick={switchCurrencies}
        >
          {transactionType === 'sell' ? <ArrowDownward /> : <ArrowUpward />}
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <CurrencyCard
          currentCurrency={bottomCurrency}
          handleCurrencyChange={setBottomCurrency}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button variant="contained">
          {`${capitalizedTransactionType} ${topCurrency.symbol} for ${bottomCurrency.symbol}`}
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;
