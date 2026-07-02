import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function YearGrid() {
  

  const years = [{
    title : '1st Year',
    resources :105,
    link :'/aktu/btech/1st-year'
  }, {
    title : '2nd Year',
    resources :76,
    link :'/aktu/btech/2nd-year'
  } ,{
    title : '3rd Year',
    resources :90,
    link : '/aktu/btech/3rd-year'
  } ,{
    title : '4th Year',
    resources :56,
    link:'/aktu/btech/4th-year'
  }]

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8 text-foreground">AKTU B.Tech Study Material</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {years.map((year, idx) => (
          <Link href={`/study-material/${year.link}`} key={idx}>
            <div className="group relative p-6 bg-background border border-border rounded-xl hover:border-primary hover:shadow-md hover:bg-main   transition-all duration-200 ease-out flex flex-col items-start h-full">
              <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                {year.title}
              </h3>
              <p className="text-sm text-foreground/60">{year.resources} Resources</p>
              <div className="mt-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
    </section>
  );
}