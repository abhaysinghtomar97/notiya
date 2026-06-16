import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BtechStudyMaterialPage() {
  const years = [
    {
      
      title: "1st Year",
      resources: 105,
      link: "AKTU-1st-year",
    },
    {
     
      title: "2nd Year",
      resources: 76,
      link: "AKTU-2nd-year",
    },
    {
      
      title: "3rd Year",
      resources: 90,
      link: "AKTU-3rd-year",
    },
    {
     
      title: "4th Year",
      resources: 56,
      link: "AKTU-4th-year",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 mb-20 ">
      
      <div className="mb-3 text-sm text-muted-foreground">
        <Link href={'/'}>Home</Link><span className="mx-2">›</span> B.Tech Study Material
      </div>

      {/* Heading */}
      <div className="mb-12">
        

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
          Choose Your Year
        </h1>

        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Select your year to access branch-wise <span className='dark:text-amber-200'>Notes</span>, <span className='dark:text-yellow-600'>Pyq's</span>, <span className='dark:text-blue-400'>Important Topics</span>, <span className='dark:text-emerald-200'>Syllabus</span> and more.
        </p>
      </div>

      {/* Years Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {years.map((year) => (
            <Link
              href={`/btech-study-material/${year.link}`}
              key={year.title}
              className="group"
            >
              <div
                className="
                  h-full
                  rounded-2xl
                  border
                  bg-background
                  p-6
                  transition-all
                  duration-300
                  hover:bg-main 
                  hover:border-primary
                  hover:shadow-lg
                  hover:-translate-y-1
                  hover:scale-[1.02]
                "
              >
               

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {year.title}
                </h2>

                {/* Resource Count */}
                <p className="text-sm text-muted-foreground">
                  {year.resources} Resources
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center">
                  <ArrowRight
                    className="
                      h-5
                      w-5
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
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}