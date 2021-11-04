/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';
import { topCurrency } from '../../testHelpers';

jest.mock('./Select', () => () => <div data-testid="currency-select" />);

const cardProps = {
  currentCurrency: topCurrency,
  error: '',
  valueToExchange: 0,
  handleCurrencyChange: jest.fn(),
  handleExchangeAmountChange: jest.fn(),
};

it('should render without crashing', () => {
  render(<Card {...cardProps} />);
});

it('should render error if it is not empty', () => {
  cardProps.error = 'not empty error';
  const { getByText } = render(<Card {...cardProps} />);
  expect(getByText('not empty error')).toBeInTheDocument();
});

it('should show the current balance', () => {
  const { currentCurrency } = cardProps;
  const { getByText } = render(<Card {...cardProps} />);
  expect(getByText(`Balance: ${currentCurrency.symbol} ${currentCurrency.balance}`)).toBeInTheDocument();
});

it('should render CurrencySelect', () => {
  const { getByTestId } = render(<Card {...cardProps} />);
  expect(getByTestId(/currency-select/)).toBeInTheDocument();
});

describe('exchange value input', () => {
  let input: HTMLElement;
  let handleExchangeAmountChange: () => void;

  beforeEach(() => {
    const { currentCurrency } = cardProps;
    handleExchangeAmountChange = cardProps.handleExchangeAmountChange;
    const { getByTestId } = render(<Card {...cardProps} />);
    input = getByTestId(`${currentCurrency.symbol}-value-change`);
  });

  it('should call handleExchangeAmountChange with correct value', () => {
    fireEvent.change(input, { target: { value: '10' } });
    expect(handleExchangeAmountChange).toHaveBeenCalledWith(10);
  });

  it('should allow up to two decimals in input', () => {
    fireEvent.change(input, { target: { value: '10.23424' } });
    expect(handleExchangeAmountChange).toHaveBeenCalledWith(10.23);
  });

  it('should allow empty input', () => {
    fireEvent.change(input, { target: { value: '' } });
    expect(handleExchangeAmountChange).not.toHaveBeenCalledWith('');
  });
});
