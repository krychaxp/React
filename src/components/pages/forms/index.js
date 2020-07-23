import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { isValidPesel, checkGender, getDateOfBirth } from "pesel-utils";
import {
  Button,
  TextField,
  // Switch,
  MenuItem,
  InputAdornment,
  // Select,
} from "@material-ui/core";
import axios from "axios";
import {
  Loading,
  convertAccountNumber,
  currentDate,
  setCodeAddress,
  checkAccountBank,
} from "../../utils";
import { WL_API } from "../../../config";
// import { Autocomplete } from "@material-ui/lab";
import content from "./content.js";
import { lang } from "../../../config";
import { MdPersonPin } from "react-icons/md";
import styles from "./index.module.scss";
export default () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    errors,
    triggerValidation,
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
    let check = false;
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
        setDatalist(accountNumbers.map((v) => convertAccountNumber(v)));
        console.log(datalist);
        check = true;
      } else {
        throw new Error("something goes wrong no 'subject'");
      }
    } catch (err) {
      alert("Invalid NIP");
    } finally {
      setBackdropOpen(false);
      return check;
    }
  };
  const onSubmit = (data) => {
    if (
      (getValues("status") === "person" && setFromPesel()) ||
      (getValues("status") === "company" && setFromNip())
    ) {
      alert("values was send:" + JSON.stringify(data));
    } else {
      alert("Something went wrong (probably you change nochanges values)");
    }
  };
  const isCompany = getValues("status") === "company";
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={content.form.status.label[lang] + " *"}
          name="status"
          select
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdPersonPin />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            register("status");
            setValue("status", e.target.value);
          }}
        >
          <MenuItem />
          <MenuItem value="person">{content.form.status.person[lang]}</MenuItem>
          <MenuItem value="company">
            {content.form.status.company[lang]}
          </MenuItem>
        </TextField>
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
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.pesel}
              helperText={
                (errors.pesel?.type === "required" &&
                  content.form.pesel.e.required[lang]) ||
                (errors.pesel?.type === "pattern" &&
                  content.form.pesel.e.pattern[lang])
              }
            />
            <TextField
              label={content.form.sex.label[lang] + " *"}
              name="sex"
              placeholder={content.form.sex.placeholder[lang]}
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label={content.form.birth.label[lang] + " *"}
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
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              placeholder="0123456789"
              name="nip"
              inputRef={register({ required: true, pattern: /^\d{10}$/ })}
              onChange={(e) => {
                const len = e.target.value.length === 10;
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                if (len && e.target.value.length === 10) setFromNip();
              }}
              error={!!errors.nip}
              helperText={
                (errors.nip?.type === "required" &&
                  content.form.nip.e.required[lang]) ||
                (errors.nip?.type === "pattern" &&
                  content.form.nip.e.pattern[lang])
              }
            />
            <TextField
              label={content.form.company.label[lang] + " *"}
              name="company"
              disabled
              inputRef={register}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Regon *"
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
              label={content.form.firstName.label[lang] + " *"}
              name="firstName"
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={!!errors.firstName}
              InputLabelProps={{ shrink: true }}
              helperText={
                (errors.firstName?.type === "required" &&
                  content.form.firstName.e.required[lang]) ||
                (errors.firstName?.type === "pattern" &&
                  content.form.firstName.e.pattern[lang])
              }
            />
            <TextField
              label={content.form.lastName.label[lang] + " *"}
              name="lastName"
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={!!errors.lastName}
              helperText={
                (errors.lastName?.type === "required" &&
                  content.form.lastName.e.required[lang]) ||
                (errors.lastName?.type === "pattern" &&
                  content.form.lastName.e.pattern[lang])
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label={content.form.city.label[lang] + " *"}
              name="city"
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={!!errors.city}
              disabled={isCompany}
              helperText={
                (errors.city?.type === "required" &&
                  content.form.city.e.required[lang]) ||
                (errors.city?.type === "pattern" &&
                  content.form.city.e.pattern[lang])
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label={content.form.street.label[lang] + " *"}
              name="street"
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              inputRef={register({ required: true, pattern: /^.{3,}$/ })}
              error={!!errors.street}
              disabled={isCompany}
              helperText={
                (errors.street?.type === "required" &&
                  content.form.street.e.required[lang]) ||
                (errors.street?.type === "pattern" &&
                  content.form.street.e.pattern[lang])
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label={content.form.codeAddress.label[lang] + " *"}
              placeholder="00-000"
              name="codeAddress"
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              inputRef={register({ required: true, pattern: /^\d{2}-\d{3}$/ })}
              error={!!errors.codeAddress}
              disabled={isCompany}
              helperText={
                (errors.codeAddress?.type === "required" &&
                  content.form.codeAddress.e.required[lang]) ||
                (errors.codeAddress?.type === "pattern" &&
                  content.form.codeAddress.e.pattern[lang])
              }
              onChange={(e) =>
                (e.target.value = setCodeAddress(e.target.value))
              }
              InputLabelProps={{ shrink: true }}
            />
            {/* <Autocomplete
              options={datalist}
              InputLabelProps={{ shrink: true }}
              freeSolo={getValues("status") === "person" || !datalist.length}
              noOptionsText="No options/Brak "
              onInputChange={(e, v) => {
                register("bank");
                setAccountValue(convertAccountNumber(v));
                setValue("bank", convertAccountNumber(v));
                console.log(v, accountValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={content.form.bank.label[lang] + " *"}
                  name="bank"
                  value={accountValue}
                  placeholder="00 0000 0000 0000 0000 0000 0000"
                  error={!!errors.bank}
                  helperText={
                    (errors.bank?.type === "required" &&
                      content.form.bank.e.required[lang]) ||
                    (errors.bank?.type === "pattern" &&
                      content.form.bank.e.pattern[lang]) ||
                    (errors.bank?.type === "validate" &&
                      content.form.bank.e.validate[lang])
                  }
                  // inputRef={register({
                  //   required: true,
                  //   pattern: /^\d{2}( \d{4}){6}$/,
                  //   validate: async (value) => await checkAccountBank(value),
                  // })}
                />
              )}
            /> */}
            <TextField
              label={content.form.bank.label[lang]}
              name="bank"
              onBlur={(e) => triggerValidation(e.currentTarget.name)}
              placeholder="00 0000 0000 0000 0000 0000 0000"
              error={!!errors.bank}
              helperText={
                (errors.bank?.type === "pattern" &&
                  content.form.bank.e.pattern[lang]) ||
                (errors.bank?.type === "validate" &&
                  content.form.bank.e.validate[lang])
              }
              onChange={(e) => {
                e.target.value = convertAccountNumber(e.target.value);
              }}
              inputRef={register({
                pattern: /^(\d{2}( \d{4}){6})?$/,
                validate: async (value) =>
                  !value || (await checkAccountBank(value)),
              })}
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </form>
      <Loading open={backdropOpen} />
    </>
  );
};
