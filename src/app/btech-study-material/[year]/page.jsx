'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const param = useParams()
  let year = param.year
  let Headyear = year.replace(/[-.*+?^${}()|[\]\\]/g, ' ');
 
  const AllBranch = [
  {
    title: 'CSE',
    link: `/CSE`,
  },
  {
    title: 'ECE',
    link: `/ECE`,
  },
  {
    title: 'IT',
    link: `/IT`,
  },
  {
    title: 'CS-AI',
    link: `/CS-AI`,
  },
  {
    title: 'CS-AIML',
    link: `/CS-AIML`,
  },
  {
    title: 'CS-DS',
    link: `/CS-DS`,
  },
];
  return (
    <div className='max-w-6xl mx-auto px-4 py-10 md:py-14'>
     <div className="mb-3 text-sm text-muted-foreground">
        <Link href={'/'}>Home</Link><span className="mx-2">›</span> 
        <Link href={`/btech-study-material/${year}`}>{year}</Link>
      </div>
      <p className='text-4xl md:text-7xl font-bold '>{Headyear} <span className='text-blue-400 underline'>FREE</span>  Notes</p>
      <h1 className='mt-10 text-2xl font-bold '>Select Your Branch </h1>
      <div className='mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4'>
        {AllBranch.map((branch, idx) => (
          <Link
            href={`/btech-study-material/${year}${branch.link}`}
            key={idx}
            className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border border-slate-200
                      bg-gradient-to-br from-white to-slate-50
                      px-6 py-5
                      text-center
                      font-bold
                      text-slate-700
                      shadow-sm
                      cursor-pointer
                      transition-all duration-300
                      hover:-translate-y-2
                      hover:shadow-xl
                      hover:border-indigo-400
                    "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="relative z-10 text-lg">
              {branch.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default page