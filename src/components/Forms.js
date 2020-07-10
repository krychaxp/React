import React from "react";
import { useForm } from "react-hook-form";
import ip from 'ip'
const API = "https://jsonplaceholder.typicode.com/";
//posts	100 posts
//comments	500 comments
//albums	100 albums
//photos	5000 photos
//todos	200 todos
//users	10 users
export default () => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  console.log(ip.address())
  document.title="Forms"
  return (
    <form id="form-box" onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div>Last Name*</div>
        <input name="lastName" type="text" ref={register({ required: true })} />
      </label>
      <label>
        <div>First Name*</div>
        <input
          name="firstName"
          type="text"
          ref={register({ required: true })}
        />
      </label>
      <label>
        <div>Age*</div>
        <input name="lastName" type="number" min="1" max="110" minLength="2" ref={register({ required: true })} />
      </label>
      <label>
        <div>Last Name*</div>
        <input name="lastName" type="text" ref={register({ required: true })} />
      </label>
      <label>
        <div>Last Name*</div>
        <input name="lastName" type="text" ref={register({ required: true })} />
      </label>
      <label>
        <div>Last Name*</div>
        <input name="lastName" type="text" ref={register({ required: true })} />
      </label>
      <input type="submit" />
    </form>
  );
};
