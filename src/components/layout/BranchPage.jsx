import Link from "next/link";

import { getBranchSubjects } from "@/lib/fetchData";
import NotFound from "./not-found";

export default async function BranchPage({
  university,
  course,
  year,
  branch,
}) {
  const subjects = await getBranchSubjects(
    university,
    course,
    year,
    branch
  );


  if (!subjects || subjects.length === 0) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="mb-3 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>

        <span className="mx-2">›</span>

        <Link
          href="/universities"
          className="hover:text-primary transition-colors"
        >
          Universities
        </Link>

        <span className="mx-2">›</span>

        <span className="font-medium text-foreground">
          {university}
        </span>

        <span className="mx-2">›</span>

        <span className="font-medium text-foreground">
          {course}
        </span>

        <span className="mx-2">›</span>

        <span className="font-medium text-foreground">
          {year}
        </span>

        <span className="mx-2">›</span>

        <span className="font-medium text-foreground">
          {branch.toUpperCase()}
        </span>
      </div>

      <h1 className="mb-6 text-3xl font-bold">
        {branch.toUpperCase()}
      </h1>

      <ul className="space-y-3">
        {subjects.map((sub) => (
          <li key={sub._id}>
            <Link
              href={`${branch}/${sub.slug}`}
              className="block rounded-lg border p-4 transition hover:bg-gray-50"
            >
              {sub.subjectName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}