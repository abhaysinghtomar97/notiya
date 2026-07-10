export const metadata = {
  title: "Privacy Policy | Notiya",
  description:
    "Read the Privacy Policy of Notiya to understand how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-b from-amber-50 via-white to-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-lg md:p-12">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
            Legal
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <p className="mt-3 text-gray-600">
            <strong>Last Updated:</strong> July 2026
          </p>

          <div className="prose prose-gray mt-10 max-w-none">
            <h2>Introduction</h2>
            <p>
              Welcome to <strong>Notiya</strong>. Your privacy is important to
              us. This Privacy Policy explains what information we collect, how
              we use it, and how we protect your information while you use our
              website.
            </p>

            <h2>Information We Collect</h2>

            <ul>
              <li>Basic analytics information such as page visits.</li>
              <li>Browser and device information.</li>
              <li>Cookies used to improve website performance.</li>
              <li>
                Information voluntarily provided through contact forms or email.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>

            <ul>
              <li>Improve website performance and user experience.</li>
              <li>Provide study materials and educational resources.</li>
              <li>Respond to user inquiries.</li>
              <li>Fix technical issues.</li>
            </ul>

            <h2>Cookies</h2>

            <p>
              Notiya may use cookies and similar technologies to enhance your
              browsing experience and understand website traffic.
            </p>

            <h2>Third-Party Services</h2>

            <p>
              We may use trusted third-party services including analytics,
              hosting providers, and embedded educational resources. These
              services have their own privacy policies.
            </p>

            <h2>External Links</h2>

            <p>
              Our website may contain links to external websites including
              Google Drive, YouTube, university websites, and other educational
              resources. We are not responsible for their content or privacy
              practices.
            </p>

            <h2>Data Security</h2>

            <p>
              We take reasonable measures to protect your information.
              However, no method of transmission over the internet is completely
              secure.
            </p>

            <h2>Policy Updates</h2>

            <p>
              This Privacy Policy may be updated from time to time. Any changes
              will be reflected on this page.
            </p>

            <h2>Contact Us</h2>

            <p>
              For any questions regarding this Privacy Policy, please contact us
              through the Contact page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}