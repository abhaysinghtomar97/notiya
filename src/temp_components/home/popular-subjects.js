import Link from 'next/link';

export default function PopularSubjects() {
  const subjects = [
    { name: 'Database Management System', count: 42, meta: 'Sem 4 • CS/IT' },
    { name: 'Data Structures & Algorithms', count: 56, meta: 'Sem 3 • CS/IT' },
    { name: 'Operating System', count: 38, meta: 'Sem 4 • CS/IT' },
    { name: 'Computer Organization', count: 29, meta: 'Sem 3 • CS/IT' },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8 text-foreground">Popular Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((sub, idx) => (
          <Link href={`/subject/${sub.name.toLowerCase()}`} key={idx}>
            <div className="p-5 bg-background border border-border rounded-xl hover:border-primary/50 hover:bg-main/50 transition-colors h-full flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground leading-tight mb-2">{sub.name}</h3>
                <p className="text-xs text-foreground/50">{sub.meta}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <span className="text-sm font-medium text-foreground/70">{sub.count} Resources</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}