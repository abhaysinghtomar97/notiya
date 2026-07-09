import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  Laptop,
  Monitor,
  RadioTower,
  Bot,
  BrainCircuit,
  Database,
  ArrowRight,
} from "lucide-react";

export default async function BranchPage(props) {
  const year = props.year;
  const university = props.university;
  const course = props.course;
  const Headyear = year.replace(/-/g, " ");

  // Replaced Emojis with Premium Lucide Icons
  const branchIcons = {
    CSE: <Laptop className="h-5 w-5 text-amber-600" />,
    IT: <Monitor className="h-5 w-5 text-amber-600" />,
    ECE: <RadioTower className="h-5 w-5 text-amber-600" />,
    "CS-AI": <Bot className="h-5 w-5 text-amber-600" />,
    "CS-AIML": <BrainCircuit className="h-5 w-5 text-amber-600" />,
    "CS-DS": <Database className="h-5 w-5 text-amber-600" />,
  };

  const AllBranch = [
    { title: "CSE", link: `/CSE` },
    { title: "ECE", link: `/ECE` },
    { title: "IT", link: `/IT` },
    { title: "CS-AI", link: `/CS-AI` },
    { title: "CS-AIML", link: `/CS-AIML` },
    { title: "CS-DS", link: `/CS-DS` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-6">
      {/* Breadcrumb */}
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

      {/* Hero Section */}
      <div className="mx-auto mb-12 mt-8 max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full bg-amber-100/50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 ring-1 ring-inset ring-amber-500/20">
          100% Free Study Material
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          <span>{university.toUpperCase()}</span>{" "}
          <span className="text-amber-600">B.Tech</span>
          <br />
          <span className="text-amber-600">{Headyear}</span>{" "}
          <span>Study Materials</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Download free <strong>Notes</strong>, <strong>PYQs</strong>,
          <strong> Syllabus</strong>, <strong>Books</strong>, and
          <strong> Important Questions</strong> for{" "}
          <span className="text-foreground">
            {university.toUpperCase()} B.Tech {Headyear}
          </span>
          . Select your branch below to get started.
        </p>
      </div>

      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Choose Your Branch
        </h2>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {AllBranch.length} Branches
        </span>
      </div>

      {/* Branch Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AllBranch.map((branch) => (
          <Link
            key={branch.title}
            href={`${year}${branch.link}`}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Subtle Left Accent Border */}
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-amber-500 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-80" />

            {/* Card Content Top */}
            <div className="flex flex-col gap-4">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50/50 shadow-sm transition-colors duration-300 group-hover:bg-amber-100/50 dark:border-amber-900/50 dark:bg-amber-900/20">
                {branchIcons[branch.title]}
              </div>

              {/* Title */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-amber-600">
                  {branch.title}
                </h2>
              </div>
            </div>

            {/* Card Content Bottom */}
            <div className="mt-6 flex items-end justify-between gap-4">
              <p className="text-[13px] font-medium text-muted-foreground">
                Notes • PYQs • Syllabus
              </p>

              {/* Action Arrow */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-600 group-hover:shadow-amber-500/25">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}