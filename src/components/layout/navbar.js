'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Aliased Menu to MenuIcon to prevent conflict with your UI component
import { Search, Moon, Sun, FileText, Loader2, Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import Image from 'next/image';

import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import AktuResult from '../AktuResult';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(null);
  const router = useRouter();

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Async Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard shortcut & Custom Event Listener
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const handleCustomOpen = () => setOpen(true);

    document.addEventListener('keydown', down);
    window.addEventListener('open-search', handleCustomOpen);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-search', handleCustomOpen);
    };
  }, []);

  // Debounced API Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/subject', {
          params: { input: searchQuery.trim() },
        });
        setResults(response.data.subject);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelect = (url) => {
    setOpen(false);
    setSearchQuery('');
    router.push(`/study-material/${url}`);
  };

  // Helper to close mobile menu on navigation
  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
          
          {/* Logo & Desktop Nav Container */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-2xl tracking-tight text-main">
              <div className='flex justify-center items-center'>
                <Image src="/logo.svg" alt="N" width={40} height={40} />
                <p className='text-amber-700 font-serif'>NOTIYA</p>
              </div>
            </Link>

            {/* ================= DESKTOP MENU (Hidden on small screens) ================= */}
            <div className={cn("inset-x-0 z-50 mx-auto hidden max-w-2xl md:flex text-sm font-medium text-foreground/80")}>
              <Menu setActive={setActive}>
                <Link href={'/'} className="hover:opacity-70 transition-opacity">Home</Link>
                
                {/* Notes Desktop */}
                <MenuItem setActive={setActive} active={active} item="Notes">
                  <div className="grid grid-cols-3 ml-10 p-3 w-100]">
                    <div>
                      <h4 className="mb-3 font-semibold text-amber-600">AKTU (B.tech)</h4>
                      <div className="flex flex-col space-y-2">
                        <HoveredLink href="/study-material/aktu/btech/1st-year">1st Year Notes</HoveredLink>
                        <HoveredLink href="/study-material/aktu/btech/2nd-year">2nd Year Notes</HoveredLink>
                        <HoveredLink href="/study-material/aktu/btech/3rd-year">3rd Year Notes</HoveredLink>
                        <HoveredLink href="/study-material/aktu/btech/4th-year">4th Year Notes</HoveredLink>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-amber-600">PSIT(Autonomus)</h4>
                      <div className="flex flex-col space-y-2">
                        <HoveredLink href="/study-material/psit/btech/1st-year">1st Year Notes</HoveredLink>
                        <HoveredLink href="/study-material/psit/btech/2nd-year">2nd Year Notes</HoveredLink>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-amber-600">CSJMU</h4>
                      <div className="flex flex-col space-y-2">
                        <HoveredLink href="/study-material/csjmu/bca">BCA Notes</HoveredLink>
                        <HoveredLink href="/study-material/csjmu/bba">BBA Notes</HoveredLink>
                      </div>
                    </div>
                  </div>
                </MenuItem>

                {/* PYQs Desktop */}
                <MenuItem setActive={setActive} active={active} item="PYQs">
                  <div className="grid grid-cols-3 gap-4 ml-10 p-3 w-100">
                    <div>
                      <h4 className="mb-3 font-semibold text-amber-600">AKTU</h4>
                      <div className="flex flex-col space-y-2">
                        <HoveredLink href="/study-material/aktu/btech/1st-year">1st Year PYQ</HoveredLink>
                        <HoveredLink href="/study-material/aktu/btech/2nd-year">2nd Year PYQ</HoveredLink>
                        <HoveredLink href="/study-material/aktu/btech/3rd-year">3rd Year PYQ</HoveredLink>
                        <HoveredLink href="/study-material/aktu/btech/4th-year">4th Year PYQ</HoveredLink>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-amber-600">PSIT(Autonomus) <br/>[AT/CT/PS]</h4>
                      <div className="flex flex-col space-y-2">
                        <HoveredLink href="/study-material/psit/btech/1st-year">1st Year PYQ</HoveredLink>
                        <HoveredLink href="/study-material/psit/btech/2nd-year">2nd Year PYQ</HoveredLink>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-amber-600">CSJMU</h4>
                      <div className="space-y-2 flex flex-col">
                        <HoveredLink href="/study-material/csjmu/bca">BCA</HoveredLink>
                        <HoveredLink href="/study-material/csjmu/bba">BBA</HoveredLink>
                      </div>
                    </div>
                  </div>
                </MenuItem>

                {/* Syllabus Desktop */}
                <MenuItem setActive={setActive} active={active} item="Syllabus">
                  <div className="flex flex-col space-y-3 p-4 w-60">
                    <HoveredLink href="/AKTU-Syllabus">AKTU</HoveredLink>
                    <HoveredLink href="/PSIT-Syllabus">PSIT</HoveredLink>
                    <HoveredLink href="/CSJMU-Syllabus">CSJMU</HoveredLink>
                  </div>
                </MenuItem>
              <Link href={'/result/Aktu-Result'} className="hover:opacity-70 transition-opacity">AKTU Result</Link>
              </Menu>
            </div>
          </div>

          {/* Right Actions Container */}
          <div className="flex items-center gap-2">
            
            {/* Search Button */}
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/60 border border-border rounded-md hover:bg-main transition-colors md:w-64 justify-between">
              <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Search...</span>
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-foreground/60 hover:bg-muted rounded-md transition-colors"
            >
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground/60 hover:bg-muted rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>

          </div>
        </div>

        {/* ================= MOBILE MENU OVERLAY ================= */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 w-full h-[calc(100vh-3.5rem)] bg-background border-t border-border overflow-y-auto p-4 flex flex-col gap-4 shadow-xl z-50">
            <Link href="/" onClick={closeMobile} className="p-2 font-medium text-lg border-b border-border/50">
              Home
            </Link>

            {/* Notes Accordion */}
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-2 font-medium text-lg cursor-pointer border-b border-border/50">
                Notes
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:-rotate-180" />
              </summary>
              <div className="p-4 space-y-6 bg-muted/30 rounded-b-md">
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">AKTU (B.tech)</h4>
                  <div className="flex flex-col gap-2 pl-2 text-foreground/80">
                    <Link href="/study-material/aktu/btech/1st-year" onClick={closeMobile}>1st Year Notes</Link>
                    <Link href="/study-material/aktu/btech/2nd-year" onClick={closeMobile}>2nd Year Notes</Link>
                    <Link href="/study-material/aktu/btech/3rd-year" onClick={closeMobile}>3rd Year Notes</Link>
                    <Link href="/study-material/aktu/btech/4th-year" onClick={closeMobile}>4th Year Notes</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">PSIT (Autonomous)</h4>
                  <div className="flex flex-col gap-2 pl-2 text-foreground/80">
                    <Link href="/study-material/psit/btech/1st-year" onClick={closeMobile}>1st Year Notes</Link>
                    <Link href="/study-material/psit/btech/2nd-year" onClick={closeMobile}>2nd Year Notes</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">CSJMU</h4>
                  <div className="flex flex-col gap-2 pl-2 text-foreground/80">
                    <Link href="/study-material/csjmu/bca" onClick={closeMobile}>BCA Notes</Link>
                    <Link href="/study-material/csjmu/bba" onClick={closeMobile}>BBA Notes</Link>
                  </div>
                </div>
              </div>
            </details>

            {/* PYQs Accordion */}
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-2 font-medium text-lg cursor-pointer border-b border-border/50">
                PYQs
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:-rotate-180" />
              </summary>
              <div className="p-4 space-y-6 bg-muted/30 rounded-b-md">
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">AKTU</h4>
                  <div className="flex flex-col gap-2 pl-2 text-foreground/80">
                    <Link href="/study-material/aktu/btech/1st-year" onClick={closeMobile}>1st Year PYQ</Link>
                    <Link href="/study-material/aktu/btech/2nd-year" onClick={closeMobile}>2nd Year PYQ</Link>
                    <Link href="/study-material/aktu/btech/3rd-year" onClick={closeMobile}>3rd Year PYQ</Link>
                    <Link href="/study-material/aktu/btech/4th-year" onClick={closeMobile}>4th Year PYQ</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">PSIT (Autonomous)</h4>
                  <div className="flex flex-col gap-2 pl-2 text-foreground/80">
                    <Link href="/study-material/psit/btech/1st-year" onClick={closeMobile}>1st Year PYQ</Link>
                    <Link href="/study-material/psit/btech/2nd-year" onClick={closeMobile}>2nd Year PYQ</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">CSJMU</h4>
                  <div className="flex flex-col gap-2 pl-2 text-foreground/80">
                    <Link href="/study-material/csjmu/bca" onClick={closeMobile}>BCA PYQ</Link>
                    <Link href="/study-material/csjmu/bba" onClick={closeMobile}>BBA PYQ</Link>
                  </div>
                </div>
              </div>
            </details>

            {/* Syllabus Accordion */}
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-2 font-medium text-lg cursor-pointer border-b border-border/50">
                Syllabus
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:-rotate-180" />
              </summary>
              <div className="p-4 space-y-4 bg-muted/30 rounded-b-md">
                <div className="flex flex-col gap-3 pl-2 text-foreground/80">
                  <Link href="/AKTU-Syllabus" onClick={closeMobile}>AKTU</Link>
                  <Link href="/PSIT-Syllabus" onClick={closeMobile}>PSIT</Link>
                  <Link href="/CSJMU-Syllabus" onClick={closeMobile}>CSJMU</Link>
                </div>
              </div>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-2 font-medium text-lg cursor-pointer border-b border-border/50">
                AKTU Result
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:-rotate-180" />
              </summary>
                            <Link href={'/result/Aktu-Result'} className="hover:opacity-70 transition-opacity">AKTU Result</Link>
          </details>

          </div>
        )}
      </header>


      {/* Search Dialog (Unchanged) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden shadow-2xl max-w-2xl border-border bg-background">
          <DialogTitle className="sr-only">Search Resources</DialogTitle>
          <Command className="w-full flex h-full flex-col bg-transparent" shouldFilter={false}>
            <CommandInput
              placeholder="Search subjects..."
              className="h-14"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[60vh] overflow-y-auto">
              {isLoading && (
                <div className="p-4 text-center text-sm text-foreground/50 flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Searching Subjects...
                </div>
              )}
              {!isLoading && searchQuery && results.length === 0 && (
                <CommandEmpty>No results found for "{searchQuery}".</CommandEmpty>
              )}
              {!isLoading && results.length > 0 && (
                <CommandGroup heading="Results">
                  {results.map((item) => (
                    <CommandItem
                      key={item._id}
                      value={item._id}
                      onSelect={() => handleSelect(item.path)}
                      className="cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-foreground/60" />
                        <span className="font-medium">{item.subjectName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-muted text-foreground/60 border border-border/50">
                          Sem {item.semester}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}