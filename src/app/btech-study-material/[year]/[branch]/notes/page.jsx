'use client'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Loading from './loading'

const app = () => {
  const [subjects, setsubjects] = useState([])
  const [loading, setloading] = useState(true)
  const param = useParams();
  let branch = param.branch
  const yearMap = {
    "AKTU-1st-year": 1,
    "AKTU-2nd-year": 2,
    "AKTU-3rd-year": 3,
    "AKTU-4th-year": 4,
  };

  const dbYear = yearMap[param.year];
  const dbBranch = branch;

  // now we have year & branch 

  async function fetchNotes() {
    setloading(true)
    try {
      const response = await axios.get(
        `/api/notes/${dbYear}/${branch}`
      );
     
      setsubjects(response.data.data)


    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setloading(false)
    }
  }
  useEffect(() => {
    fetchNotes();
  }, [])


  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <div className="mb-6 ml-5 ">
        <h2 className="text-3xl font-bold">
          📚 Available Notes
        </h2>
        <p className="mt-1 text-gray-500">
          Access subject-wise study materials instantly.
        </p>
      </div>

      <div className="mb-3 text-sm text-muted-foreground ml-5">
        <Link href={'/'}>Home</Link><span className="mx-2">›</span>
        <Link href={`/btech-study-material/${param.year}`}>{param.year}</Link>
        <span className="mx-2">›</span>
        <Link href={`/btech-study-material/${param.year}/${param.branch}`}>{param.branch}</Link>
        <span className="mx-2">›</span> <Link href={`/btech-study-material/${param.year}/${param.branch}/`}>Notes</Link>
      </div>


      <div className="overflow-hidden rounded-2xl border m-10   border-gray-200 shadow-lg">
        {(loading) ? <Loading /> : (!loading && subjects.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No notes available for this branch yet.
          </div>) :
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={subject._id}
                  className={`border-b transition-all duration-200 hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">
                        📘
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {subject.subject}
                        </h3>

                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <a
                      href={subject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      View Resource →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       
        )}

      </div>



    </div>
  )
}

export default app