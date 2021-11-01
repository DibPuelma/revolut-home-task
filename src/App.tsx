import React, { useState } from 'react';
import './App.css';
import {
  Button, Container, Grid, IconButton, Typography,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import CurrencyCard from './components/cards/CurrencyCard';
import CurrencyType from './types/currency';
import { capitalizeFirstLetter } from './helpers/strings';

type TransactionType = 'sell' | 'buy';

function App() {
  const [topCurrency] = useState<CurrencyType>({
    symbol: 'GBP',
    balance: 1000,
    name: 'Pound sterling',
  });
  const [bottomCurrency] = useState<CurrencyType>({
    symbol: 'USD',
    balance: 500,
    name: 'United States Dollar',
  });
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');

  const switchCurrencies = () => {
    setTransactionType(transactionType === 'sell' ? 'buy' : 'sell');
  };

  const capitalizedTransactionType = capitalizeFirstLetter(transactionType);

  return (
    <Container
      maxWidth="xs"
      style={{
        backgroundColor: 'rgb(247,247,247)',
        padding: '2em 1em',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">
            {`${capitalizedTransactionType} ${topCurrency.symbol}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CurrencyCard currentCurrency={topCurrency} />
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
          <CurrencyCard currentCurrency={bottomCurrency} />
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
    </Container>
  );
}

export default App;
