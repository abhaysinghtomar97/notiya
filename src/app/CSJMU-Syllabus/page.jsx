import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SyllabusPage = () => {
  const courses = [
    {
      title: 'BBA',
      href: '/CSJMU-Syllabus/BBA',
      image: '/BBA-syllabus.png', 
      description: 'Bachelor of Business Administration',
      accent: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:border-cyan-500',
      textAccent: 'text-cyan-200', 
    },
    {
      title: 'BCA',
      href: '/CSJMU-Syllabus/BCA',
      image: '/BCA-syllabus.png', // Fixed missing leading slash
      description: 'Bachelor of Computer Applications',
      accent: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:border-purple-500',
      textAccent: 'text-purple-300',
    },
  ];

  return (
    // Updated background to match the light beige from the screenshot
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-sans">
      
      {/* Header matched to the UI */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-500 tracking-[0.15em] uppercase">
         CSJMU  SYLLABUS 
        </h1>
        <div className="h-[3px] w-16 bg-slate-700 mx-auto mt-6"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {courses.map((course) => (
          <Link href={course.href} key={course.title} className="group outline-none">
            
            {/* Card Container */}
            <div className={`relative h-[400px] flex flex-col overflow-hidden rounded-xl bg-[#E9AD72]  border border-gray-500 transition-all duration-500 ease-out ${course.accent}`}>
              
              {/* Image Section (Top Half) */}
              <div className="relative h-[55%] w-full overflow-hidden bg-gray-900">
                {/* FIXED: Changed href to src, added fill prop */}
                <Image
                  src={course.image}
                  alt={`${course.title} Syllabus`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-70 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                {/* Dark gradient overlay to match the image's top section */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              </div>

              {/* Text Section (Bottom Half) - Matches the orange background in the UI */}
              <div className="relative p-8 z-10 flex flex-col flex-grow bg-[#E9AD72]">
                <h2 className="text-4xl font-bold text-white tracking-widest mb-1 drop-shadow-sm">
                  {course.title}
                </h2>
                <p className="text-white/70 text-sm mb-6 flex-grow font-medium">
                  {course.description}
                </p>
                
                {/* Futuristic Call to Action */}
                <div className={`mt-auto flex items-center text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-300 ${course.textAccent}`}>
                  <span>Explore</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}

export default SyllabusPage;