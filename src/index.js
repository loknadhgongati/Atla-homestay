import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import 'bootstrap/dist/js/bootstrap.min.js';

import './index.scss'; 
import 'bootstrap-daterangepicker/daterangepicker.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

