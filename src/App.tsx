import React, { useState, useContext } from 'react';
import './App.css';
import {
  Button, Grid, IconButton, Typography,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import CurrencyCard from './components/currency/Card';
import { capitalizeFirstLetter } from './helpers/strings';
import { MainContext } from './MainContext';
import CurrentRateDisplay from './components/rate/CurrentRateDisplay';

type TransactionType = 'sell' | 'buy';

function App() {
  const {
    topCurrency,
    handleTopCurrencyChange,
    bottomCurrency,
    handleBottomCurrencyChange,
  } = useContext(MainContext);
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
        <CurrentRateDisplay />
      </Grid>
      <Grid item xs={12}>
        <CurrencyCard
          currentCurrency={topCurrency}
          handleCurrencyChange={handleTopCurrencyChange}
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
          handleCurrencyChange={handleBottomCurrencyChange}
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
