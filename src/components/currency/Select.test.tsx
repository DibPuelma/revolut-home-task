/* eslint-disable react/jsx-props-no-spreading */
// @ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './Select';
import { MainContext } from '../../context/MainContext';
import {
  topCurrency,
  bottomCurrency,
  currenciesWithBalance,
  tick,
} from '../../testHelpers';

const selectProps = {
  currentCurrency: topCurrency,
  handleCurrencyChange: jest.fn(),
};

const openDialog = (getByText) => {
  const button = getByText(selectProps.currentCurrency.symbol);
  fireEvent.click(button);
};

const SelectWithContext = () => (
  <MainContext.Provider value={{
    currenciesWithBalance,
    topCurrency,
    bottomCurrency,
  }}
  >
    <Select {...selectProps} />
  </MainContext.Provider>
);

it('should render without crashing', () => {
  render(<Select {...selectProps} />);
});

it('should open dialog with search bar on button click', () => {
  const { currentCurrency } = selectProps;
  const { getByText, queryByTestId } = render(<Select {...selectProps} />);
  const button = getByText(currentCurrency.symbol);
  expect(queryByTestId(/search-field/)).not.toBeInTheDocument();
  fireEvent.click(button);
  expect(queryByTestId(/search-field/)).toBeInTheDocument();
});

it('should close dialog with arrow back click', async () => {
  const { getByText, queryByTestId, getByTestId } = render(<Select {...selectProps} />);
  openDialog(getByText);
  const arrowBack = getByTestId(/arrow-back-close/);
  expect(arrowBack).toBeInTheDocument();
  fireEvent.click(arrowBack);
  // wait for the dom to be updated
  await tick();
  expect(queryByTestId(/arrow-back-close/)).not.toBeInTheDocument();
});

it('should handle currency change on list click', () => {
  const { handleCurrencyChange } = selectProps;
  const { getByText, getByTestId } = render(<SelectWithContext />);
  openDialog(getByText);
  const listItem = getByTestId(currenciesWithBalance[0].symbol);
  fireEvent.click(listItem);
  expect(handleCurrencyChange).toBeCalledWith(currenciesWithBalance[0]);
});

it('should filter on search value', () => {
  const { getByText, getByTestId, queryByTestId } = render(<SelectWithContext />);
  openDialog(getByText);
  const searchField = getByTestId(/search-field/);
  fireEvent.change(searchField, { target: { value: currenciesWithBalance[0].symbol } });
  expect(queryByTestId(currenciesWithBalance[0].symbol)).toBeInTheDocument();
  expect(queryByTestId(currenciesWithBalance[1].symbol)).not.toBeInTheDocument();
});
