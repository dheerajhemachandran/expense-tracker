import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navabar'
import Card from '../components/Card'
import axios from "axios"
const Home = () => {
  const [income, setincome] = useState(true)
  const uid=(localStorage.getItem("key"))
  const [description, setdescription] = useState("")
  const [amount, setamount] = useState(0)
  const [message, setmessage] = useState(null)
  const name=localStorage.getItem("name")
  const [incomevalue, setincomevalue] = useState(0)
  const [expensevalue, setexpensevalue] = useState(0)
  const [transcations, settranscations] = useState([])

  const handleadd = async (e) =>{
    e.preventDefault()
    if(!description){
      setmessage("enter a description")
      return
    }
    if(!amount){
      setmessage("enter a amount")
      return
    }
    const values ={
      description:description,
      amount:amount,
      type:income?"income":"expense",
      uid:uid
    }
    const res=await axios.post("http://localhost:5000/post/add",values)
    setmessage(res.data)
    fetchdata();
  }

  const updatevalues=(data)=>{
    settranscations(data)
    var ivalue=0
    var evalue=0
    data.map((values)=>{
      if(values.type==="income")
      ivalue=(values.amount+ivalue)
      else
      evalue=(values.amount+evalue)
    })
  setexpensevalue(evalue)
  setincomevalue(ivalue)  
  }
  async function fetchdata(){
    await axios.get(`http://localhost:5000/post/read/?uid=${uid}`).then((res)=>
    updatevalues(res.data))
    }

  useEffect(() => {
    fetchdata();
    
  }, [])
  
  return (
    <div>
      <Navbar/>
      
      <div className='flex flex-col items-center text-slate-200 my-20'>

        {/* welcome */}
        {name && <div className='font-bold text-2xl mb-2'>Welcome back {name}</div>}
        <div className='mb-10'>Your Balance: <span className='font-bold'>{incomevalue-expensevalue}</span></div>

        {/* income expense box */}
        <div className='flex flex-col md:flex-row bg-slate-500 text-slate-900 p-2 gap-3 mb-10 rounded'>
          <div className='text-center w-40 bg-slate-50 p-5 rounded'>
            <div className='text-green-500 text-lg font-bold'>{incomevalue}</div>
            <div>value</div>
          </div>

          <div className='text-center w-40 bg-slate-50 p-5 rounded'>
            <div className='text-red-500 text-lg font-bold'>{expensevalue}</div>
            <div>value</div>
          </div>
        </div>

        {/* transaction adder */}
        <form className='flex flex-col items-center gap-4 mb-20' onChange={()=>setmessage(null)} onSubmit={handleadd}>
          <div className={`${income?"text-green-500":"text-red-500"} rounded-t-xl w-fit py-1 px-2 text-2xl font-bold`}>ADD {income ? "Income" : "Expense"}</div>
          <div className={`${income?"bg-green-500":"bg-red-500"} text-lg py-2 px-3 flex flex-col md:flex-row items-center gap-1 rounded`}>
            <div>Description:</div> 
            <input required className='rounded px-2 text-slate-900 outline-none' type="text" onChange={(e)=>setdescription(e.target.value)}/>
          </div>
          <div className={`${income?"bg-green-500":"bg-red-500"} text-lg py-2 px-3 flex flex-col md:flex-row items-center gap-1 rounded`}>
            <div>Amount:</div> 
            <input required className='rounded px-2 text-slate-900 outline-none' type="number" onChange={(e)=>setamount(e.target.value)}/>
          </div>
          {message && <p className={`${income?"text-green-400":"text-red-400"}`}>{message}</p>}
          <div className='flex justify-end gap-3'>
            <button className={`p-2 ${income?"bg-green-500":"bg-red-500"} rounded-full`} type="button" onClick={()=>setincome(!income)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
            <button className={`p-2 ${income?"bg-green-500":"bg-red-500"} rounded-full`} type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </form>

        {/* history */}
        <div className='text-2xl font-bold'>History</div>
        <hr className='w-[60vw] md:w-[40vw] my-6'/>
        <div className='flex flex-col gap-2'>
          {transcations.map((transcation,index)=>(
            (<Card transcation={transcation} key={index} fetchdata={fetchdata}/>)
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home