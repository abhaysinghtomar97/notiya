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
                    <input
                        id='branch'
                        name='branch'
                        value={note.branch}
                        onChange={handleNoteInput}
                        type="text" />
                    <label htmlFor="semester">Year</label>
                    <input
                        id='year'
                        name='year'
                        value={note.year}
                        onChange={handleNoteInput}
                        type="text" />
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