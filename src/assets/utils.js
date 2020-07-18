import axios from "axios";
import { WL_API } from "./API";

export const setAccountNumber = (a) => {
  let nr = (a.match(/\d/g) || []).join("").slice(0, 26);
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
export const currentDate = new Date().toLocaleDateString().split(".").reverse().join("-");
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