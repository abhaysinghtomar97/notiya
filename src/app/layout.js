import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
import BugReportButton from "@/components/BugReportButton";

import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://www.notiya.in"),

  title: {
    default: "NOTIYA",
    template: "%s | NOTIYA",
  },

  description:
    "Free engineering notes, PYQs, syllabus and study material.",

  verification: {
    google: "ZmycDE3Dwo_Cw2VqvMjUusH1dPvh19cRah0LDX95GxE",
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "NOTIYA",
    description:
      "Free engineering notes, PYQs, syllabus and study material.",
    url: "https://www.notiya.in",
    siteName: "NOTIYA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NOTIYA",
    description:
      "Free engineering notes, PYQs, syllabus and study material.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NOTIYA",
    url: "https://www.notiya.in",
    logo: "https://www.notiya.in/logo.svg",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Google AdSense */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3170429334030640"
          crossOrigin="anonymous"
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization),
          }}
        />
      </head>

      <body
        className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased bg-newbg text-foreground selection:bg-primary/10 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <NextTopLoader
            color="#FF0000"
            height={3}
            showSpinner={false}
          />

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <WhatsappFloatingButton />
          <BugReportButton />

          <Footer />

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}