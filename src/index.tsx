import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MainContextProvider } from './context/MainContext';
import { MessagingContextProvider } from './context/MessagingContext';

ReactDOM.render(
  <React.StrictMode>
    <Container
      maxWidth="xs"
      style={{
        backgroundColor: 'rgb(247,247,247)',
        padding: '2em 1rem',
      }}
    >
      <MessagingContextProvider>
        <MainContextProvider>
          <App />
        </MainContextProvider>
      </MessagingContextProvider>
    </Container>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
