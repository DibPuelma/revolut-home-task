// @ts-nocheck

import React from 'react';
import { render } from '@testing-library/react';
import CurrentRateDisplay from './CurrentRateDisplay';
import { MainContext } from '../../context/MainContext';
import { topCurrency, bottomCurrency, currentRate } from '../../testHelpers';

it('should render without crashing', () => {
  render(<CurrentRateDisplay />);
});

it('should display current rate with symbols', () => {
  const { getByText } = render(
    <MainContext.Provider value={{
      topCurrency,
      bottomCurrency,
      currentRate,
    }}
    >
      <CurrentRateDisplay />
    </MainContext.Provider>,
  );
  expect(getByText(`${topCurrency.symbol} 1 = ${bottomCurrency.symbol} ${currentRate}`)).toBeInTheDocument();
});
