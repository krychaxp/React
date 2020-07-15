import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core';
export default function (props) {
    const {open} = props
    return (
        <Backdrop open={open} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}