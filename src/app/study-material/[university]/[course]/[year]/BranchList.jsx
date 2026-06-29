import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link'


export default async function page(props) {
  const year = props.year
  const university = props.university
  const course = props.course
  const Headyear = year.replace(/-/g, " ");



  const branchIcons = {
    CSE: "💻",
    IT: "🖥️",
    ECE: "📡",
    "CS-AI": "🤖",
    "CS-AIML": "🧠",
    "CS-DS": "📊",
  };
  const AllBranch = [
    {
      title: 'CSE',
      link: `/CSE`,
    },
    {
      title: 'ECE',
      link: `/ECE`,
    },
    {
      title: 'IT',
      link: `/IT`,
    },
    {
      title: 'CS-AI',
      link: `/CS-AI`,
    },
    {
      title: 'CS-AIML',
      link: `/CS-AIML`,
    },
    {
      title: 'CS-DS',
      link: `/CS-DS`,
    },
  ];
  return (
    <div className=' p-5'>
      <Breadcrumb
        items={[
          {
            label: "Universities",
            href: "/study-material",
          },
          {
            label: university.toUpperCase(),
            href: `/study-material/${university}`,
          },
          {
            label: course.toUpperCase(),
            href: `/study-material/${university}/${course}`,
          },
          {
            label: Headyear.toUpperCase(),
            href: "#",
          },
        ]}
      />
      <div className="mx-auto mt-8 mb-12 max-w-5xl text-center">

  {/* Badge */}
  <div className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
    📚 100% Free Study Material
  </div>

  {/* SEO Heading */}
  <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">

    <span className=" dark:text-white">
      {university.toUpperCase()}
    </span>{" "}

    <span className=" text-amber-600">
      B.Tech
    </span>

    <br />

    <span className="text-amber-600 ">
      {Headyear}
    </span>{" "}

    <span className="text-slate-900 dark:text-white">
      Study Materials
    </span>

  </h1>

  {/* Description */}
  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
    Download free <strong>Notes</strong>, <strong>PYQs</strong>,
    <strong> Syllabus</strong>, <strong>Books</strong> and
    <strong> Important Questions</strong> for{" "}
    <strong>
      {university.toUpperCase()} B.Tech {Headyear}
    </strong>.
    Select your branch below to get started.
  </p>

</div>

{/* Section */}
<div className="mb-6 flex items-center justify-between">

  <h2 className="text-2xl font-bold">
    Choose Your Branch
  </h2>

  <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
    6 Branches
  </span>

</div>
      <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {AllBranch.map((branch, idx) => (
          <Link
            href={`${year}${branch.link}`}
            key={branch.title}
            className="group"
          >
            <div
  className="
    relative
    overflow-hidden
    rounded-3xl
    border
    border-slate-200
    bg-gradient-to-br
    from-white
    to-slate-50
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-primary
    hover:shadow-2xl

    dark:border-slate-800
    dark:from-slate-900
    dark:to-slate-950
    dark:shadow-black/20
    dark:hover:border-primary/70
    dark:hover:shadow-primary/10
  "
>
              {/* Background Watermark */}
              <div
  className="
    absolute
    right-4
    top-2
    text-6xl
    font-black
    text-primary/5
    dark:text-primary/10
    transition-all
    duration-300
    group-hover:scale-110
  "
>
  {branch.title}
</div>

              {/* Icon */}
              <div
  className="
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-2xl
    bg-primary/10
    text-3xl

    dark:bg-primary/20
  "
>
  {branchIcons[branch.title]}
</div>

             <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
  {branch.title}
</h2>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
  Notes • PYQs • Syllabus
</p>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  Explore Resources
                </span>

                <div
  className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    bg-primary
    text-white
    dark:text-black
    transition-transform
    duration-300
    group-hover:translate-x-1

    dark:bg-primary
    dark:ring-2
    dark:ring-primary/20
  "
>
  →
</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
