import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import Navbar from '@/components/layout/navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'NOTIYA – AKTU Notes, PYQs, Syllabus & Important Questions',
  description: 'Find semester-wise AKTU notes, PYQs, syllabus and important questions. Fast, organized and student-friendly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}