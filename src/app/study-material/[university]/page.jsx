
import Link from 'next/link';
import { 
  Code2, 
  Terminal, 
  Briefcase, 
  LineChart, 
  ArrowRight
} from 'lucide-react';

// Map database string identifiers to Lucide icons
const iconMap = {
  'code': Code2,
  'terminal': Terminal,
  'briefcase': Briefcase,
  'chart': LineChart,
};

export default async function UniversityCoursesPage({ params }) {
  let courses = [
    {
      code: "BTech",
      full_name: "Bachelor of Technology",
      description: "A 4-year undergraduate engineering program with specializations such as CSE, IT, ECE, EE, Mechanical, Civil, and more.",
      icon_type: "code"
    },
    {
      code: "BCA",
      full_name: "Bachelor of Computer Applications",
      description: "A 3-year undergraduate program focused on computer applications, programming, software development, databases, and IT.",
      icon_type: "terminal"
    },
    {
      code: "BBA",
      full_name: "Bachelor of Business Administration",
      description: "A 3-year undergraduate program covering business management, marketing, finance, human resources, and entrepreneurship.",
      icon_type: "briefcase"
    }
  ];
  
  const { university } = await params;
  
  const formattedUniName = university;

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 mb-20">
        
        {/* Breadcrumbs matching your reference */}
        <div className="mb-3 text-sm text-muted-foreground flex items-center">
          <Link href={'/'} className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">›</span> 
          <Link href={'/universities'} className="hover:text-primary transition-colors">Universities</Link>
          <span className="mx-2">›</span> 
          <span className="text-foreground font-medium">{formattedUniName}</span>
        </div>

        {/* Heading matching your reference */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Programs at {formattedUniName}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Select a course directory to access branch-wise <span className='dark:text-amber-950 text-amber-700'>Notes</span>, <span className='dark:text-amber-600 text-amber-950'>Pyq's</span>, <span className='text-blue-400'>Important Topics</span>, and <span className='text-emerald-600'>Syllabus</span>.
          </p>
        </div>

        <section>
          {courses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No courses found for this university.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, idx) => {
                const Icon = iconMap[course.icon_type] || Terminal; 
                
                return (
                  <Link 
                    href={`${university}/${course.code.toLowerCase()}`} 
                    key={idx} 
                    className="group"
                  >
                    {/* Folder Tab - Subtle styling to blend with the light bg */}
                    <div className="
                      w-28 h-8 
                      rounded-t-xl 
                      flex items-center justify-center 
                      text-xs font-bold tracking-widest uppercase 
                      transition-colors 
                      bg-slate-100 dark:bg-zinc-800/80
                      text-muted-foreground
                      group-hover:text-primary
                      border border-b-0 border-border
                    ">
                      {course.code}
                    </div>
                    
                    {/* Folder Body - Using the light bg and scale/translate hover effects */}
                    <div className="
                      relative z-10 p-6 -mt-px h-[220px] flex flex-col
                      bg-slate-50 dark:bg-zinc-900/40 
                      border border-border
                      rounded-2xl rounded-tl-none 
                      transition-all duration-300 ease-in-out
                      group-hover:bg-main 
                      group-hover:border-primary
                      group-hover:shadow-lg
                      group-hover:-translate-y-1
                      group-hover:scale-[1.02]
                    ">
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 text-foreground group-hover:text-primary transition-colors">
                          <Icon size={24} strokeWidth={2} />
                        </div>
                        
                        {/* Arrow matching your reference animation */}
                        <div className="mt-1 flex items-center">
                          <ArrowRight
                            className="
                              h-5 w-5
                              text-primary
                              opacity-0
                              -translate-x-2
                              transition-all
                              duration-300
                              group-hover:opacity-100
                              group-hover:translate-x-0
                            "
                          />
                        </div>
                      </div>

                      <div className="mt-auto">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {course.full_name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}