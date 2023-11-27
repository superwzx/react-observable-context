import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from '../index';
import App from './App';
import state from './state';

ReactDOM.render(
  <ContextProvider state={state}>
    <App />
  </ContextProvider>,
  document.getElementById('root')
);
