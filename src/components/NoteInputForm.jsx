import React from 'react'

const NoteInputForm = ({note , handleNoteInput}) => {
  return (
    <div>

        <div className=' border-dotted border-2 p-10 min-w-4/5  mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 justify-center items-center'>
                    <label htmlFor="title">Title</label>
                    <input
                        id='title'
                        name='title'
                        value={note.title}
                        onChange={handleNoteInput}
                        type="text"
                    />
                    <label htmlFor="branch">Branch</label>
<select
  id="branch"
  name="branch"
  value={note.branch}
  onChange={handleNoteInput}
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

<label htmlFor="year">Year</label>
<select
  id="year"
  name="year"
  value={note.year}
  onChange={handleNoteInput}
  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
>
  <option value="">Select Year</option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>
                    <label htmlFor="subject">Subject</label>
                    <input
                        id='subject'
                        name='subject'
                        value={note.subject}
                        onChange={handleNoteInput}
                        type="text" />
                    <label htmlFor="subject">Subject Code</label>
                    <input
                        id='subjectCode'
                        name='subjectCode'
                        value={note.subjectCode}
                        onChange={handleNoteInput}
                        type="text" />

                    <label htmlFor="unit">Unit</label>
                    <input
                        id='unit'
                        name='unit'
                        value={note.unit}
                        onChange={handleNoteInput}
                        type="text" />

                    <label htmlFor="url">URL</label>
                    <input
                        id='url'
                        name='url'
                        value={note.url}
                        onChange={handleNoteInput}
                        type="text" />
                    <label htmlFor="type">Type</label>
                    <input
                        id='type'
                        name='type'
                        value={note.type}
                        onChange={handleNoteInput}
                        type="text" />


                </div>
    </div>
  )
}

export default NoteInputForm