import { Inter } from 'next/font/google';

import './globals.css';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/layout/footer';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NextTopLoader from "nextjs-toploader";
import WhatsappFloatingButton from '@/components/WhatsappFloatingButton';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export const metadata = {
  metadataBase: new URL("https://notiya.in"),

  title: {
    default: "NOTIYA",
    template: "%s | NOTIYA",
  },
  description:
    "Free engineering notes, PYQs, syllabus and study material.",
  verification: {
    google: 'ZmycDE3Dwo_Cw2VqvMjUusH1dPvh19cRah0LDX95GxE',
  },
  icons: {
    icon: "/favicon.ico",
  }
};


export default function RootLayout({ children }) {

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Notiya",
    url: "https://notiya.in",
    logo: "https://notiya.in/logo.svg",
  };
  return (

    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased bg-newbg text-foreground selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

          <Navbar />
          <NextTopLoader
            color="#FF0000"
            height={3}
            showSpinner={false}

          />
          <main className="flex-1 ">{children}</main>
          <WhatsappFloatingButton />

          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}