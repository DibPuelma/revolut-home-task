import React, {
  ReactNode, createContext, useEffect, useState,
} from 'react';
import { getCurrencyList } from './api/currency';
import CurrencyType from './types/currency';

type CurrencyHash = {
  [key: string]: string,
};

type ContextType = {
  currenciesWithBalance: CurrencyType[],
  setCurrenciesWithBalance?: (list: CurrencyType[]) => void,
  error: string,
  setError?: (error: string) => void,
};

type Props = {
  children: ReactNode
};

const INITIAL_STATE: ContextType = {
  currenciesWithBalance: [],
  error: '',
};

export const MainContext = createContext(INITIAL_STATE);

export const MainContextProvider = ({ children }: Props) => {
  const [currenciesWithBalance, setCurrenciesWithBalance] = useState(
    INITIAL_STATE.currenciesWithBalance,
  );
  const [error, setError] = useState(INITIAL_STATE.error);

  const generateCurrenciesStructure = (_symbolToName: CurrencyHash): CurrencyType[] => (
    Object.entries(_symbolToName).map(([key, value]) => ({
      symbol: key,
      name: value,
      balance: parseFloat((Math.random() * 1000).toFixed(2)),
    }))
  );

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { data } = await getCurrencyList();
        const currenciesWithRandomBalance = generateCurrenciesStructure(data);
        setCurrenciesWithBalance(currenciesWithRandomBalance);
      } catch (callError) {
        if (typeof callError === 'string') {
          setError(callError);
        } else if (callError instanceof Error) {
          setError(callError.message);
        }
      }
    };
    getCurrencies();
  }, []);

  return (
    <MainContext.Provider value={{
      currenciesWithBalance,
      error,
      setError,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
