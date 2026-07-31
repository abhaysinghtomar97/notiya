// components/DownloadCard.jsx
import PdfPreview from "@/components/pdfPreview";

export default function DownloadCard({ streamData }) {
  const isAvailable = streamData.status === "Available";

  return (
    <section className="mb-12">
      <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden">
        <div className="bg-main dark:bg-amber-900 px-5 py-4 font-semibold">
          Syllabus Download
        </div>

        <div className="p-5">
          <div
            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border p-5 ${
              isAvailable
                ? "bg-amber-600/10 border-amber-900 dark:border-amber-200"
                : "bg-gray-50 border-gray-200 dark:bg-zinc-900/50 dark:border-zinc-800 opacity-60 grayscale"
            }`}
          >
            <div>
              <h2 className={`text-lg ${isAvailable ? "font-semibold hover:text-blue-700" : "font-medium text-gray-500"}`}>
                {isAvailable ? (
                  <a href={streamData.link} target="_blank" rel="noopener noreferrer">
                    {streamData.title}
                  </a>
                ) : (
                  <span>{streamData.title}</span>
                )}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                {isAvailable ? "Official AKTU Syllabus PDF (2026-27)" : "Pending official release"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isAvailable ? (
                <>
                  {streamData.driveId && <PdfPreview driveId={streamData.driveId} />}
                  <a
                    href={streamData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center rounded-xl bg-blue-600 text-white border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Download
                  </a>
                </>
              ) : (
                <span className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-500 rounded-xl text-sm font-medium">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}