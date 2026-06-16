import { Inter } from 'next/font/google';

import './globals.css';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export const metadata = {
  title: 'NOTIYA – AKTU Notes, PYQs, Syllabus & Important Questions',
  description:
    'Find semester-wise AKTU notes, PYQs, syllabus and important questions. Fast, organized and student-friendly.',

  verification: {
    google: 'ZmycDE3Dwo_Cw2VqvMjUusH1dPvh19cRah0LDX95GxE',
  },
};


export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth"
    >
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased bg-newbg text-foreground selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        
        </ThemeProvider>
      </body>
    </html>
  );
}