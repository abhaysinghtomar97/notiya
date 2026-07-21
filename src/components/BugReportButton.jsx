import React from 'react';

export default function BugReportButton() {
  // Replace this placeholder link with your actual Google Form link
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSeDO3TLHkGRXh1OzO6fSLOlaTWAlGnU1-Mp4me_mUxs1g7qAA/viewform";

  return (
    
    <>
    <div className="hidden md:flex fixed top-1/3 right-0 z-50 -translate-y-1/2">
      <a
        href={googleFormLink}
        target="_blank"
        rel="noopener noreferrer"
        // translate-x-[calc(100%-48px)] pushes the button off-screen, leaving exactly 48px (the icon area) visible.
        className="group flex items-center bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-l-full shadow-lg transition-transform duration-300 ease-in-out translate-x-[calc(100%-48px)] hover:translate-x-0 cursor-pointer"
        aria-label="Report Bug or Request Notes"
      >
        {/* Icon Container - Fixed 48px width to match the translate calculation */}
        <div className="flex items-center justify-center w-12 h-12 shrink-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-6 h-6 text-amber-500"
          >
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Button Text - Hidden initially via width/opacity constraints, slides out naturally with the container */}
        <span className="font-semibold text-sm whitespace-nowrap pr-5 pl-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          Report Bug
        </span>
      </a>
    </div>
    </>
  );
}