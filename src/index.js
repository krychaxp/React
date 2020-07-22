import React from "react";
import ReactDOM from "react-dom";
import App from "./App/";
import * as serviceWorker from "./service-worker";
import "./index.scss";
import { Internet, Language } from "./components/utils";
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Internet />
    <Language />
  </React.StrictMode>,
  document.getElementById("container")
);
serviceWorker.register();
// Learn more about service workers: https://bit.ly/CRA-PWA
/***
  Made by krychaxp
  Last upadate: 22.07.2020
  web:krychaxp.pl
***/
