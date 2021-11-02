import { TrendingUp } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const CurrentRateDisplay = () => {
  const { currentRate, topCurrency, bottomCurrency } = useContext(MainContext);

  return (
    <Grid container direction="row">
      <TrendingUp color="primary" />
      <Typography variant="body2" color="primary">
        {`${topCurrency.symbol} 1 = ${bottomCurrency.symbol} ${currentRate}`}
      </Typography>
    </Grid>
  );
};

export default CurrentRateDisplay;
