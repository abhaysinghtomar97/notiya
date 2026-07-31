// components/SubjectTable.jsx

export default function SubjectTable({ title, subjects }) {
  // If no subjects are provided (e.g., branch is Coming Soon), don't render the table
  if (!subjects || subjects.length === 0) return null;

  return (
    <section className="scroll-mt-28 mb-10">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <table className="  w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden  md:whitespace-normal">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-16">S.No.</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Course Name</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-24">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-24">Page No.</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr
                key={index}
                className={`
                  ${subject.type === "Lab" 
                    ? "bg-emerald-50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30" 
                    : "bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/30"}
                `}
              >
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                  {index + 1}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">
                  {subject.course}
                  {subject.isUnique && (
                    <span className="inline-block ml-2 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                      Unique
                    </span>
                  )}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                  {subject.type}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {subject.page}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}