import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
export default function (props) {
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