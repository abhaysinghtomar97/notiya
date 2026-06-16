
import Link from 'next/link';

import React from 'react'

export async function generateMetadata({ params }) {
  const { year, branch } =await params;

 

  return {
    title: `${branch} ${year}`,
    description: `${branch} notes, PYQs, syllabus, quantum and important topics.`,
  };
}

const page = async ({params}) => {
  
  const param = await params;
    let dbBranch = param.branch;

  const Resources = [
    {
      title: 'Notes',
      link: `${dbBranch}/notes`,
    },
    {
      title: 'PYQ',
      link: `${dbBranch}/pyq`,
    },
    {
      title: 'Syllabus',
      link: `${dbBranch}/syllabus`,
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
      
      <p className='text-4xl md:text-5xl'>{param.year} {param.branch} <span className='text-blue-400 underline'>FREE</span>  Study Materials</p>
      
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