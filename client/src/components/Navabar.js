import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navabar = () => {
  const nav=useNavigate()
  const handlelogout=()=>{
    localStorage.clear();
    nav("/login")
  }

  const handlelogin =()=>{
    nav("/login")
  }

  return (
    <div className='flex justify-between items-end px-5 md:px-20 lg:px-40 xl:px-96 text-slate-200'>
      <div className='text-xl lg:text-2xl xl:text-4xl'>Expense-tracker</div>
      {localStorage.getItem("key")?
        <button className='text-slate-400 text-sm border border-slate-400 hover:bg-slate-400 hover:text-slate-900 py-1 px-2' onClick={handlelogout}>logout</button>:
        <button className='text-slate-400 text-sm border border-slate-400 hover:bg-slate-400 hover:text-slate-900 py-1 px-2' onClick={handlelogin}>login to create your content</button>}
    </div>
  )
}

export default Navabar