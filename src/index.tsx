import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/App';
import { DataProvider } from './lib/context';

import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Render the React application inside React's StrictMode
 * - `DataProvider`: Provides context and manages global state
 * - `App`: Main application component that contains the app's structure and routing
 */
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);

/**
 * Optional: Report web vitals to help measure the performance of the app
 * It can be used to log results or send to an analytics endpoint
 *
 * More info: https://bit.ly/CRA-vitals
 */
reportWebVitals();
