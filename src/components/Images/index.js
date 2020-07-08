import React from 'react'
import { useForm } from "react-hook-form";
import './index.scss'
import { Button } from '@material-ui/core'
export default function () {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };
    const inputs = [
        {
            title: "First Name",
            name: "firstName",
            ref:register({
                required: 'error message',
                minLength: {
                    value: 3,
                    message: 'Too short name' // <p>error message</p>
                }
            })
        },
        {
            title: "Last Name",
            name: "lastName",
            ref:register({
                required: 'error message',
                minLength: {
                    value: 3,
                    message: 'Too short name' // <p>error message</p>
                }
            })
        },
        {
            title: "Email",
            name: "email",
            type: "email",
            ref:register({
                required: 'error message',
                pattern: {
                    value: /[A-Za-z]{3}/,
                    message: 'error message' // <p>error message</p>
                  }
            })
        },
        {
            title: "Ia a Developer",
            name: "isDeveloper",
            type:"checkbox",
            ref:register({
                required: 'error message'
            })
        },
    ].map(({type,...state})=>({type:type||'text',...state}))
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {inputs.map(({title,name,type,placeholder,ref},i) =>
                <label key={i}>{title}
                    <input name={name} type={type} placeholder={placeholder} ref={ref} />
                </label>
            )}
            <Button variant="contained" color="primary" type="submit" style={{margin:'5px'}}>Submit</Button>
        </form>
    );
}