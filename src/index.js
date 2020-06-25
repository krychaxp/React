import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './service-worker';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  , document.getElementById('container'));
serviceWorker.register();
// Learn more about service workers: https://bit.ly/CRA-PWA
