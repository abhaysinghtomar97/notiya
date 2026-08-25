'use client';
import React, { useState } from 'react';
import { 
  Search, Monitor, Code, Briefcase, 
  PieChart, Users, TrendingUp,
  Settings, ArrowRight, Menu, 
  AlertCircle, CheckCircle2, Database
} from 'lucide-react';

// Base URL configuration
const BASE_URL = 'https://www.notiya.in';

const defaultData = [
  {
    id: 'bca-general',
    title: 'BCA (General)',
    code: 'BCA',
    description: 'C Programming, Data Structures, Java, DBMS, Web Development, and Software Engineering.',
    tags: ['C/C++', 'Java', 'DBMS', 'Web Dev'],
    icon: Code,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-100',
    category: 'Computer Applications',
    buttonText: 'Explore BCA Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/csjmu/bca/general`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/csjmu/bca/1st-year/` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/csjmu/bca/2nd-year/` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/csjmu/bca/3rd-year/` },
    ]
  },
 
  
  {
    id: 'bba-general',
    title: 'BBA (General)',
    code: 'BBA',
    description: 'Principles of Management, Business Economics, Accounting, and Organizational Behavior.',
    tags: ['Management', 'Economics', 'Accounting'],
    icon: Briefcase,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
    category: 'Business Admin (BBA)',
    buttonText: 'Explore BBA Vault',
    isAvailable: true,
    mainLink: `${BASE_URL}/study-material/csjmu/bba/general`,
    years: [
      { label: '1st Yr', link: `${BASE_URL}/study-material/csjmu/bba/1st-year/` },
      { label: '2nd Yr', link: `${BASE_URL}/study-material/csjmu/bba/2nd-year/` },
      { label: '3rd Yr', link: `${BASE_URL}/study-material/csjmu/bba/3rd-year/` },
    ]
}
];

const categories = [
  'All Programs',
  'Computer Applications',
  'Business Admin (BBA)'
];

const csjmuResources = ({ data = defaultData }) => {
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
            Explore CSJMU Programs
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-gray-600">
            Comprehensive study vaults with semester-wise handwritten notes, previous year solved papers, and syllabus schemes for undergraduate programs.
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
            placeholder="Search program (e.g. BCA, BBA, Finance, AI)..."
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
                <div className={`grid grid-cols-3 gap-2 mb-5`}>
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
                    disabled
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 font-semibold py-3 px-4 rounded-xl cursor-not-allowed"
                  >
                    Not Yet Available
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

export default csjmuResources;