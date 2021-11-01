import React, { useState } from 'react';
import {
  Grid, Paper, TextField, Typography,
} from '@mui/material';
import CurrencySelect from '../utils/CurrencySelect';
import currencyType from '../../types/currency';

type Props = {
  currentCurrency: currencyType;
};

const CurrencyCard = ({ currentCurrency }: Props) => {
  const [valueToExchange, setValueToExchange] = useState(0);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    // TODO: validate input with regex
    const parsedValue = parseInt(value, 10);
    setValueToExchange(parsedValue);
  };

  return (
    <Paper
      elevation={0}
      style={{
        borderRadius: 10,
        padding: '0.5em',
        paddingRight: '2em',
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <CurrencySelect currentCurrency={currentCurrency.symbol} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                style={{
                  paddingLeft: '0.5em',
                  color: 'rgb(140, 140, 140)',
                }}
              >
                {`Balance: ${currentCurrency.balance}`}
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
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              type: 'number',
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CurrencyCard;
