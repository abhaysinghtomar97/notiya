
import Hero from '@/components/home/hero';
import SkillsSection from '@/components/home/skills-section';
import Contribute from '@/components/home/contribute';
import YearGrid from '@/components/home/year-grid';
import AllColleges  from '@/components/home/all-college';
import ComparisonSection from '@/components/ComparisonSection';
import CareerSection from '@/components/CareerSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          <AllColleges />
          <YearGrid />
          <CareerSection/>
          <ComparisonSection />
          {/* <SkillsSection /> */}
          <Contribute />
        </div>
      </main>
      
    </div>
  );
}