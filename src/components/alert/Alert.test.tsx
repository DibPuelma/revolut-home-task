// @ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert from './Alert';
import { MessagingContext } from '../../context/MessagingContext';

const alertErrorMessage = 'There was an error processing the transaction';

it('should render without crashing', () => {
  render(<Alert />);
});

describe('Error type alert', () => {
  let renderResult;

  beforeEach(() => {
    renderResult = render(
      <MessagingContext.Provider value={{
        alertOpen: true,
        alertMessage: alertErrorMessage,
        alertType: 'error',
        setAlertOpen: jest.fn(),
      }}
      >
        <Alert />
      </MessagingContext.Provider>,
    );
  });

  it('should render error title', () => {
    const { getByText } = renderResult;
    expect(getByText('Error')).toBeInTheDocument();
  });

  it('should render error message', () => {
    const { getByText } = renderResult;
    expect(getByText(alertErrorMessage)).toBeInTheDocument();
  });
});

describe('Success type alert', () => {
  let renderResult;

  beforeEach(() => {
    renderResult = render(
      <MessagingContext.Provider value={{
        alertOpen: true,
        alertType: 'success',
        setAlertOpen: jest.fn(),
      }}
      >
        <Alert />
      </MessagingContext.Provider>,
    );
  });

  it('should render success', () => {
    const { getByText } = renderResult;
    expect(getByText('Transaction succesful')).toBeInTheDocument();
  });

  it('should render animation', () => {
    const { getByTestId } = renderResult;
    expect(getByTestId('animation')).toBeInTheDocument();
  });
});

it('should have a button to close', () => {
  const setAlertOpen = jest.fn();
  const { getByTestId } = render(
    <MessagingContext.Provider value={{
      alertOpen: true,
      setAlertOpen,
    }}
    >
      <Alert />
    </MessagingContext.Provider>,
  );
  const button = getByTestId('accept-button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(setAlertOpen).toBeCalledWith(false);
});
