'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function SupportPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent showing repeatedly in the same session
    const hasSeenPopup = sessionStorage.getItem('notiya_support_seen');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('notiya_support_seen', 'true');
    }, 1000); // 10 seconds 
 
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-zinc-900 dark:text-white">
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          ✕
        </button>

        <div className="mb-3 flex justify-center  text-3xl">☕<Image src={'/daalchini_logo.png'} height={50} width={100} alt='daalchini' ></Image></div>
        <h3 className="mb-2 text-lg font-semibold">
          Buy me a Coffee or DaalChini
        </h3>
        <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
          Enjoying Notiya? Keep the servers running and the late-night coding fueled!
        </p>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href="https://your-coffee-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center rounded-xl bg-amber-500 px-10 py-4.5 text-sm font-medium text-white transition hover:bg-amber-600"
          >
            <Image src={'/coffee-scaled.png'} height={50} width={50} alt='coffee' ></Image> 
           
          </a>
          <a
            href="/support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex rounded-xl justify-center  bg-emerald-600 px-10 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
             <Image src={'/daalchini_logo.png'} height={50} width={100} alt='daalchini' ></Image> 
             </a>
        </div>
      </div>
    </div>
  );
}