import React from 'react';
import {
  Grid, Paper, TextField, Typography,
} from '@mui/material';
import CurrencySelect from './Select';
import CurrencyType from '../../types/currency';

type Props = {
  currentCurrency: CurrencyType,
  error: string,
  valueToExchange: number,
  handleCurrencyChange: (currency: CurrencyType) => void,
  handleExchangeAmountChange: (amount: number) => void,
};

const CurrencyCard = ({
  currentCurrency,
  handleCurrencyChange,
  error,
  handleExchangeAmountChange,
  valueToExchange,
}: Props) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const parsedValue = parseFloat(parseFloat(value).toFixed(2));
    if (parsedValue === 0) return;
    handleExchangeAmountChange(parsedValue);
  };

  return (
    <Paper
      elevation={0}
      style={{
        borderRadius: 10,
        padding: '0.5rem',
        paddingRight: '2rem',
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <CurrencySelect
                currentCurrency={currentCurrency}
                handleCurrencyChange={handleCurrencyChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                style={{
                  paddingLeft: '0.5rem',
                  color: 'rgb(140, 140, 140)',
                }}
              >
                {`Balance: ${currentCurrency.symbol} ${currentCurrency.balance}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="standard"
            value={valueToExchange}
            onChange={handleValueChange}
            inputProps={{
              style: {
                textAlign: 'right',
              },
              type: 'number',
              'data-testid': `${currentCurrency.symbol}-value-change`,
            }}
            error={Boolean(error)}
            helperText={error}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CurrencyCard;
