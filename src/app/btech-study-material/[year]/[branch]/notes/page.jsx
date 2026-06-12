'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const app = () => {
    const param = useParams()
  return (
    <div>
        
        <div className="mb-3 text-sm text-muted-foreground">
                       <Link href={'/'}>Home</Link><span className="mx-2">›</span> 
                       <Link href={`/btech-study-material/${param.year}`}>{param.year}</Link>
                       <span className="mx-2">›</span>
                        <Link href={`/btech-study-material/${param.year}/${param.branch}`}>{param.branch}</Link>
                     <span className="mx-2">›</span> <Link href={`/btech-study-material/${param.year}/${param.branch}/`}>Notes</Link>
                     </div>
                     
    </div>
  )
}

export default app