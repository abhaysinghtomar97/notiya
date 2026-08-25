'use client';
import React, { useState } from 'react';
import { 
  Search, Code, Monitor, BarChart2, 
  Settings, ArrowRight, Menu, Cpu, Briefcase, Database, FlaskConical,
  AlertCircle, CheckCircle2
} from 'lucide-react';

// Base URL configuration (you can change this to empty string '' if you want to use relative paths)
const BASE_URL = 'https://www.notiya.in';

const defaultData = [
  {
    id: 'btech-cse',
    title: 'B.Tech Computer Science (CSE)',
    code: 'CSE',
    description: 'Data Structures, Algorithms, OS, DBMS, Web Tech, Compiler Design & Automata.',
    tags: ['DSA', 'COA', 'OS', 'DBMS', 'TAFL', 'DAA'],
    icon: Code,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-100',
    category: 'B.Tech - CS & IT',
    buttonText: 'Explore CSE Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/psit/btech/CSE`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/btech/1st-year/CSE` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/btech/2nd-year/CSE` },
     
    ]
  },
  {
    id: 'btech-aiml',
    title: 'B.Tech CSE (AI & ML)',
    code: 'CS-AIML',
    description: 'Neural Networks, Deep Learning, NLP, Python for AI, Computer Vision & Pattern Recognition.',
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Python AI'],
    icon: Monitor,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    category: 'B.Tech - CS & IT',
    buttonText: 'Explore AI & ML Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/psit/btech/CS-AIML`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/btech/1st-year/CS-AIML` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/btech/2nd-year/CS-AIML` },
     
    ]
  },
  {
    id: 'btech-ds',
    title: 'B.Tech CSE (Data Science)',
    code: 'CS-DS',
    description: 'Big Data Analytics, Statistical Inference, Data Mining, Hadoop, Spark & Business Intelligence.',
    tags: ['Data Mining', 'Statistics', 'Big Data', 'Visualization'],
    icon: BarChart2,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
    category: 'B.Tech - CS & IT',
    buttonText: 'Explore Data Science Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/psit/btech/CS-DS`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/btech/1st-year/CS-DS` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/btech/2nd-year/CS-DS` },
      
    ]
  },
  {
    id: 'btech-it',
    title: 'B.Tech Information Tech (IT)',
    code: 'IT',
    description: 'Web Development, Networking, Cloud Computing, Cyber Security, and Software Engineering.',
    tags: ['Cloud', 'Cyber Security', 'Web Dev', 'Networks'],
    icon: Database,
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-100',
    category: 'B.Tech - CS & IT',
    buttonText: 'Explore IT Vault',
    isAvailable: true, 
    mainLink: `${BASE_URL}/study-material/psit/btech/IT`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/btech/1st-year/IT` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/btech/2nd-year/IT` },
     
    ]
  },
  {
    id: 'btech-ece',
    title: 'B.Tech Electronics (ECE)',
    code: 'ECE',
    description: 'Analog Circuits, Digital Electronics, Microprocessors, Signals & Systems, Communication.',
    tags: ['VLSI', 'Microprocessors', 'IoT', 'Signals'],
    icon: Cpu,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
    category: 'B.Tech - Core',
    buttonText: 'Explore ECE Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/psit/btech/ECE`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/btech/1st-year/ECE` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/btech/2nd-year/ECE` },
    
    ]
  },
  {
    id: 'mba',
    title: 'Master of Business Admin (MBA)',
    code: 'MBA',
    description: 'Marketing, Finance, Human Resources, Operations, and Business Analytics.',
    tags: ['Marketing', 'Finance', 'HR', 'Analytics'],
    icon: Briefcase,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
    category: 'Postgraduate',
    buttonText: 'Explore MBA Vault',
    isAvailable: false, 
    mainLink: `${BASE_URL}/study-material/psit/mba/MBA`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/mba/1st-year/MBA` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/mba/2nd-year/MBA` },
    ]
  },
  {
    id: 'mca',
    title: 'Master of Computer Apps (MCA)',
    code: 'MCA',
    description: 'Advanced Data Structures, Software Engineering, Cloud Architecture, and Enterprise Computing.',
    tags: ['Enterprise Java', 'Cloud', 'Software Eng'],
    icon: Monitor,
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-100',
    category: 'Postgraduate',
    buttonText: 'Explore MCA Vault',
    isAvailable: false,
    mainLink: `${BASE_URL}/study-material/psit/mca/MCA`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/psit/mca/1st-year/MCA` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/psit/mca/2nd-year/MCA` },
    ]
  },
  
];

const categories = [
  'All Programs',
  'B.Tech - CS & IT',
  'B.Tech - Core',
  'Postgraduate',
  'Pharmacy'
];

const PsitResources = ({ data = defaultData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Programs');

  // Filter data based on search and category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory.includes('All') || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full py-12 min-h-screen font-sans bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
            Explore All PSIT Programs
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-gray-600">
            Comprehensive study vaults with handwritten notes, Quantum series equivalents, solved papers, and syllabus schemes categorized for every PSIT discipline.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-gray-200 hover:border-amber-500 rounded-full focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors outline-none shadow-sm"
            placeholder="Search program (e.g. CSE, CS-AIML, MBA, Pharmacy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600 shadow-sm'
              }`}
            >
              {category.includes('All') && <Menu size={16} />}
              {category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((program) => {
            const IconComponent = program.icon;
            
            return (
              <div 
                key={program.id} 
                className={`bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col h-full ${
                  program.isAvailable 
                    ? 'border-gray-100 shadow-sm hover:shadow-lg' 
                    : 'border-gray-200 opacity-90'
                }`}
              >
                
                {/* Card Header (Icon + Badges) */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-lg ${program.isAvailable ? program.iconBg : 'bg-gray-100'} ${program.isAvailable ? program.iconColor : 'text-gray-400'}`}>
                    <IconComponent size={22} />
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {/* Availability Badge */}
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      program.isAvailable 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {program.isAvailable ? (
                        <><CheckCircle2 size={12} /> Available</>
                      ) : (
                        <><AlertCircle size={12} /> Coming Soon</>
                      )}
                    </div>
                    
                    {/* Code Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-200">
                      <span className={`w-1.5 h-1.5 rounded-full ${program.isAvailable ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                      CODE: {program.code}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className={`text-xl font-bold mb-2 font-serif ${program.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
                  {program.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 min-h-[60px] leading-relaxed">
                  {program.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 min-h-[50px]">
                  {program.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-md text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="mt-auto"></div>

                {/* Year Links (Clickable or Disabled) */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {program.years.map((year, i) => (
                    program.isAvailable ? (
                      <a 
                        key={i} 
                        href={year.link}
                        className="flex items-center justify-center py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all cursor-pointer"
                      >
                        {year.label}
                      </a>
                    ) : (
                      <span
                        key={i} 
                        className="flex items-center justify-center py-2 text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 rounded-lg cursor-not-allowed"
                      >
                        {year.label}
                      </span>
                    )
                  ))}
                </div>

                {/* Main Action Button */}
                {program.isAvailable ? (
                  <a 
                    href={program.mainLink}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    {program.buttonText}
                    <ArrowRight size={18} />
                  </a>
                ) : (
                  <button 
                    
                    className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-400 font-semibold py-3 px-4 rounded-xl  cursor-pointer hover:bg-amber-600 hover:text-white"
                  >
                 <a href="mailto:?subject=Request%20Notes">Request Fast (Click)</a>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 py-16 bg-white rounded-2xl border border-gray-200 shadow-sm mt-8">
            <p className="text-lg">No programs found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All Programs');}}
              className="mt-4 text-amber-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsitResources;