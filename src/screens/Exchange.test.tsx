// @ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Exchange from './Exchange';
import { MainContext } from '../context/MainContext';
import { MessagingContext } from '../context/MessagingContext';
import {
  topCurrency,
  bottomCurrency,
  currentRate,
  currenciesWithBalance,
} from '../testHelpers';

const handleTopCurrencyChange = jest.fn();
const handleBottomCurrencyChange = jest.fn();
const commitTransaction = jest.fn();

const setAlertOpen = jest.fn();
const setAlertMessage = jest.fn();
const setAlertType = jest.fn();

const ExchangeWithContext = () => (
  <MessagingContext.Provider value={{
    setAlertOpen,
    setAlertMessage,
    setAlertType,
  }}
  >
    <MainContext.Provider value={{
      topCurrency,
      handleTopCurrencyChange,
      bottomCurrency,
      handleBottomCurrencyChange,
      currentRate,
      commitTransaction,
      currenciesWithBalance,
    }}
    >
      <Exchange />
    </MainContext.Provider>
  </MessagingContext.Provider>
);

it('should render without crashing', () => {
  render(<Exchange />);
});

it('should change trasaction type on arrow press', () => {
  const { getByTestId } = render(<ExchangeWithContext />);
  const switchButton = getByTestId('switch-currencies-button');
  const header = getByTestId('header');
  expect(header).toHaveTextContent('Sell');
  fireEvent.click(switchButton);
  expect(header).toHaveTextContent('Buy');
});
