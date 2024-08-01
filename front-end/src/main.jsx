import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/index.scss';

import { Provider } from 'react-redux';
import {  store } from '@/stores/store.js';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
  <Provider store={store}>
        <App /> 
  </Provider>,
//    </React.StrictMode>,
);
