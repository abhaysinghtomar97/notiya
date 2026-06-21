'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const Page = () => {
  const [input, setInput] = useState('')
  const [subject, setSubject] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If input is empty, clear results
    if (!input.trim()) {
      setSubject([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true)

        const res = await axios.get('/api/subject', {
          params: {
            input: input.trim(),
          },
        })

        setSubject(res.data.subject)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }, 500) // Wait 500ms after user stops typing

    // Cleanup previous timer
    return () => clearTimeout(timer)
  }, [input])

  return (
    <div className="flex flex-col items-center p-5">

      <h1 className="text-3xl font-bold text-indigo-500 mb-10">
        Admin Dashboard
      </h1>

      <div className="flex gap-5 items-center flex-wrap">

        <Link
          href="/admin/upload"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Upload Notes & PYQ
        </Link>

        <Link
          href="/admin/view"
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          View Notes
        </Link>

        <input
          type="text"
          placeholder="Search Subjects..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-lg px-3 py-2 w-80"
        />

      </div>

      <div className="w-full max-w-xl mt-8">

        {loading && (
          <p className="text-gray-500">Searching...</p>
        )}

        {!loading &&
          subject.map((sub) => (
            <Link
              key={sub._id}
              href={`/admin/subject/${sub._id}`}
              className="block p-3 border rounded-lg mb-2 bg-main  active:bg-green-600 "
            >
              {sub.subjectName}
            </Link>
          ))}

        {!loading &&
          input.trim() &&
          subject.length === 0 && (
            <p className="text-gray-500">No subjects found.</p>
          )}

      </div>
    </div>
  )
}

export default Page