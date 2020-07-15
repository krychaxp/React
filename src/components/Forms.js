import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPesel, checkGender, getDateOfBirth } from "pesel-utils";
import {
  Button,
  TextField,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import Loading from "../assets/Loading";
import { WL_API } from "../assets/API";
import {
  setAccountNumber,
  currentDate,
  setCodeAddress,
  checkAccountBank,
} from "../assets/utils";
import { Autocomplete } from "@material-ui/lab";
export default () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    errors,
  } = useForm();
  const watchShowStatus = watch("status", false);
  const [datalist, setDatalist] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const setFromPesel = () => {
    const pesel = getValues("pesel") || "";
    if (!isValidPesel(pesel)) return false;
    setValue("sex", checkGender(pesel));
    setValue("birth", getDateOfBirth(pesel).split("/").reverse().join("-"));
    return true;
  };
  const setFromNip = async () => {
    try {
      setBackdropOpen(true);
      const nip = getValues("nip");
      const { data } = await axios.get(
        `${WL_API}nip/${nip}?date=${currentDate}`
      );
      if (data.result.subject) {
        const {
          name,
          krs,
          regon,
          workingAddress,
          residenceAddress,
          accountNumbers,
        } = data.result.subject;
        const address = residenceAddress || workingAddress;
        setValue("company", name);
        setValue("krs", krs);
        setValue("regon", regon);
        setValue("street", address.split(",")[0]);
        setValue("codeAddress", address.match(/\d{2}-\d{3}/)[0]);
        setValue("city", address.match(/\d{2}-\d{3} (.*)/)[1]);
        setDatalist(accountNumbers.map((v) => setAccountNumber(v)));
        return true;
      } else {
        throw new Error("something goes wrong");
      }
    } catch (err) {
      alert("Invalid NIP");
      return false;
    } finally {
      setBackdropOpen(false);
    }
  };
  const onSubmit = async (data) => {
    if (
      (getValues("status") === "person" && setFromPesel()) ||
      (getValues("status") === "company" && setFromNip())
    ) {
      alert("values was send:" + JSON.stringify(data));
    } else {
      alert("Something went wrong (probably you change nochanges values)");
    }
  };
  return (
    <>
      <form id="form-box" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputLabel>Select your status *</InputLabel>
          <Select
            name="status"
            ref={() => register({ name: "status" })}
            onChange={(e) => {setValue("status", e.target.value) }}
          >
            <MenuItem value=""> </MenuItem>
            <MenuItem value="person">Person</MenuItem>
            <MenuItem value="company">Company</MenuItem>
          </Select>
        </FormControl>
        {watchShowStatus === "person" && (
          <>
            <TextField
              label="PESEL *"
              type="number"
              placeholder="00112233444"
              name="pesel"
              inputRef={register({
                required: true,
                pattern: /^\d{11}$/,
              })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 11);
                setFromPesel();
              }}
              InputLabelProps={{ shrink: true }}
              error={errors.pesel}
              helperText={
                (errors.pesel?.type === "required" &&
                  "This input is required") ||
                (errors.pesel?.type === "pattern" &&
                  "This input must have 11 digits")
              }
            />
            <TextField
              label="Sex *"
              name="sex"
              placeholder="male/female"
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date of birth*"
              name="birth"
              placeholder="01-01-1900"
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        {watchShowStatus === "company" && (
          <>
            <TextField
              label="NIP *"
              type="number"
              placeholder="0123456789"
              name="nip"
              inputRef={register({ required: true, pattern: /^\d{10}$/ })}
              onChange={(e) => {
                const len = e.target.value.length === 10;
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                if (len && e.target.value.length === 10) setFromNip();
              }}
              error={errors.nip}
              helperText={
                (errors.nip?.type === "required" && "This input is required") ||
                (errors.nip?.type === "pattern" &&
                  "This input must have 10 digits")
              }
            />
            <TextField
              label="Company Name *"
              name="company"
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Regon"
              name="regon"
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="KRS"
              name="krs"
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        {watchShowStatus && (
          <>
            <TextField
              label="First name *"
              type="text"
              name="firstName"
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={errors.firstName}
              InputLabelProps={{ shrink: true }}
              helperText={
                (errors.firstName?.type === "required" &&
                  "This input is required") ||
                (errors.firstName?.type === "pattern" &&
                  "Too short first name, min 3 characters")
              }
            />
            <TextField
              label="Last name *"
              type="text"
              name="lastName"
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={errors.lastName}
              helperText={
                (errors.lastName?.type === "required" &&
                  "This input is required") ||
                (errors.lastName?.type === "pattern" &&
                  "Too short last name, min 3 characters")
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="City *"
              type="text"
              name="city"
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={errors.city}
              disabled={getValues("status") === "company"}
              helperText={
                (errors.city?.type === "required" &&
                  "This input is required") ||
                (errors.city?.type === "pattern" &&
                  "Too short city name, min 3 characters")
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Street *"
              type="text"
              name="street"
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={errors.street}
              disabled={getValues("status") === "company"}
              helperText={
                (errors.street?.type === "required" &&
                  "This input is required") ||
                (errors.street?.type === "pattern" &&
                  "Too short street name, min 3 characters")
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Code Address *"
              type="text"
              placeholder="00-000"
              name="codeAddress"
              inputRef={register({ required: true, pattern: /^\d{2}-\d{3}$/ })}
              error={errors.codeAddress}
              disabled={getValues("status") === "company"}
              helperText={
                (errors.codeAddress?.type === "required" &&
                  "This input is required") ||
                (errors.codeAddress?.type === "pattern" &&
                  "Only pattern like 00-000")
              }
              onChange={(e) =>
                (e.target.value = setCodeAddress(e.target.value))
              }
              InputLabelProps={{ shrink: true }}
            />
            <Switch color="primary" name="checkedB" /> Like programing
            <Autocomplete
              options={datalist}
              placeholder="00 0000 0000 0000 0000 0000 0000"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Account Number"
                  variant="outlined"
                  value="XDxddxdx"
                  onChange={(e) => {
                    console.log(watch());
                    console.log(params);
                    console.log(e, e.target.value);
                    e.target.value = setAccountNumber(e.target.value);
                  }}
                  name="bank"
                  ref={register({
                    required: true,
                    pattern: /^\d{2}( \d{4}){6}$/,
                    validate: async (value) => await checkAccountBank(value),
                  })}
                />
              )}
            />
            {/* <label>
              <div>Account bank number*</div>
              <input
                type="text"
                placeholder="00 0000 0000 0000 0000 0000 0000"
                name="bank"
                ref={register({
                  required: true,
                  pattern: /^\d{2}( \d{4}){6}$/,
                  validate: async (value) => {
                    try {
                      await axios.get(
                        `${WL_API}bank-account/${value.replace(
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
                  },
                })}
                onChange={(e) =>
                  (e.target.value = setAccountNumber(e.target.value))
                }
                list={datalist.length ? "bank-account-list" : ""}
              />
              <datalist id="bank-account-list">
                {datalist.map((v, i) => (
                  <option key={i} value={v} />
                ))}
              </datalist>
              <span>
                {errors.bank?.type === "required" && "This input is required"}
                {errors.bank?.type === "pattern" && "Input must have 26 digits"}
                {errors.bank?.type === "validate" && "Invalid account number"}
              </span>
            </label> */}
            <Button type="submit">Submit</Button>
          </>
        )}
      </form>
      <Loading open={backdropOpen} />
    </>
  );
};
