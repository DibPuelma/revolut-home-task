import { LinearProgress } from '@mui/material';
import React, {
  ReactNode, createContext, useEffect, useState,
} from 'react';
import {
  getCurrencyList,
  /* getAllRatesForSymbol, */
  getAllRatesForUSD,
} from './api/currency';
import { handleError } from './helpers/errors';
import CurrencyType from './types/currency';

const BASE_SYMBOL = 'USD';

type CurrencyHash = {
  [key: string]: string,
};

type RatesHash = {
  [key: string]: number,
};

type ContextType = {
  currenciesWithBalance: CurrencyType[],
  setCurrenciesWithBalance?: (list: CurrencyType[]) => void,
  error: string,
  setError?: (error: string) => void,
  loading: boolean,
  setLoading?: (loading: boolean) => void,
  topCurrency: CurrencyType,
  handleTopCurrencyChange: (currency: CurrencyType) => void,
  bottomCurrency: CurrencyType,
  handleBottomCurrencyChange: (currency: CurrencyType) => void,
  rates: RatesHash,
  currentRate: number,
};

type Props = {
  children: ReactNode
};

const INITIAL_STATE: ContextType = {
  currenciesWithBalance: [],
  error: '',
  loading: true,
  topCurrency: {
    symbol: 'GBP',
    balance: 0,
    name: 'Pound sterling',
  },
  bottomCurrency: {
    symbol: 'USD',
    balance: 0,
    name: 'United States Dollar',
  },
  handleTopCurrencyChange: () => { },
  handleBottomCurrencyChange: () => { },
  rates: {},
  currentRate: 0,
};

export const MainContext = createContext(INITIAL_STATE);

export const MainContextProvider = ({ children }: Props) => {
  const [currenciesWithBalance, setCurrenciesWithBalance] = useState(
    INITIAL_STATE.currenciesWithBalance,
  );
  const [error, setError] = useState(INITIAL_STATE.error);
  const [loading, setLoading] = useState(true);
  const [topCurrency, setTopCurrency] = useState<CurrencyType>(INITIAL_STATE.topCurrency);
  const [bottomCurrency, setBottomCurrency] = useState<CurrencyType>(INITIAL_STATE.bottomCurrency);
  const [rates, setRates] = useState<RatesHash>(INITIAL_STATE.rates);
  const [currentRate, setCurrentRate] = useState(INITIAL_STATE.currentRate);

  const generateCurrenciesStructure = (_symbolToName: CurrencyHash): CurrencyType[] => (
    Object.entries(_symbolToName).map(([key, value]) => ({
      symbol: key,
      name: value,
      balance: parseFloat((Math.random() * 1000).toFixed(2)),
    }))
  );

  // TODO: Improvement with a better API plan: ask for specific currency rates when changed
  // const handleRates = async (changedCurrency: CurrencyType, unchangedCurrency: CurrencyType) => {
  //   const { symbol: changedSymbol } = changedCurrency;
  //   const { symbol: unchangedSymbol } = unchangedCurrency;
  //   if (rates[changedSymbol] && rates[changedSymbol][unchangedSymbol]) return;
  //   setLoading(true);
  //   try {
  //     const { data } = await getAllRatesForSymbol(changedSymbol);
  //     const newRates = { ...rates };
  //     newRates[changedSymbol] = data.rates;
  //     setRates(newRates);
  //     setLoading(false);
  //   } catch (callError) {
  //     handleError(callError, setError);
  //     setLoading(false);
  //   }
  // };

  const calculateRate = (topCurrencySymbol: string, bottomCurrencySymbol: string): number => {
    const USDToTopCurrency = rates[topCurrencySymbol];
    const USDToBottomCurrency = rates[bottomCurrencySymbol];

    return USDToBottomCurrency / USDToTopCurrency;
  };

  const handleCurrentRate = (rate: number) => {
    setCurrentRate(parseFloat(rate.toFixed(4)));
  };

  const handleTopCurrencyChange = (currency: CurrencyType) => {
    // handleRates(currency, bottomCurrency);
    setTopCurrency(currency);
    if (currency.symbol === BASE_SYMBOL) handleCurrentRate(rates[bottomCurrency.symbol]);
    else handleCurrentRate(calculateRate(currency.symbol, bottomCurrency.symbol));
  };

  const handleBottomCurrencyChange = (currency: CurrencyType) => {
    // handleRates(currency, topCurrency);
    setBottomCurrency(currency);
    if (currency.symbol === BASE_SYMBOL) handleCurrentRate(1 / rates[topCurrency.symbol]);
    else handleCurrentRate(calculateRate(topCurrency.symbol, currency.symbol));
  };

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { data } = await getCurrencyList();
        const currenciesWithRandomBalance = generateCurrenciesStructure(data);
        setCurrenciesWithBalance(currenciesWithRandomBalance);
        const defaultTopCurrency = currenciesWithRandomBalance.find(
          (currency) => currency.symbol === 'GBP',
        );
        if (defaultTopCurrency) setTopCurrency(defaultTopCurrency);
        const defaultBottomCurrency = currenciesWithRandomBalance.find(
          (currency) => currency.symbol === 'USD',
        );
        if (defaultBottomCurrency) setBottomCurrency(defaultBottomCurrency);
        setLoading(false);
      } catch (callError) {
        handleError(callError, setError);
        setLoading(false);
      }
    };
    getCurrencies();
  }, []);

  useEffect(() => {
    const getRates = async () => {
      try {
        const { data } = await getAllRatesForUSD();
        setRates(data.rates);
        handleCurrentRate(1 / data.rates[topCurrency.symbol]);
      } catch (callError) {
        handleError(callError, setError);
        setLoading(false);
      }
    };
    getRates();
  }, []);

  if (loading) return <LinearProgress />;

  return (
    <MainContext.Provider value={{
      currenciesWithBalance,
      error,
      setError,
      loading,
      setLoading,
      topCurrency,
      handleTopCurrencyChange,
      bottomCurrency,
      handleBottomCurrencyChange,
      rates,
      currentRate,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
