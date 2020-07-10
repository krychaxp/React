import React from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@material-ui/core'
export default function () {
    return (
        <Button variant="contained" color="primary" type="submit" style={{margin:'5px'}}>Submit</Button>
    );
}