
import Hero from '@/components/home/hero';
import PopularSubjects from '@/components/home/popular-subjects';
import RecentUploads from '@/components/home/recent-uploads';
import Contribute from '@/components/home/contribute';
import YearGrid from '@/components/home/year-grid';
import AllColleges  from '@/components/home/all-college';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          <AllColleges />
          <YearGrid />
          <PopularSubjects />
          <RecentUploads />
          <Contribute />
        </div>
      </main>
      
    </div>
  );
}