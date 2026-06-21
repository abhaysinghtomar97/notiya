import Link from "next/link";
import { getSubjectNotes } from "../../lib/fetchData";
import NotesList from "./NotesList";

export default async function SubjectPage({ params }) {

  const {
    university,
    course,
    year,
    slug
  } = await params;

  const branch =
    course === "btech"
      ? slug[0]
      : null;

  const subject =
    course === "btech"
      ? slug[1]
      : slug[0];

  const notes = await getSubjectNotes(
    university,
    course,
    year,
    branch,
    subject
  );
// console.log("notesn",notes)
  return (

    <div>
       <div className="mb-3 text-sm text-muted-foreground flex items-center">
                      <Link href={'/'} className="hover:text-primary transition-colors">Home</Link>
                      <span className="mx-2">›</span> 
                      <Link href={'/universities'} className="hover:text-primary transition-colors">Universities</Link>
                      <span className="mx-2">›</span> 
                      <span className="text-foreground font-medium">{university}</span>
                      <span className="mx-2">›</span> 
                      <span className="text-foreground font-medium">{course}</span>
                      <span className="mx-2">›</span> 
                      <span className="text-foreground font-medium">{year}</span>
                      <span className="mx-2">›</span> 
                      <span className="text-foreground font-medium">{branch}</span>
                      <span className="mx-2">›</span> 
                      <span className="text-foreground font-medium">{subject}</span>
                    </div>

      <h1>{subject}</h1>

      <NotesList notes={notes} />


    </div>

  );
}