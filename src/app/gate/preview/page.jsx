// src/app/gate/preview/page.jsx
import Link from 'next/link';

export default async function PdfPreviewPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const pdfUrl = resolvedSearchParams.url;

    if (!pdfUrl) {
        return <div className="p-8 text-center">No PDF URL provided.</div>;
    }

    return (
        <main className="container mx-auto p-4 h-screen flex flex-col">
            <div className="mb-4">
                <Link href="/gate" className="text-blue-500 hover:underline">
                    &larr; Back to Papers
                </Link>
            </div>

            {/* The iframe embeds the external PDF directly into your site */}
            <div className="flex-grow border rounded shadow-sm overflow-hidden">
                {/* Change the iframe src from pdfUrl to your local proxy */}
                <iframe
                    src={`/api/pdf?url=${encodeURIComponent(pdfUrl)}`}
                    className="w-full h-full"
                    title="PDF Preview"
                />
            </div>
        </main>
    );
}