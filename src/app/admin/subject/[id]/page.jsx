import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  const subject = await Subject.findById(id).lean();

  if (!subject) {
    notFound();
  }

  const cards = [
    {
      title: "General Information",
      description: "Edit subject information",
      href: `/admin/subject/${id}/general`,
      icon: "📝",
    },
    {
      title: "Notes",
      description: "Manage units & resources",
      href: `/admin/subject/${id}/notes`,
      icon: "📖",
    },
    {
      title: "Books",
      description: "Recommended books",
      href: `/admin/subject/${id}/books`,
      icon: "📚",
    },
    {
      title: "Videos",
      description: "YouTube resources",
      href: `/admin/subject/${id}/videos`,
      icon: "🎥",
    },
    {
      title: "PYQs",
      description: "Previous year papers",
      href: `/admin/subject/${id}/pyqs`,
      icon: "📄",
    },
    {
      title: "Syllabus",
      description: "Subject syllabus",
      href: `/admin/subject/${id}/syllabus`,
      icon: "📋",
    },
    {
      title: "FAQs",
      description: "Frequently asked questions",
      href: `/admin/subject/${id}/faqs`,
      icon: "❓",
    },
    {
      title: "Important Topics",
      description: "Topics students should focus on",
      href: `/admin/subject/${id}/topics`,
      icon: "⭐",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto p-8">

      {/* Header */}

      <div className="border rounded-2xl p-8 shadow-sm mb-8 bg-white">

        <h1 className="text-4xl font-bold">
          {subject.subjectName}
        </h1>

        <p className="mt-2 text-gray-500">
          {subject.subjectCode}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">

          <span className="px-3 py-1 rounded-full bg-blue-100">
            {subject.university.toUpperCase()}
          </span>

          <span className="px-3 py-1 rounded-full bg-green-100">
            {subject.course.toUpperCase()}
          </span>

          <span className="px-3 py-1 rounded-full bg-orange-100">
            Year {subject.year}
          </span>

          <span className="px-3 py-1 rounded-full bg-purple-100">
            {subject.branch}
          </span>

        </div>

        <p className="mt-6 text-gray-700">
          {subject.description}
        </p>

      </div>

      {/* Dashboard */}

      <h2 className="text-2xl font-semibold mb-5">
        Manage Subject
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((card) => (

          <Link
            key={card.title}
            href={card.href}
            className="border rounded-xl p-6 hover:shadow-lg transition bg-white"
          >

            <div className="text-4xl mb-4">
              {card.icon}
            </div>

            <h3 className="text-xl font-semibold">
              {card.title}
            </h3>

            <p className="mt-2 text-gray-500">
              {card.description}
            </p>

          </Link>

        ))}

      </div>

    </main>
  );
}