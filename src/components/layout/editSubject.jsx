import Link from "next/link";

export default async function EditSubject({ params }) {
  
  console.log(params.subjectId) 
  const cards = [
    {
      title: "General Information",
      description: "Edit subject details",
      href: `/admin/subject/${subject._id}/general`,
    },
    {
      title: "Notes",
      description: "Upload units & resources",
      href: `/admin/subject/${subject._id}/notes`,
    },
    {
      title: "Books",
      description: "Manage recommended books",
      href: `/admin/subject/${subject._id}/books`,
    },
    {
      title: "Videos",
      description: "Manage YouTube videos",
      href: `/admin/subject/${subject._id}/videos`,
    },
    {
      title: "PYQs",
      description: "Previous year questions",
      href: `/admin/subject/${subject._id}/pyqs`,
    },
    {
      title: "Syllabus",
      description: "Upload syllabus PDF",
      href: `/admin/subject/${subject._id}/syllabus`,
    },
    {
      title: "FAQs",
      description: "Manage FAQs",
      href: `/admin/subject/${subject._id}/faqs`,
    },
    {
      title: "Important Topics",
      description: "Edit important topics",
      href: `/admin/subject/${subject._id}/topics`,
    },
  ];

  return( 
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {subject.subjectName}
        </h1>

        <p className="mt-2 text-gray-500">
          {subject.subjectCode}
        </p>

        <div className="mt-4 flex gap-3 flex-wrap">
          <span>{subject.university.toUpperCase()}</span>

          <span>•</span>

          <span>{subject.course.toUpperCase()}</span>

          <span>•</span>

          <span>{subject.year} Year</span>

          <span>•</span>

          <span>{subject.branch}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              {card.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}