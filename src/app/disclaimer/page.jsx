export const metadata = {
  title: "Disclaimer | Notiya",
  description:
    "Read the official disclaimer for Notiya regarding study materials, educational resources, copyrights, and third-party content.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-gradient-to-b from-amber-50 via-white to-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-lg md:p-12">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
            Legal
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Disclaimer
          </h1>

          <p className="mt-3 text-gray-600">
            <strong>Last Updated:</strong> July 2026
          </p>

          <div className="prose prose-gray mt-10 max-w-none">
            <h2>Educational Purpose</h2>

            <p>
              <strong>Notiya</strong> is an independent educational platform
              created to help students easily access study materials such as
              notes, previous year question papers (PYQs), syllabus PDFs,
              important notices, and other academic resources.
            </p>

            <p>
              All materials provided on this website are intended solely for
              educational and informational purposes.
            </p>

            <h2>Study Materials</h2>

            <p>
              Some study materials available on Notiya may be collected from
              publicly accessible educational sources, shared by students, or
              referenced from third-party platforms to help learners access
              academic resources more conveniently.
            </p>

            <p>
              We do not claim ownership of third-party educational content unless
              explicitly stated.
            </p>

            <h2>Videos & External Resources</h2>

            <p>
              Notiya may include links to or embed educational videos, Google
              Drive files, YouTube content, university websites, and other
              external resources. All trademarks, videos, logos, and educational
              materials remain the property of their respective owners.
            </p>

            <p>
              If a video or resource is created by another educator or platform,
              all rights belong to its original creator.
            </p>

            <h2>Copyright Notice</h2>

            <p>
              We respect intellectual property rights and make every reasonable
              effort to provide proper attribution whenever possible.
            </p>

            <p>
              If you are the copyright owner of any material appearing on
              Notiya and believe it has been published without appropriate
              authorization or attribution, please contact us with the relevant
              details. Upon verification, we will promptly review the request
              and take appropriate action, including updating attribution or
              removing the content where necessary.
            </p>

            <h2>Accuracy of Information</h2>

            <p>
              Although we strive to keep all information accurate and updated,
              Notiya does not guarantee the completeness, accuracy, or
              reliability of any study material, syllabus, notice, or academic
              information.
            </p>

            <p>
              Students are strongly advised to verify important academic
              information from their respective university or institution before
              making any decisions.
            </p>

            <h2>No Official Affiliation</h2>

            <p>
              Notiya is an independent platform and is <strong>not officially
              affiliated</strong> with AKTU, PSIT, CSJMU, or any university,
              college, examination authority, publisher, or educational
              institution unless explicitly mentioned.
            </p>

            <h2>Acceptance</h2>

            <p>
              By using Notiya, you acknowledge that you have read and understood
              this disclaimer and agree to use the website and its resources at
              your own discretion.
            </p>

            <h2>Contact</h2>

            <p>
              For copyright concerns, corrections, or any other queries, please
              contact us through our Contact page. We aim to respond as quickly
              as possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}