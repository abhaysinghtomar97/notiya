'use client';
import React, { useState } from 'react';
import { 
  Search, Code, Monitor, BarChart2, 
  Globe, Zap, Settings, ArrowRight, Menu, 
  Database, Cpu, Wrench, Building2, FlaskConical, AlertCircle, CheckCircle2
} from 'lucide-react';

// Base URL configuration
const BASE_URL = 'https://www.notiya.in';

const defaultData = [
  {
    id: 'cse',
    title: 'Computer Science (CSE)',
    code: '010',
    description: 'Data Structures, Algorithms, OS, DBMS, Web Tech, Compiler Design & Automata.',
    tags: ['DSA', 'COA', 'OS', 'DBMS', 'TAFL', 'DAA'],
    icon: Code,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-100',
    category: 'Computer Science & IT',
    buttonText: 'Explore CSE Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/aktu/btech/CSE`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/CSE` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/CSE` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/CSE` },
      { label: '4th Yr', link: `${BASE_URL}/study-material/aktu/btech/4th-year/CSE` },
    ]
  },
  {
    id: 'cse-aiml',
    title: 'CSE (AI & ML)',
    code: '153',
    description: 'Neural Networks, Deep Learning, NLP, Python for AI, Computer Vision & Pattern Recognition.',
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Python AI'],
    icon: Monitor,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    category: 'Computer Science & IT',
    buttonText: 'Explore AI & ML Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/aktu/btech/CS-AIML`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/CS-AIML` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/CS-AIML` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/CS-AIML` },
     
    ]
  },
  {
    id: 'cse-ds',
    title: 'CSE (Data Science)',
    code: '154',
    description: 'Big Data Analytics, Statistical Inference, Data Mining, Hadoop, Spark & Business Intelligence.',
    tags: ['Data Mining', 'Statistics', 'Big Data', 'Visualization'],
    icon: BarChart2,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
    category: 'Computer Science & IT',
    buttonText: 'Explore Data Science Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/aktu/btech/CS-DS`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/CS-DS` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/CS-DS` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/CS-DS` },
     
    ]
  },
  {
    id: 'it',
    title: 'Information Tech (IT)',
    code: '013',
    description: 'Web Technologies, Cryptography, Cloud Computing, Software Engineering & Network Security.',
    tags: ['Web Dev', 'Cloud', 'Cryptography', 'Networks'],
    icon: Database,
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-100',
    category: 'Computer Science & IT',
    buttonText: 'Explore IT Vault',
    isAvailable: true, 
    mainLink: `${BASE_URL}/study-material/aktu/btech/IT`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/IT` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/IT` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/IT` },
      
    ]
  },
  {
    id: 'ece',
    title: 'Electronics & Comm. (ECE)',
    code: '031',
    description: 'Analog/Digital Circuits, Microprocessors, Signals & Systems, VLSI Design, Control Systems.',
    tags: ['VLSI', 'Microprocessors', 'Signals', 'Control Sys'],
    icon: Cpu,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
    category: 'Electronics & Electrical',
    buttonText: 'Explore ECE Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/aktu/btech/ECE`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/ECE` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/ECE` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/ECE` },
     
    ]
  },
  {
    id: 'en',
    title: 'Electrical Engineering (EN)',
    code: '021',
    description: 'Power Systems, Electrical Machines, Network Analysis, Power Electronics, Control Systems.',
    tags: ['Power Sys', 'Machines', 'Circuits', 'Power Elec'],
    icon: Zap,
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-100',
    category: 'Electronics & Electrical',
    buttonText: 'Explore EN Vault',
    isAvailable: false,
    mainLink: `${BASE_URL}/study-material/aktu/btech/EN`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/EN` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/EN` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/EN` },
      { label: '4th Yr', link: `${BASE_URL}/study-material/aktu/btech/4th-year/EN` },
    ]
  },
  {
    id: 'me',
    title: 'Mechanical Engineering (ME)',
    code: '040',
    description: 'Thermodynamics, Fluid Mechanics, Theory of Machines, SOM, Heat & Mass Transfer, CAD/CAM.',
    tags: ['Thermo', 'Fluid Mech', 'TOM', 'CAD'],
    icon: Wrench,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
    category: 'Mechanical & Civil',
    buttonText: 'Explore ME Vault',
    isAvailable: false,
    mainLink: `${BASE_URL}/study-material/aktu/btech/ME`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/ME` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/ME` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/ME` },
      { label: '4th Yr', link: `${BASE_URL}/study-material/aktu/btech/4th-year/ME` },
    ]
  },
  {
    id: 'ce',
    title: 'Civil Engineering (CE)',
    code: '000',
    description: 'Structural Analysis, Geotech, Transportation, Surveying, Environment, RCC Design.',
    tags: ['Structures', 'Geotech', 'Surveying', 'RCC'],
    icon: Building2,
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-100',
    category: 'Mechanical & Civil',
    buttonText: 'Explore CE Vault',
    isAvailable: false,
    mainLink: `${BASE_URL}/study-material/aktu/btech/CE`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/btech/1st-year/CE` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/btech/2nd-year/CE` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/btech/3rd-year/CE` },
      { label: '4th Yr', link: `${BASE_URL}/study-material/aktu/btech/4th-year/CE` },
    ]
  },
  {
    id: 'bpharm',
    title: 'Bachelor of Pharmacy (B.Pharm)',
    code: '050',
    description: 'Pharmaceutics, Pharmacology, Medicinal Chemistry, Pharmacognosy, and Clinical Pharmacy.',
    tags: ['Pharmacology', 'Medicinal Chem', 'Anatomy'],
    icon: FlaskConical,
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-100',
    category: 'Pharma & Biotech',
    buttonText: 'Explore Pharmacy Vault',
    isAvailable: false, // Set to false to demonstrate the unavailable state
    mainLink: `${BASE_URL}/study-material/aktu/bpharm/BPHARM`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/aktu/bpharm/1st-year/BPHARM` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/aktu/bpharm/2nd-year/BPHARM` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/aktu/bpharm/3rd-year/BPHARM` },
      { label: '4th Yr', link: `${BASE_URL}/study-material/aktu/bpharm/4th-year/BPHARM` },
    ]
  }
];

const categories = [
  'All Branches',
  'Computer Science & IT',
  'Electronics & Electrical',
  'Mechanical & Civil',
  'Pharma & Biotech'
];

const AktuResources = ({ data = defaultData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Branches');

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
            Explore All AKTU Engineering Branches
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-gray-600">
            Comprehensive study vaults with Unit 1-5 handwritten notes, Quantum series, solved papers, and syllabus schemes categorized for every engineering discipline.
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
            placeholder="Search branch (e.g. CSE, AI & ML, ECE, Mechanical, Civil)..."
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
          {filteredData.map((branch) => {
            const IconComponent = branch.icon;
            
            return (
              <div 
                key={branch.id} 
                className={`bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col h-full ${
                  branch.isAvailable 
                    ? 'border-gray-100 shadow-sm hover:shadow-lg' 
                    : 'border-gray-200 opacity-90'
                }`}
              >
                
                {/* Card Header (Icon + Badges) */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-lg ${branch.isAvailable ? branch.iconBg : 'bg-gray-100'} ${branch.isAvailable ? branch.iconColor : 'text-gray-400'}`}>
                    <IconComponent size={22} />
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {/* Availability Badge */}
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      branch.isAvailable 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {branch.isAvailable ? (
                        <><CheckCircle2 size={12} /> Available</>
                      ) : (
                        <><AlertCircle size={12} /> Coming Soon</>
                      )}
                    </div>
                    
                    {/* Code Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-200">
                      <span className={`w-1.5 h-1.5 rounded-full ${branch.isAvailable ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                      CODE: {branch.code}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className={`text-xl font-bold mb-2 font-serif ${branch.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
                  {branch.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 min-h-[60px] leading-relaxed">
                  {branch.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 min-h-[50px]">
                  {branch.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-md text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="mt-auto"></div>

                {/* Year Links (Clickable or Disabled) */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {branch.years.map((year, i) => (
                    branch.isAvailable ? (
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
                {branch.isAvailable ? (
                  <a 
                    href={branch.mainLink}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    {branch.buttonText}
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
            <p className="text-lg">No branches found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All Branches');}}
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

export default AktuResources;