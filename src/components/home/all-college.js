import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function AllColleges() {
  const colleges = [
    {
      title: 'AKTU',
      subtitle: 'Dr. A.P.J. Abdul Kalam Technical University',
      logo: '/aktu_logo.svg',
      bgImage: '/aktu_building.jpg', // Add your campus background images to public folder
      link: "/study-material/aktu/"
    }, 
    {
      title: 'PSIT Autonomous',
      subtitle: 'Pranveer Singh Institute of Technology',
      logo: '/psit_logo.svg',
      bgImage: '/psit_building.jpg', 
      link: '/study-material/psit'
    }, 
    {
      title: 'CSJMU',
      subtitle: 'Chhatrapati Shahu Ji Maharaj University',
      logo: '/csjmu_logo.svg',
      bgImage: '/csjmu_building.jpg', 
      link: '/study-material/csjmu'
    }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-foreground">Select Your College / University</h2>
        <div className="flex items-center justify-center mt-4 gap-2 opacity-50">
          <div className="h-px w-12 bg-amber-500"></div>
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <div className="h-px w-12 bg-amber-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {colleges.map((college, idx) => (
          <div key={idx} className="group relative bg-background rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-amber-200 transition-all duration-300">
            
            {/* Background Image Header */}
            <div className="relative h-32 w-full bg-amber-300">
              <Image 
                src={college.bgImage} 
                alt={`${college.title} Campus`}
                fill
                className="object-cover opacity-50 group-hover:opacity-60 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>

            {/* College Content */}
            <div className="relative pt-0 p-8 flex flex-col items-center text-center">
              
              {/* Logo (Overlapping Header) */}
              <div className="bg-background p-2 rounded-2xl shadow-md border border-border -mt-16 mb-4 w-24 h-24 flex items-center justify-center bg-white z-10">
                <Image 
                  src={college.logo}
                  width={80}
                  height={80}
                  alt={`${college.title} Logo`}
                  className="object-contain"
                />
              </div>

              {/* Text Info */}
              <h3 className="text-xl font-bold mb-2">{college.title}</h3>
              <p className="text-sm text-foreground/60 mb-8 min-h-[40px]">
                {college.subtitle}
              </p>
              
              {/* Action Button */}
              <Link 
                href={college.link} 
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border-2 border-amber-500/30 text-amber-600 font-semibold text-sm group-hover:border-amber-500 group-hover:bg-amber-50 transition-all"
              >
                Explore Resources 
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllColleges;