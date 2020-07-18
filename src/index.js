import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './service-worker';
import './scss/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  , document.getElementById('container'));
serviceWorker.register();
// Learn more about service workers: https://bit.ly/CRA-PWA
/***
  Made by krychaxp
  15.07.2020
  web:krychaxp.pl
***/