import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center p-3 relative'>
      
      <h1 className='text-3xl text-indigo-400 font-bold mt-5'>Admin Dashboard</h1>

      <div className='flex items-center justify-center gap-5 mt-10'>
        <a
          href="/admin/upload"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Upload Notes & PYQ         
        </a>
        <a
          href="/admin/view"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          View Notes 
        </a>
      </div>

    </div>
  )
}

export default page