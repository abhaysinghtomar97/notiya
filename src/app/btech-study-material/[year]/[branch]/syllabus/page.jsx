
import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: "CSE Syllabus",

  description:
    "Latest syllabus for CSE with subject-wise curriculum and credits.",
};

const app = async({params}) => {
  const param =await params;
  return (
    <div className='p-5 '>


      <div className=" text-sm text-muted-foreground">
        <Link href={'/'}>Home</Link><span className="mx-2">›</span>
        <Link href={`/btech-study-material/${param.year}`}>{param.year}</Link>
        <span className="mx-2">›</span> <Link href={`/btech-study-material/${param.year}/${param.branch}`}>{param.branch}</Link>
        <span className="mx-2">›</span> <Link href={`/btech-study-material/${param.year}/${param.branch}/`}>Syllabus</Link>
      </div>

      <div>
        <h1> Complete Btech Syllabus</h1>
        <table>
          <h2>Most Searched Syllabus</h2>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Links</th>
            </tr>
            
          </thead>
          <tbody>
            <tr>
              <td>Computer Science Engineeirng</td>
              <Link href='' > <td>View</td></Link>
            </tr>
          </tbody>
        </table>
        <table>
          <h2>Syllabus for All Branches</h2>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Links</th>
            </tr>
            
          </thead>
          <tbody>
            <tr>
              <td>Computer Science Engineeirng</td>
              <Link href='' > <td>View</td></Link>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default app