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
                    <label htmlFor="branch">Branch</label>
                    <input
                        id='branch'
                        name='branch'
                        value={pyq.branch}
                        onChange={handlePyqInput}
                        type="text" />
                    <label htmlFor="pyear">Year</label>
                    <input
                        id='pyear'
                        name='year'
                        value={pyq.year}
                        onChange={handlePyqInput}
                        type="text" />
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