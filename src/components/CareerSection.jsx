import CareerCard from "./CareerCard";
import { careerPaths } from "@/data/careerPaths";

export default function CareerSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full font-semibold transition-colors">
            CAREER PATHS
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900 dark:text-white transition-colors">
            Become More Than
            <span className="text-blue-600 dark:text-blue-400"> A Graduate.</span>
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Learn industry-ready skills with curated roadmaps, notes,
            projects, resources, and interview preparation—all in one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {careerPaths.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
            />
          ))}
        </div>

      </div>
    </section>
  );
}