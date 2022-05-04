import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Pre from './pages/Pre';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";


import { getFirebaseConfig } from './service/firebase.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const firebaseAppConfig = getFirebaseConfig();
// TODO 0: Initialize Firebase
initializeApp(firebaseAppConfig);