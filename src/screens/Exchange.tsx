import React, { useState, useContext } from 'react';
import {
  Button, CircularProgress, Grid, IconButton, Typography,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import CurrencyCard from '../components/currency/Card';
import { capitalizeFirstLetter } from '../helpers/strings';
import { MainContext } from '../context/MainContext';
import CurrentRateDisplay from '../components/rate/CurrentRateDisplay';
import TransactionType from '../types/transaction';
import { handleError } from '../helpers/errors';
import { MessagingContext } from '../context/MessagingContext';

const Exchange = () => {
  const {
    topCurrency,
    handleTopCurrencyChange,
    bottomCurrency,
    handleBottomCurrencyChange,
    currentRate,
    commitTransaction,
  } = useContext(MainContext);
  const {
    setAlertOpen,
    setAlertMessage,
    setAlertType,
  } = useContext(MessagingContext);
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');
  const [topError, setTopError] = useState('');
  const [bottomError, setBottomError] = useState('');
  const [topAmount, setTopAmount] = useState(0);
  const [bottomAmount, setBottomAmount] = useState(0);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const capitalizedTransactionType = capitalizeFirstLetter(transactionType);
  const anyError = Boolean(topError) || Boolean(bottomError);

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
    const newBottomAmount = parseFloat((amount * currentRate).toFixed(2));
    setBottomAmount(newBottomAmount);
    checkBottomAmount(newBottomAmount);
  };

  const handleBottomExchangeAmountChange = (amount: number) => {
    setBottomAmount(amount);
    checkBottomAmount(amount);
    const newTopAmount = parseFloat((amount / currentRate).toFixed(2));
    setTopAmount(newTopAmount);
    checkTopAmount(newTopAmount);
  };

  const handleTransaction = async () => {
    if (anyError) return;
    if (topAmount === 0 || bottomAmount === 0) return;
    if (!commitTransaction) return;
    setTransactionLoading(true);
    try {
      await commitTransaction(
        { ...topCurrency, amount: topAmount },
        { ...bottomCurrency, amount: bottomAmount },
        transactionType,
      );
      setTopAmount(0);
      setBottomAmount(0);
      setAlertType('success');
    } catch (error) {
      const errorMessage = handleError(error);
      setAlertMessage(errorMessage);
      setAlertType('error');
    } finally {
      setAlertOpen(true);
      setTransactionLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" data-testid="header">
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
          data-testid="switch-currencies-button"
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
          disabled={anyError || transactionLoading}
          onClick={handleTransaction}
          endIcon={transactionLoading && <CircularProgress size={15} />}
        >
          {`${capitalizedTransactionType} ${topCurrency.symbol} for ${bottomCurrency.symbol}`}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Exchange;
