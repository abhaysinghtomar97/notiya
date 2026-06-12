'use client'
import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
    // ==========================================
    // 1. DATA FETCHING & INDEPENDENT STATES
    // ==========================================
    const router = useRouter();
    const [notesData, setNotesData] = useState([])
    const [pyqData, setPyqData] = useState([])

    const [isLoadingNotes, setIsLoadingNotes] = useState(true)
    const [isLoadingPyqs, setIsLoadingPyqs] = useState(true)

    const [notesError, setNotesError] = useState(null)
    const [pyqError, setPyqError] = useState(null)

    useEffect(() => {
        // Fetch Notes independently
        const fetchNotes = async () => {
            try {
                const response = await axios.get('/api/notes')
                setNotesData(response.data?.data || [])
            } catch (err) {
                console.error("Notes Fetch Error: ", err)
                setNotesError("Failed to load notes.")
            } finally {
                setIsLoadingNotes(false)
            }
        }

        // Fetch PYQs independently
        const fetchPyqs = async () => {
            try {
                const response = await axios.get('/api/pyq')
                setPyqData(response.data?.data || [])
            } catch (err) {
                console.error("PYQ Fetch Error: ", err)
                setPyqError("Failed to load PYQs.")
            } finally {
                setIsLoadingPyqs(false)
            }
        }

        // Execute both requests in parallel
        fetchNotes()
        fetchPyqs()
    }, [])


    // ==========================================
    // 2. NOTES LOGIC (Dependency: Branch -> Year)
    // ==========================================
    const [noteBranch, setNoteBranch] = useState('')
    const [noteYear, setNoteYear] = useState('')

    // Synchronous reset to prevent invalid state lagging
    useEffect(() => { setNoteYear('') }, [noteBranch])

    const availableNoteBranches = useMemo(() =>
        [...new Set(notesData.map(n => n.branch).filter(Boolean))],
        [notesData])

    const availableNoteYears = useMemo(() => {
        if (!noteBranch) return []
        const filtered = notesData.filter(n => n.branch === noteBranch)
        return [...new Set(filtered.map(n => n.year).filter(Boolean))].sort()
    }, [notesData, noteBranch])

    const displayNotes = useMemo(() => {
        if (!noteBranch || !noteYear) return []
        return notesData.filter(n => n.branch === noteBranch && String(n.year) === String(noteYear))
    }, [notesData, noteBranch, noteYear])


    // ==========================================
    // 3. PYQ LOGIC (Dependency: Branch -> Subject)
    // ==========================================
    const [pyqBranch, setPyqBranch] = useState('')
    const [pyqSubject, setPyqSubject] = useState('')

    // Synchronous reset to prevent invalid state lagging
    useEffect(() => { setPyqSubject('') }, [pyqBranch])

    const availablePyqBranches = useMemo(() =>
        [...new Set(pyqData.map(p => p.branch).filter(Boolean))],
        [pyqData])

    const availablePyqSubjects = useMemo(() => {
        if (!pyqBranch) return []
        const filtered = pyqData.filter(p => p.branch === pyqBranch)
        return [...new Set(filtered.map(p => p.subject).filter(Boolean))].sort()
    }, [pyqData, pyqBranch])

    const displayPyqs = useMemo(() => {
        if (!pyqBranch || !pyqSubject) return []
        return pyqData.filter(p => p.branch === pyqBranch && p.subject === pyqSubject)
    }, [pyqData, pyqBranch, pyqSubject])


    // ==========================================
    // RENDER UI (Dark/Minimalist Theme)
    // ==========================================
    return (
        <div className='  flex flex-col items-center p-6 min-h-screen bg-gray-950 text-gray-200 font-sans tracking-wide'>
            <h1 className='text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tight'>
                SYSTEM // RESOURCES
            </h1>
            
                <button 
            className='mr-auto hover:cursor-pointer hover:text-amber-950'
            type="button" onClick={() => router.back()}>
                Go Back
            </button>
            

            <div className='flex flex-col xl:flex-row w-full max-w-7xl gap-8'>

                {/* --------------------------------------------------- */}
                {/* SECTION A: NOTES TERMINAL                           */}
                {/* --------------------------------------------------- */}
                <div className='flex-1 p-8 rounded-xl bg-gray-900 border border-gray-800 shadow-[0_0_15px_rgba(34,211,238,0.05)] relative overflow-hidden'>
                    {/* Cyberpunk accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75"></div>

                    <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Course Notes
                    </h2>

                    {isLoadingNotes ? (
                        <div className="text-cyan-400 animate-pulse font-mono text-sm">Initializing Note Data...</div>
                    ) : notesError ? (
                        <div className="text-red-400 bg-red-950/30 p-3 rounded border border-red-500/20 text-sm">{notesError}</div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-5 mb-8">
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='note-branch' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Branch</label>
                                    <select
                                        id="note-branch"
                                        value={noteBranch}
                                        onChange={(e) => setNoteBranch(e.target.value)}
                                        className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all'
                                    >
                                        <option value="">-- Awaiting Input --</option>
                                        {availableNoteBranches.map((branch, idx) => (
                                            <option key={idx} value={branch}>{branch}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='note-year' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Year</label>
                                    <select
                                        id="note-year"
                                        value={noteYear}
                                        onChange={(e) => setNoteYear(e.target.value)}
                                        disabled={!noteBranch}
                                        className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        <option value="">{!noteBranch ? "Requires Branch Target" : "-- Awaiting Input --"}</option>
                                        {availableNoteYears.map((year, idx) => (
                                            <option key={idx} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {!noteBranch || !noteYear ? (
                                    <p className="text-gray-500 text-sm font-mono border-l-2 border-gray-700 pl-3">Awaiting valid query parameters...</p>
                                ) : displayNotes.length > 0 ? (
                                    displayNotes.map((note, index) => (
                                        <div className='bg-gray-950 border border-gray-800 p-5 rounded-lg hover:border-cyan-500/50 transition-colors group' key={index}>
                                            <p className="text-xs text-cyan-400 font-mono mb-1">{note.subject}</p>
                                            <p className="font-semibold text-gray-100 mb-3">{note.title}</p>
                                            <a href={note.url} target="_blank" rel="noreferrer" className="inline-block text-xs font-bold bg-cyan-950 text-cyan-300 px-3 py-1.5 rounded hover:bg-cyan-900 transition-colors">
                                                ACCESS FILE
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm font-mono border-l-2 border-red-900 pl-3">ERR: No notes match query.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* --------------------------------------------------- */}
                {/* SECTION B: PYQ TERMINAL                             */}
                {/* --------------------------------------------------- */}
                <div className='flex-1 p-8 rounded-xl bg-gray-900 border border-gray-800 shadow-[0_0_15px_rgba(16,185,129,0.05)] relative overflow-hidden'>
                    {/* Cyberpunk accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-75"></div>

                    <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Previous Year Questions
                    </h2>

                    {isLoadingPyqs ? (
                        <div className="text-emerald-400 animate-pulse font-mono text-sm">Initializing PYQ Data...</div>
                    ) : pyqError ? (
                        <div className="text-red-400 bg-red-950/30 p-3 rounded border border-red-500/20 text-sm">{pyqError}</div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-5 mb-8">
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='pyq-branch' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Branch</label>
                                    <select
                                        id="pyq-branch"
                                        value={pyqBranch}
                                        onChange={(e) => setPyqBranch(e.target.value)}
                                        className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
                                    >
                                        <option value="">-- Awaiting Input --</option>
                                        {availablePyqBranches.map((branch, idx) => (
                                            <option key={idx} value={branch}>{branch}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='pyq-subject' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Subject</label>
                                    <select
                                        id="pyq-subject"
                                        value={pyqSubject}
                                        onChange={(e) => setPyqSubject(e.target.value)}
                                        disabled={!pyqBranch}
                                        className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        <option value="">{!pyqBranch ? "Requires Branch Target" : "-- Awaiting Input --"}</option>
                                        {availablePyqSubjects.map((subject, idx) => (
                                            <option key={idx} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {!pyqBranch || !pyqSubject ? (
                                    <p className="text-gray-500 text-sm font-mono border-l-2 border-gray-700 pl-3">Awaiting valid query parameters...</p>
                                ) : displayPyqs.length > 0 ? (
                                    displayPyqs.map((pyq, index) => (
                                        <div className='bg-gray-950 border border-gray-800 p-5 rounded-lg hover:border-emerald-500/50 transition-colors group' key={index}>
                                            <p className="text-xs text-emerald-400 font-mono mb-1">Year: {pyq.year}</p>
                                            <p className="font-semibold text-gray-100 mb-3">{pyq.title}</p>
                                            <a href={pyq.url} target="_blank" rel="noreferrer" className="inline-block text-xs font-bold bg-emerald-950 text-emerald-300 px-3 py-1.5 rounded hover:bg-emerald-900 transition-colors">
                                                ACCESS EXAM
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm font-mono border-l-2 border-red-900 pl-3">ERR: No PYQs match query.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Page