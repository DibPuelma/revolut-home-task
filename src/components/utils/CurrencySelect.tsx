import { Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import React from 'react';

type Props = {
  currentCurrency: string,
};

const CurrencySelect = ({ currentCurrency }: Props) => {
  return (
    <Button size="small" variant="text" endIcon={<KeyboardArrowDown />}>
      {currentCurrency}
    </Button>
  );
};

export default CurrencySelect;
