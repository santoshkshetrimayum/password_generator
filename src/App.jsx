import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [password,setPassword] = useState()
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [btnValue, setBtnValue] = useState("Copy")
  const passwordRef = useRef(null)
  
  let generatePassword = useCallback(()=>{
    let passwordString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) passwordString +="0123456789"
    if(symbolAllowed) passwordString += "!@#$%^&*()~{}[]<>/?"
    let pass = ""
    for(let i = 1; i<=length;i++){
      let position = Math.floor(Math.random()*passwordString.length+1)
      pass += passwordString.charAt(position)
    }
    setPassword(pass)
  }, [length,numberAllowed,symbolAllowed])

useEffect(()=>{
  generatePassword()
}, [length, numberAllowed, symbolAllowed])

let handleClick = ()=>{
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select()
  setBtnValue("Copied")
}
 

  return (
    <main className='h-screen w-full bg-gray-400 flex justify-center items-center'>
      <section className='w-1/2 h-80 bg-slate-800 p-10 '>
        <input 
          type="text" 
          className='w-3/4 rounded-md mx-10 my-10 p-2 bg-slate-500 text-green-400 outline-none'
          placeholder='password' 
          value={password} 
          readOnly
          ref={passwordRef}
        />
        <button 
          className='bg-slate-500 px-6 py-2 text-green-400 rounded-md active:bg-slate-700' 
          onClick={handleClick}
        >
          {btnValue}
        </button><br />
        <input 
          className='mr-2 ml-10 w-80 cursor-pointer' 
          type="range" 
          max={20} 
          min={3} 
          value={length} 
          onChange={e=>setLength(e.target.value)}
        />
        <label 
          className='font-semibold text-lg text-green-400 px-4'
        >
          {length}
        </label>
        <input 
          className='accent-green-400 w-6 h-6 bg-slate-500 ml-4' 
          type="checkbox" 
          defaultChecked={numberAllowed} 
          onChange={()=>setNumberAllowed((prev)=>!prev)} 
        />
        <label 
          className='font-semibold text-lg text-slate-500 px-4' 
        >
          Number
        </label>
        <input 
          className='accent-green-400 w-6 h-6 bg-slate-500 ml-4' 
          type="checkbox" 
          defaultChecked={symbolAllowed} 
          onChange={()=>setSymbolAllowed(prev=>!prev)} 
        />
        <label 
          className='font-semibold text-lg text-slate-500 px-4' 
        >
          Symbols
        </label>
      </section>
    </main>
  )
}

export default App
