'use client'
import NoteInputForm from '@/Components/NoteInputForm';
import PyqInputForm from '@/Components/PyqInputForm';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const [pyqLoading, setPyqLoading] = useState(false);
    const [noteLoading, setnoteLoading] = useState(false);

    const [note, setnote] = useState({
        title: '',
        branch: '',
        subjectCode: '',
        year: '',
        subject: '',
        unit: '',
        url: '',
        type: ''
    })
    const [pyq, setpyq] = useState({
        title: '',
        branch: '',
        subjectCode: '',
        year: '',
        subject: '',
        url: ''
    })

    const handleSubmitPyq = async () => {
        try {
            setPyqLoading(true);

            if (!pyq.title || !pyq.branch || !pyq.subjectCode || !pyq.year || !pyq.subject ||  !pyq.url ) {
                toast.error("All Fields Are Required to Filled")
                return
            }

            const res = await axios.post('/api/pyq', pyq)

            if (res.data.success === true) {
                toast.success(`PYQ of ${res.data.pyq.title} Uploaded`)
                return

            }

        } catch (error) {
            console.log("Submit Error : ", error)
            toast.error(error)
            return
        } finally {
            setPyqLoading(false)
        }
    }
    const handleSubmitNote = async () => {
        try {
            setnoteLoading(true);

            if (!note.title || !note.branch || !note.subjectCode || !note.year || !note.subject || !note.unit || !note.url || !note.type) {
                toast.error("All Fields Are Required to Fill")
                return
            }

            const res = await axios.post('/api/notes', note)

            if (res.data.success === true) {
                toast.success(`Notes of ${res.data.notes.title} Uploaded`)
                return

            }

        } catch (error) {
            console.log("Submit Error : ", error)
            toast.error(error)
            return
        } finally {
            setnoteLoading(false)
        }
    }

    const handleNoteInput = (e) => (
        setnote((prev) => (
            { ...prev, [e.target.name]: e.target.value, }
        ))
    )
    const handlePyqInput = (e) => (
        setpyq((prev) => (
            { ...prev, [e.target.name]: e.target.value, }
        ))
    )



    return (
        <div className='flex flex-col justify-center items-center p-3 relative'>
            <Toaster
        position="top-center"
        reverseOrder={false}
      />
           
            <div className='flex flex-col justify-center items-center'>

                <p className='mt-10 font-semibold   top-10 left-4 md:left-40'>Upload Notes</p>
                <NoteInputForm note={note}  handleNoteInput={handleNoteInput } />
                <button
                    disabled={noteLoading}
                    className='bg-blue-700  mt-2  py-2 px-4 rounded hover:bg-blue-900 cursor-pointer'
                    onClick={handleSubmitNote} >
                    {(noteLoading) ? 'Submitting..' : 'Submit'}
                </button>

            </div>

            <div className="w-full h-px bg-gray-500 my-4"></div>

             <div className='flex flex-col justify-center items-center'>
                <p className='mt-10 font-semibold   top-10 left-4 md:left-40'>Upload PYQ</p>
                 <PyqInputForm pyq={pyq} handlePyqInput={handlePyqInput} />

                <button
                    disabled={pyqLoading}
                    className='bg-blue-700  mt-2  py-2 px-4 rounded hover:bg-blue-900 cursor-pointer'
                    onClick={handleSubmitPyq}>
                    {(pyqLoading) ? 'Submitting..' : 'Submit'}
                </button>

            </div>

        </div>
    )
}

export default page