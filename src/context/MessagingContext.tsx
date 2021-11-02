import React, {
  ReactNode, createContext, useState,
} from 'react';

type Alerts = 'success' | 'error';

type ContextType = {
  alertOpen: boolean,
  alertMessage: string,
  alertType: Alerts,
  setAlertOpen: (open: boolean) => void,
  setAlertMessage: (message: string) => void,
  setAlertType: (type: Alerts) => void,
};

type Props = {
  children: ReactNode
};

const INITIAL_STATE: ContextType = {
  alertOpen: false,
  alertMessage: '',
  alertType: 'success',
  setAlertOpen: () => {},
  setAlertMessage: () => {},
  setAlertType: () => {},
};

export const MessagingContext = createContext(INITIAL_STATE);

export const MessagingContextProvider = ({ children }: Props) => {
  const [alertOpen, setAlertOpen] = useState(INITIAL_STATE.alertOpen);
  const [alertMessage, setAlertMessage] = useState(INITIAL_STATE.alertMessage);
  const [alertType, setAlertType] = useState(INITIAL_STATE.alertType);

  return (
    <MessagingContext.Provider value={{
      alertOpen,
      alertMessage,
      alertType,
      setAlertOpen,
      setAlertMessage,
      setAlertType,
    }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
