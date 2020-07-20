import axios from "axios";
import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import { Snackbar, Backdrop, CircularProgress } from '@material-ui/core';
import {WL_API} from "../../config";

export const currentDate = new Date().toLocaleDateString().split(".").reverse().join("-");

export const convertAccountNumber = (a) => {
  let nr = a.replace(/\D/g,'').slice(0, 26);
  for (let i = 0; i < 26 / 5; i++) {
    const j = 2 + i * 5;
    if (nr.length >= j) {
      nr = nr.slice(0, j) + " " + nr.slice(j);
    }
  }
  return nr.trim();
};
export const setCodeAddress = (a) => {
  a = a.replace(/\D/g, "").slice(0, 5);
  if (a.length >= 2) {
    a = a.slice(0, 2) + "-" + a.slice(2);
  }
  return a;
};
export const checkAccountBank=async (a)=>{
  try {//5272677009
    await axios.get(
      `${WL_API}bank-account/${a.replace(
        /\D/g,
        ""
      )}?date=${currentDate}`
    );
    console.log("account Number is Ok");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export const AlertBox=(props)=>{
  const { type, text } = props
  const [open, setOpen] = useState(true);
  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
          <Alert onClose={() => { setOpen(false) }} severity={type} variant="filled" elevation={6}>
              {text}
          </Alert>
      </Snackbar>
  )
}
export const Loading=(props)=>{
  const { open } = props;
  return (
    <Backdrop open={open} style={{ zIndex: 9999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
export const Internet=(props)=>{
  const [alertInfo, setAlertInfo] = useState(null);
  const setAlert = (a, b) => setAlertInfo(<AlertBox type={a} text={b} />);
  window.onoffline = () =>
    setAlert("warning", "Stracono połączenie z internetem.");
  window.ononline = () => setAlert("info", "Ponownie połączono z internetem.");
  return alertInfo
}
export const Language=()=>{
  window.localStorage.lang = window.localStorage.lang || "en";
  return (<></>);
}