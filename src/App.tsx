import React from 'react';
import './App.css';
import { Button, Container, Grid } from '@mui/material'
import CurrencyCard from './components/cards/CurrencyCard';

function App() {
  return (
    <Container maxWidth="xs" style={{
      backgroundColor: 'rgb(247,247,247)',
      padding: '2em 1em',
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CurrencyCard currentCurrency="GBP" />
          </Grid>
          <Grid item xs={12}>
            <CurrencyCard currentCurrency="USD" />
          </Grid>
          <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Button variant="contained">
              Sell GPB for USD
            </Button>
          </Grid>
        </Grid>
    </Container>
  );
}

export default App;
