import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core';
import Result from './Result'
export default function App() {
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  return (
    <div id="api-github">
      <div id="searcher">
        <TextField label="Search user" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button variant="contained" color="primary" disabled={searching} onClick={() => setSearching(true)}>Search</Button>
      </div>
      <main>
        <Result value={value} searching={searching} setSearching={setSearching}/>
      </main>
    </div>
  )
}