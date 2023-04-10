import axios from 'axios'
import React from 'react'

const Card = ({transcation,fetchdata}) => {
  const handledelete=async()=>{
    const res=await axios.delete(`http://localhost:5000/post/delete/?id=${transcation.id}`)
    fetchdata()
  }
  return (
    <div className={`bg-slate-50 text-slate-900 border-l-8 ${transcation.type==="income"?"border-green-500":"border-red-500"} min-w-[60vw] md:min-w-[40vw] p-2 rounded`}>
      <div className='flex justify-between'>
        <div>{transcation.description}</div>
        <div className='flex items-center gap-2 text-slate-800'>
          {transcation.amount}
          <button className='text-red-700 hover:text-red-500' onClick={handledelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card