import Link from 'next/link';

export default function PopularSubjects() {
  const subjects = [
    { name: 'Database Management System', count: 42, meta: 'Sem 4 • CS/IT' ,link:'https://drive.google.com/drive/folders/1lpNXodEDqvt2JPGCA_dz89smireiXSAK?usp=sharing'},
    { name: 'Data Structures & Algorithms', count: 56, meta: 'Sem 3 • CS/IT' ,link:'https://drive.google.com/drive/folders/1sI1ddIhqOoD7JSkuCgQ8aYcmpabDFYC-?usp=sharing' },
    { name: 'Operating System', count: 38, meta: 'Sem 4 • CS/IT',link:'https://drive.google.com/drive/folders/1OgRyIkR-unGiTm5e988UYs5Eg53B4LzZ?usp=sharing' },
    { name: 'Computer Organization', count: 29, meta: 'Sem 3 • CS/IT',link:'https://drive.google.com/drive/folders/1rbVGWdDg7YB41YXv47ndzKoqRGBmLZwt?usp=sharing' },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8 text-foreground">Popular Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((sub, idx) => (
          <Link href={sub.link} key={idx} target="_blank">
            <div className="p-5 bg-background border border-border rounded-xl hover:border-primary/50 hover:bg-main transition-colors h-full flex flex-col justify-between">
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