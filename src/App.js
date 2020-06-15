import React, { useState, useEffect } from 'react'
import { TextField, Button} from '@material-ui/core';
import Result from './components/Result'

export default function App() {
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  navigater('d')
  useEffect(()=>{
    setSearching(false)
  },[searching])
  return (
    <React.Fragment>
      <header>
        <h1>Something in React</h1>
      </header>
      <nav>
        <div className="flex-center">
          <TextField className="m-10" label="Search user" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button className="m-10" variant="contained" color="primary" onClick={()=>setSearching(true)}>Search</Button>
        </div>
      </nav>
      <main>
          <Result value={value} searching={searching}/>
      </main>
      <footer>
      </footer>
    </React.Fragment>
  )
}