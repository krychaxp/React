import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
const useStyle=makeStyles({
    root:{
        display:"flex"
    }
})
export default function App() {
    const classes=useStyle();
    return (
        <div id="Mat" className={classes.root} >
            <Button variant="contained" color="primary" onClick={(e)=>{e.target.querySelector("input").click()}}>
                Dodaj Zdjęcie &nbsp;<AddPhotoAlternateOutlinedIcon />
                <input type="file"/>
            </Button>
            <Menu size="Large" variant="contained" color="primary" />

        </div>
    )
}
// usestyles makestyles