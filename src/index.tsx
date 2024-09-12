import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app';
import { DataProvider } from './lib/context';

import './styles/index.scss';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <DataProvider>
    <App />
  </DataProvider>
  // </React.StrictMode>
);

reportWebVitals();
