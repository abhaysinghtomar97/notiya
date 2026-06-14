'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Hardcoded Default Options
const CONSTANTS = {
    BRANCHES: ['ECE', 'CS', 'CE-AI', 'CS-AIML'],
    YEARS: ['1', '2', '3', '4']
};

const Page = () => {
    const router = useRouter();

    // ==========================================
    // 1. NOTES LOGIC (Fetch on Year + Branch select)
    // ==========================================
    const [noteBranch, setNoteBranch] = useState('');
    const [noteYear, setNoteYear] = useState('');
    const [notesData, setNotesData] = useState([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [notesError, setNotesError] = useState(null);

    useEffect(() => {
        // Only fetch if both parameters are selected
        if (!noteBranch || !noteYear) {
            setNotesData([]);
            return;
        }

        const controller = new AbortController(); // Prevents race conditions on rapid clicking

        const fetchNotes = async () => {
            setNotesLoading(true);
            setNotesError(null);
            try {
                const response = await axios.get(`/api/notes/${noteYear}/${noteBranch}`, {
                    signal: controller.signal
                });
                // Fallback gracefully depending on how your API structures its JSON payload
                console.log(response.data.data)
                setNotesData(response.data?.data || response.data || []);
            } catch (error) {
                if (axios.isCancel(error)) return; // Ignore aborted requests
                console.error('Notes fetch error:', error);
                setNotesError('Failed to load notes from the server.');
                setNotesData([]);
            } finally {
                setNotesLoading(false);
            }
        };

        fetchNotes();

        return () => controller.abort(); // Cleanup pending requests on parameter change
    }, [noteBranch, noteYear]);


    // ==========================================
    // 2. PYQ LOGIC (Fetch on Year + Branch select)
    // ==========================================
    const [pyqBranch, setPyqBranch] = useState('');
    const [pyqYear, setPyqYear] = useState('');
    const [pyqData, setPyqData] = useState([]);
    const [pyqLoading, setPyqLoading] = useState(false);
    const [pyqError, setPyqError] = useState(null);

    useEffect(() => {
        // Only fetch if both parameters are selected
        if (!pyqBranch || !pyqYear) {
            setPyqData([]);
            return;
        }

        const controller = new AbortController();

        const fetchPyqs = async () => {
            setPyqLoading(true);
            setPyqError(null);
            try {
                const response = await axios.get(`/api/pyq/${pyqYear}/${pyqBranch}`, {
                    signal: controller.signal
                });
                setPyqData(response.data?.data || response.data || []);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error('PYQ fetch error:', error);
                setPyqError('Failed to load PYQs from the server.');
                setPyqData([]);
            } finally {
                setPyqLoading(false);
            }
        };

        fetchPyqs();

        return () => controller.abort();
    }, [pyqBranch, pyqYear]);


    // ==========================================
    // RENDER UI (Dark/Minimalist Theme)
    // ==========================================
    return (
        <div className='flex flex-col items-center p-6 min-h-screen dark:bg-gray-950 text-gray-200 font-sans tracking-wide'>
            <h1 className='text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-amber-400 tracking-tight'>
                RESOURCES
            </h1>

            <button
                className='mr-auto mb-6 rounded-lg border dark:text-gray-100 text-amber-800 border-gray-700 px-4 py-2 text-sm hover:bg-gray-800 transition'
                type="button" 
                onClick={() => router.back()}
            >
                Go Back
            </button>

            <div className='flex flex-col xl:flex-row w-full max-w-7xl gap-8'>

                {/* --------------------------------------------------- */}
                {/* SECTION A: NOTES TERMINAL                           */}
                {/* --------------------------------------------------- */}
                <div className='flex-1 p-8 rounded-xl dark:bg-gray-900 border border-gray-800 shadow-[0_0_15px_rgba(34,211,238,0.05)] relative overflow-hidden'>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75"></div>

                    <h2 className="text-2xl font-bold dark:text-gray-100 text-amber-800 mb-6 flex items-center gap-2">
                        
                        Notes
                    </h2>
                    
                    <p className="text-sm text-gray-400 mb-4">
                        {notesData.length > 0 ? `${notesData.length} resources found` : 'Select parameters to fetch'}
                    </p>

                    <div className="flex flex-col gap-5 mb-8">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='note-year' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Year</label>
                            <select
                                id="note-year"
                                value={noteYear}
                                onChange={(e) => setNoteYear(e.target.value)}
                                className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all'
                            >
                                <option value="">-- Select Year --</option>
                                {CONSTANTS.YEARS.map(year => (
                                    <option key={`ny-${year}`} value={year}>Year {year}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='note-branch' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Branch</label>
                            <select
                                id="note-branch"
                                value={noteBranch}
                                onChange={(e) => setNoteBranch(e.target.value)}
                                className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all'
                            >
                                <option value="">-- Select Branch --</option>
                                {CONSTANTS.BRANCHES.map(branch => (
                                    <option key={`nb-${branch}`} value={branch}>{branch}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {notesLoading ? (
                            <div className="text-cyan-400 animate-pulse font-mono text-sm">Querying database...</div>
                        ) : notesError ? (
                            <div className="text-red-400 bg-red-950/30 p-3 rounded border border-red-500/20 text-sm">{notesError}</div>
                        ) : !noteBranch || !noteYear ? (
                            <p className="text-gray-500 text-sm font-mono border-l-2 border-gray-700 pl-3">Awaiting valid query parameters...</p>
                        ) : notesData.length > 0 ? (
                            notesData.map((note, index) => (
                                <div className='bg-gray-950 border border-gray-800 p-5 rounded-lg hover:border-cyan-500/50 transition-colors group' key={note._id || index}>
                                    <p className="text-xs text-cyan-400 font-mono mb-1">{note.subject}</p>
                                    <p className="font-semibold text-gray-100 mb-3">{note.title}</p>
                                    <a href={note.url} target="_blank" rel="noreferrer" className="inline-block text-xs font-bold bg-cyan-950 text-cyan-300 px-3 py-1.5 rounded hover:bg-cyan-900 transition-colors">
                                        ACCESS FILE
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm font-mono border-l-2 border-cyan-900 pl-3">No notes found for this Year and Branch.</p>
                        )}
                    </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* SECTION B: PYQ TERMINAL                             */}
                {/* --------------------------------------------------- */}
                <div className='flex-1 p-8 rounded-xl dark:bg-gray-900 border border-gray-800 shadow-[0_0_15px_rgba(16,185,129,0.05)] relative overflow-hidden'>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-75"></div>

                    <h2 className="text-2xl font-bold  dark:text-gray-100 text-amber-800 mb-6 flex items-center gap-2">
                        
                        Previous Year Questions
                    </h2>

                    <p className="text-sm text-gray-400 mb-4">
                        {pyqData.length > 0 ? `${pyqData.length} resources found` : 'Select parameters to fetch'}
                    </p>

                    <div className="flex flex-col gap-5 mb-8">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='pyq-year' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Year</label>
                            <select
                                id="pyq-year"
                                value={pyqYear}
                                onChange={(e) => setPyqYear(e.target.value)}
                                className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
                            >
                                <option value="">-- Select Year --</option>
                                {CONSTANTS.YEARS.map(year => (
                                    <option key={`py-${year}`} value={year}>Year {year}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='pyq-branch' className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Select Branch</label>
                            <select
                                id="pyq-branch"
                                value={pyqBranch}
                                onChange={(e) => setPyqBranch(e.target.value)}
                                className='p-3 bg-gray-950 border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
                            >
                                <option value="">-- Select Branch --</option>
                                {CONSTANTS.BRANCHES.map(branch => (
                                    <option key={`pb-${branch}`} value={branch}>{branch}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {pyqLoading ? (
                            <div className="text-emerald-400 animate-pulse font-mono text-sm">Querying database...</div>
                        ) : pyqError ? (
                            <div className="text-red-400 bg-red-950/30 p-3 rounded border border-red-500/20 text-sm">{pyqError}</div>
                        ) : !pyqBranch || !pyqYear ? (
                            <p className="text-gray-500 text-sm font-mono border-l-2 border-gray-700 pl-3">Awaiting valid query parameters...</p>
                        ) : pyqData.length > 0 ? (
                            pyqData.map((pyq, index) => (
                                <div className='bg-gray-950 border border-gray-800 p-5 rounded-lg hover:border-emerald-500/50 transition-colors group' key={pyq._id || index}>
                                    <p className="text-xs text-emerald-400 font-mono mb-1">{pyq.subject}</p>
                                    <p className="font-semibold text-gray-100 mb-3">{pyq.title}</p>
                                    <a href={pyq.url} target="_blank" rel="noreferrer" className="inline-block text-xs font-bold bg-emerald-950 text-emerald-300 px-3 py-1.5 rounded hover:bg-emerald-900 transition-colors">
                                        ACCESS EXAM
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm font-mono border-l-2 border-emerald-900 pl-3">No PYQs found for this Year and Branch.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;