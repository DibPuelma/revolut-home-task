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
    currentRate,
  } = useContext(MainContext);
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');
  const [topError, setTopError] = useState('');
  const [bottomError, setBottomError] = useState('');
  const [topAmount, setTopAmount] = useState(0);
  const [bottomAmount, setBottomAmount] = useState(0);

  const switchCurrencies = () => {
    setTransactionType(transactionType === 'sell' ? 'buy' : 'sell');
  };

  const checkTopAmount = (amount: number) => {
    if (amount > topCurrency.balance && transactionType === 'sell') {
      setTopError('Exceeds your balance');
    } else {
      setTopError('');
    }
  };

  const checkBottomAmount = (amount: number) => {
    if (amount > bottomCurrency.balance && transactionType === 'buy') {
      setBottomError('Exceeds your balance');
    } else {
      setBottomError('');
    }
  };

  const handleTopExchangeAmountChange = (amount: number) => {
    setTopAmount(amount);
    checkTopAmount(amount);
    const newBottomAmount = amount * currentRate;
    setBottomAmount(newBottomAmount);
    checkBottomAmount(newBottomAmount);
  };

  const handleBottomExchangeAmountChange = (amount: number) => {
    setBottomAmount(amount);
    checkBottomAmount(amount);
    const newTopAmount = amount / currentRate;
    setTopAmount(newTopAmount);
    checkTopAmount(newTopAmount);
  };

  const capitalizedTransactionType = capitalizeFirstLetter(transactionType);
  const anyError = Boolean(topError) || Boolean(bottomError);

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
          handleExchangeAmountChange={handleTopExchangeAmountChange}
          error={topError}
          valueToExchange={topAmount}
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
          handleExchangeAmountChange={handleBottomExchangeAmountChange}
          error={bottomError}
          valueToExchange={bottomAmount}
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
        <Button
          variant="contained"
          disabled={anyError}
        >
          {`${capitalizedTransactionType} ${topCurrency.symbol} for ${bottomCurrency.symbol}`}
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;
