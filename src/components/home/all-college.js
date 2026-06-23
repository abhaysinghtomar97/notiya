import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

 function AllColleges() {
  

  const colleges = [{
    title : 'AKTU',
    logo : 'aktu_logo.svg',
    link :"/study-material/aktu"
  }, {
    title : 'PSIT',
    logo :'psit_logo.svg',
    link: '/psit'
  } 


]

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8 text-foreground">Select Your College
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colleges.map((college, idx) => (
          <Link href={college.link} key={idx}>
            <Image 
            className="group relative p-6 bg-background border border-border rounded-xl hover:border-primary hover:shadow-md hover:bg-main   transition-all duration-200 ease-out flex flex-col items-start h-full"
            src={college.logo}
            width='100'
            height='100'
            alt='college.title'
            />
            
          </Link>
        ))}
      </div>
      
    </section>
  );
}

export default AllColleges