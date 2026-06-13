import { FileText, BookOpen, FileQuestion, GraduationCap } from 'lucide-react';

export default function RecentUploads() {
  const uploads = [
    { title: 'DBMS Unit 4 Notes', type: 'Notes', sem: 'Sem 4', date: '2 hours ago', icon: FileText },
    { title: 'DSA Handwritten Notes', type: 'Notes', sem: 'Sem 3', date: '5 hours ago', icon: BookOpen },
    { title: 'Operating System PYQ', type: 'PYQ', sem: 'Sem 4', date: '1 day ago', icon: FileQuestion },
    { title: 'OOPS Important Questions', type: 'Important', sem: 'Sem 3', date: '2 days ago', icon: GraduationCap },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8 text-foreground">Recently Added</h2>
      <div className="flex flex-col gap-3">
        {uploads.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-md group-hover:bg-background transition-colors">
                <file.icon className="h-5 w-5 text-foreground/60" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{file.title}</h3>
                <div className="flex gap-2 text-xs text-foreground/60 mt-1">
                  <span>{file.type}</span>
                  <span>•</span>
                  <span>{file.sem}</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-sm text-foreground/50">
              {file.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}