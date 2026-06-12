'use client'
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const param = useParams();
  let branch = param.branch
  const yearMap = {
    "AKTU-1st-year": 1,
    "AKTU-2nd-year": 2,
    "AKTU-3rd-year": 3,
    "AKTU-4th-year": 4,
  };

  const dbYear = yearMap[param.year];
  const dbBranch = param.branch;

  // now we have year & branch 

  async function fetchNotes() {

    try {
      const response = await axios.get(
        `/api/notes/${dbyear}/${branch}`
      );
      console.log(response.data?.data)

    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }


  console.log("year: ", dbYear, "Bra : ", dbBranch)

  const Resources = [
    {
      title: 'Notes',
      link: `${dbBranch}/notes`,
    },
    {
      title: 'PYQ',
      link: `${dbBranch}/pyqs`,
    },
    {
      title: 'Quantum',
      link: `${dbBranch}/quantum`,
    },
    {
      title: 'Important Topics',
      link: `${dbBranch}/important-topics`,
    },
    {
      title: 'Other Study Materials',
      link: `${dbBranch}/others`,
    },
  ];
  return (
    <div className='max-w-6xl mx-auto px-4 py-10 md:py-14'>
       <div className="mb-3 text-sm text-muted-foreground">
               <Link href={'/'}>Home</Link><span className="mx-2">›</span>
                <Link href={`/btech-study-material/${param.year}`}>{param.year}</Link>
                <span className="mx-2">›</span>
                 <Link href={`/btech-study-material/${param.year}/${param.branch}`}>{param.branch}</Link>
             </div>
      <Toaster />
      <p className='text-4xl md:text-5xl'>{param.year} {branch} <span className='text-blue-400 underline'>FREE</span>  Study Materials</p>
      
      <div className='grid md:grid-cols-3 grid-cols-1  md:gap-20  min-w-min text-2xl min-h-64 '>
        {Resources.map((res, idx) => (
          <Link href={res.link} 
            key={idx}>
            <div
              className='md:min-h-30 mt-10   bg-blue-400 rounded-2xl text-center p-5 '
            >{res.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default page