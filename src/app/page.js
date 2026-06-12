import Navbar from '@/Components/layout/navbar';
import Hero from '@/Components/home/hero';
import PopularSubjects from '@/Components/home/popular-subjects';
import RecentUploads from '@/Components/home/recent-uploads';
import Contribute from '@/Components/home/contribute';
import Footer from '@/Components/layout/footer';
import YearGrid from '@/Components/home/year-grid';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          <YearGrid />
          <PopularSubjects />
          <RecentUploads />
          <Contribute />
        </div>
      </main>
      <Footer />
    </div>
  );
}