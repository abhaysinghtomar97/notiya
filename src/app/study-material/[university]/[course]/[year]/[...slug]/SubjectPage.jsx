import Link from "next/link";
import { getSubjectData } from "@/lib/getSubjectData"; // Adjust path as needed
import VideoPlaylist from "@/components/VideoPlaylist"; // Adjust path as needed
import { FiDownload, FiEye, FiBookOpen, FiStar, FiFileText, FiHelpCircle } from "react-icons/fi";

export default async function SubjectPage({ params }) {
const { university, course, year, slug } = await params;

  let branch = null;
  let subjectSlug = "";

  // Flexible slug parsing to handle 1st-year URLs missing the branch
  if (course === "btech") {
    if (slug.length === 2) {
      // URL format: /btech/2nd-year/cse/operating-system
      branch = slug[0];
      subjectSlug = slug[1];
    } else if (slug.length === 1) {
      // URL format: /btech/1st-year/engineering-physics
      subjectSlug = slug[0];
    }
  } else {
    // For courses like BCA that never have branches
    subjectSlug = slug[0];
  }

  // Pass these into your data fetcher
  const subjectData = await getSubjectData(university, course, year, branch, subjectSlug);
  if (!subjectData) {
    return (
      <div className="flex h-screen items-center justify-center text-zinc-400">
        <p>Subject data not found.</p>
      </div>
    );
  }

  const { general, importantTopics, syllabus, videos, notes, pyqs, faqs } = subjectData;

  // Group notes by Unit for better organization
  const groupedNotes = notes?.reduce((acc, note) => {
    const unit = note.unit || "Other";
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(note);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16 text-zinc-200">
      {/* --- 1. Breadcrumbs --- */}
      <nav className="mb-8 text-sm text-zinc-500 flex flex-wrap items-center gap-2">
        <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <span>›</span> 
        <span className="text-zinc-300 font-medium uppercase">{university}</span>
        <span>›</span> 
        <span className="text-zinc-300 font-medium uppercase">{course}</span>
        <span>›</span> 
        <span className="text-cyan-400 font-medium capitalize">{general.name}</span>
      </nav>

      {/* --- 2. Header & Info --- */}
      <header className="border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white capitalize">
            {general.name}
          </h1>
          <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm font-bold rounded-lg border border-zinc-700">
            {general.code}
          </span>
        </div>
        
        {general.description && (
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            {general.description}
          </p>
        )}
        
        {/* Important Topics */}
        {importantTopics?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 items-center">
            <span className="flex items-center text-sm font-semibold text-amber-400 mr-2">
              <FiStar className="mr-1" /> Important Topics:
            </span>
            {importantTopics.map((topic, i) => (
              <span key={i} className="px-3 py-1 text-xs font-medium bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300">
                {topic}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* --- 3. Videos Section (Client Component) --- */}
      {videos?.length > 0 && (
        <section>
          <VideoPlaylist videos={videos} />
        </section>
      )}

      {/* --- 4. Study Materials (Notes & PYQs) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Notes Column */}
        {notes?.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-2">
              <FiFileText className="text-2xl text-emerald-400" />
              <h2 className="text-2xl font-semibold text-white">Subject Notes</h2>
            </div>
            
            <div className="space-y-6">
              {Object.keys(groupedNotes).sort().map((unitNum) => (
                <div key={unitNum} className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
                    {unitNum === "Other" ? "Miscellaneous" : `Unit ${unitNum}`}
                  </h3>
                  {groupedNotes[unitNum].map((note) => (
                    <DriveResourceCard key={note.id} item={note} type={note.type} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PYQs Column */}
        {pyqs?.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-2">
              <FiFileText className="text-2xl text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Previous Year Papers</h2>
            </div>
            <div className="space-y-3">
              {pyqs.map((pyq) => (
                <DriveResourceCard key={pyq.id} item={pyq} type="PYQ" />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* --- 5. Syllabus Section --- */}
      {syllabus?.length > 0 && (
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <FiBookOpen className="text-2xl text-cyan-400" />
            <h2 className="text-2xl font-semibold text-white">Official Syllabus</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {syllabus.map((unitObj, idx) => (
              <div key={idx} className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="bg-zinc-800 text-zinc-400 px-2 py-1 rounded text-xs">Unit {unitObj.unit}</span>
                  {unitObj.title}
                </h3>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  {unitObj.topics?.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- 6. FAQs Section --- */}
      {faqs?.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FiHelpCircle className="text-2xl text-amber-400" />
            <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details 
                key={idx} 
                className="group bg-zinc-900 border border-zinc-800 rounded-xl [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-zinc-200">
                  {faq.question}
                  <span className="transition group-open:rotate-180 text-zinc-500">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-zinc-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Reusable Component for Google Drive Links
function DriveResourceCard({ item, type }) {
  // Constructed directly from the Google Drive ID
  const viewUrl = `https://drive.google.com/file/d/${item.driveId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${item.driveId}`;

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
      <div className="pr-4">
        <h3 className="font-medium text-zinc-200 capitalize">{item.title}</h3>
        <p className="text-xs text-zinc-500 mt-1 capitalize">{type}</p>
      </div>
      
      <div className="flex items-center gap-2 shrink-0">
        <a 
          href={viewUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
          title="View PDF"
        >
          <FiEye size={20} />
        </a>
        
        <a 
          href={downloadUrl} 
          className="flex items-center gap-2 px-3 py-2 bg-zinc-100 text-zinc-900 text-sm font-medium rounded-lg hover:bg-white transition-colors"
          title="Download PDF"
        >
          <FiDownload size={16} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>
    </div>
  );
}