import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {createRoot} from 'react-dom/client'
import App from './App';

import './assets/css/app.css'

import reportWebVitals from './reportWebVitals';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
  offset: '10px',
  transition: transitions.SCALE
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
);

reportWebVitals();