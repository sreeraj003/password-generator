import './app.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCallback, useState } from 'react';

export default function App() {

  const [min, setMin] = useState(0)
  const [upperCase, setUpperCase] = useState(false)
  const [lowercase, setLowerCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [count, setCount] = useState(0)
  const [copy, setCopy] = useState(false)

  const handleSubmit = useCallback(() => {
    if (!min || min < 1) {
      setErr('Enter proper password length')
      setTimeout(() => (setErr('')), 2000)
      throw new Error('Please select at least one option for password complexity.');
    } else {
      setErr('')
    }
    if (count > min) {
      setErr('The number of criteria you entered is more than the password length')
      setTimeout(() => (setErr('')), 2000)
      return
    }
    else {
      setErr('')
    }

    let pass = ''
    for (let i = 0; i < min; i++) {
      if (upperCase && pass.length < min) {
        let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * upper.length);
        pass += upper[randomIndex]
      }
      if (lowercase && pass.length < min) {
        let lower = 'abcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * lower.length);
        pass += lower[randomIndex]
      }
      if (number && pass.length < min) {
        let numbers = '0123456789';
        const randomIndex = Math.floor(Math.random() * numbers.length);
        pass += numbers[randomIndex]
      }
      if (symbol && pass.length < min) {
        let symbols = '!@#$%^&*()_-+=[]{}|;:,.<>?';
        const randomIndex = Math.floor(Math.random() * symbols.length);
        pass += symbols[randomIndex]
      }
    }
    setPassword(pass)
    setCopy(false)


  }, [count, lowercase, min, number, symbol, upperCase]);

  const handleUpper = useCallback((e) => {
    setUpperCase(!upperCase)
    if (e.target.checked) {
      setCount(count + 1)
    } else {
      setCount(count - 1)
    }
  }, [count, upperCase])

  const handleLower = useCallback((e) => {
    setLowerCase(!lowercase)
    if (e.target.checked) {
      setCount(count + 1)
    } else {
      setCount(count - 1)
    }
  }, [count, lowercase])

  const handleSymbol = useCallback((e) => {
    setSymbol(!symbol)
    if (e.target.checked) {
      setCount(count + 1)
    } else {
      setCount(count - 1)
    }
  }, [count, symbol])

  const handleNumber = useCallback((e) => {
    setNumber(!number)
    if (e.target.checked) {
      setCount(count + 1)
    } else {
      setCount(count - 1)
    }
  }, [count, number])

  const handleClip = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password)
        .then(() => {
          setCopy(true)
          setTimeout(() => {
            setCopy(false)
          }, 2000)
        })
    } catch (error) {
      setErr('Something went wrong')
    }
  }, [password])

  return (
    <>
      <div className="m-auto pass text-center w-50 mt-5">
        <h1>Password Generator</h1>
        {err != '' && <div className="alert alert-danger">{err} </div>}
        <div className="row mt-5">
          <div className="col-6 ">
            <label htmlFor="passewordLength"><h5>Enter the desired passeword Length</h5></label>
          </div>
          <div className="col-1">
            :
          </div>
          <div className="col-3">
            <input type="text" value={min} onChange={(e) => setMin(e.target.value)} className='mt-0 w-25 form-control' />
          </div>
        </div>
        <div className="row">
          <div className="col-6"  >
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={upperCase} onChange={(e) => handleUpper(e)} />} label="Uppercase letter" />
              <FormControlLabel control={<Checkbox checked={lowercase} onChange={(e) => handleLower(e)} />} label="Lowercase letter" />
              <FormControlLabel control={<Checkbox checked={symbol} onChange={(e) => handleSymbol(e)} />} label="symbol" />
              <FormControlLabel control={<Checkbox checked={number} onChange={(e) => handleNumber(e)} />} label="Number" />
            </FormGroup>
          </div>
        </div>
        <div>
          <div className="bg-light mx-auto" style={{ height: '5vh', width: "70%", borderRadius: '10px' }}>
            {password}
          </div>
        </ div>
        <button className='btn mt-3 btn-dark text-white' onClick={handleSubmit}>Create</button>
        <button className='btn mt-3 btn-outline-dark ms-2' onClick={handleClip}>{copy ? 'Copied' : "Copy"}</button>
      </div>
    </>
  )
}

