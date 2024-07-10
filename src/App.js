
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length , setLength] = useState(8)
  const [number , setNumber] = useState(false)
  const [char , setChar] = useState(false)
  const [password , setPassword] = useState("")

  const passref = useRef(null)

  const passwordGenerator = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyv"
    if(number) str+="0123456789"
    if(char) str+="<>?:{}!@#$%^&*"

    for (let index = 0; index < length; index++) {
      pass+=str.charAt(Math.floor(Math.random()*str.length+1));
      
    }
    setPassword(pass)

  } , [length , number , char ,setPassword])

  useEffect(()=>{passwordGenerator()},[length,number,char,passwordGenerator])
  return (
    <>
      
      <div className='bg-slate-300 rounded-lg my-10 mx-10 px-4 py-4'>
       <h1 className='text-center text-xl text-white'>Password Generator</h1> 
       <div className='flex rounded-lg mb-4 overflow-hidden'>
        <input 
        type='text'
        placeholder='password'
        value={password}
        className='py-3 px-3 w-full'
        ref={passref}
        >
        </input>
        <button className=' px-3 py-1 outline-none bg-green-200' 
        onClick={
          useCallback(()=>{
            
            passref.current?.select()
            window.navigator.clipboard.writeText(password)
        },[password])}>
          copy
        </button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={8}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}}
          >
          </input>
          <label>length : {length}</label>

        </div>
          <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={number}
          id='numberInput'
          onChange={()=>{setNumber((prev)=> (!prev))}}
          >
          </input>
          <label>Add_numbers</label>
        

          </div>

          <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={char}
          id='numberInput'
          onChange={()=>{setChar((prev)=> (!prev))}}
          >
          </input>
          <label>Add_Special_Characters</label>
        

          </div>

       </div>
       
       
      </div>


    </>
  );
}

export default App;
