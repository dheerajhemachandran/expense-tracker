import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setinputs] = useState({
    name:"",
    email:"",
    password:""
  })
  const [error, seterror] = useState(null)

  const handlechange=(e)=>{
      setinputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const navigate=useNavigate()
  const handlesubmit=async e=>{
    e.preventDefault()
    try{
      const res=await axios.post("http://localhost:5000/auth/register",inputs)
      navigate("/login")
    }catch(err){
      seterror(err.response.data)
      console.log(error)
    }
    
  }

  return (
    <div className='h-screen flex items-center justify-center'>
    <form className='bg-slate-50 flex flex-col gap-2 px-5 md:px-10 py-10 items-center rounded' onSubmit={handlesubmit}>
        <h1 className='text-2xl font-bold mb-10'>Register</h1>
        <input required className='bg-slate-200 focus:bg-slate-100 text-center focus:border-b outline-none border-b-slate-900 p-1' name="name" type="text" onChange={handlechange} placeholder='username'/>
        <input required className='bg-slate-200 focus:bg-slate-100 text-center focus:border-b outline-none border-b-slate-900 p-1' name="email" type="email" onChange={handlechange} placeholder='email address'/>
        <input required className='bg-slate-200 focus:bg-slate-100 text-center focus:border-b outline-none border-b-slate-900 p-1' name="password" type="password" onChange={handlechange} placeholder='password'/>
        <button className='mt-4 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-slate-50 px-2 py-1' type="submit">register</button>
        {error && <p className='font-semibold'>{error}</p>}
        <p>Already have an account? <Link to="/login" className='font-bold'>Login</Link> </p>
    </form>
</div>
  )
}

export default Register