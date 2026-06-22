import { Download, Eye } from "lucide-react";

export default function PyqSection({ pyqs }) {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Previous Year Question Papers
      </h2>

      <div className="space-y-4">

        {pyqs.map((pyq, index) => (

          <div
            key={index}
            className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >

            <div>

              <h3 className="font-semibold text-lg">
                {pyq.title}
              </h3>

              {pyq.uploadedAt && (
                <p className="text-sm text-muted-foreground mt-1">
                  Uploaded{" "}
                  {new Date(pyq.uploadedAt).toLocaleDateString()}
                </p>
              )}

            </div>

            <div className="flex gap-3">

              {/* Preview */}

              <a
                href={`https://drive.google.com/file/d/${pyq.driveId}/preview`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted transition"
              >
                
                <Eye size={18} />
                Preview
              </a>

              {/* Download */}

              <a
                href={`https://drive.google.com/uc?export=download&id=${pyq.driveId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition"
              >
                <Download size={18} />
                Download
              </a>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}