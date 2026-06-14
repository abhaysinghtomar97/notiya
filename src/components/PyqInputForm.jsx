import React from 'react'

const PyqInputForm = ({pyq, handlePyqInput}) => {
  return (
    <div>
         <div className=' border-dotted border-2 p-10 min-w-4/5  mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 justify-center items-center'>
                    <label htmlFor="ptitle">Title</label>
                    <input
                        id='ptitle'
                        name='title'
                        value={pyq.title}
                        onChange={handlePyqInput}
                        type="text"
                    />
                    <label htmlFor="branch" className="text-white">
  Branch
</label>

<select
  id="branch"
  name="branch"
  value={pyq.branch}
  onChange={handlePyqInput}
  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
>
  <option value="">Select Branch</option>
  <option value="CSE">CSE</option>
  <option value="CS">CS</option>
  <option value="IT">IT</option>
  <option value="ECE">ECE</option>
  <option value="CS-AI">CS-AI</option>
  <option value="CS-AIML">CS-AIML</option>
</select>

<label htmlFor="pyear" className="text-white">
  Year
</label>

<select
  id="pyear"
  name="year"
  value={pyq.year}
  onChange={handlePyqInput}
  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
>
  <option value="">Select Year</option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>
                    <label htmlFor="psubject">Subject</label>
                    <input
                        id='psubject'
                        name='subject'
                        value={pyq.subject}
                        onChange={handlePyqInput}
                        type="text" />
                    <label htmlFor="psubjectCode">Subject Code</label>
                    <input
                        id='psubjectCode'
                        name='subjectCode'
                        value={pyq.subjectCode}
                        onChange={handlePyqInput}
                        type="text" />


                    <label htmlFor="purl">URL</label>
                    <input
                        id='purl'
                        name='url'
                        value={pyq.url}
                        onChange={handlePyqInput}
                        type="text" />
                </div>
    </div>
  )
}

export default PyqInputForm