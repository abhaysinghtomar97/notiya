'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Moon, Sun, FileText, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/Components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

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
    // If input is empty, clear results and stop
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Debounce: Wait 300ms after user stops typing before hitting the database
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      
      try {
        // Replace this with your actual API endpoint
        // Example: /api/search?q=dbms
        const response = await axios.get(`/api/notes`);
        console.log(encodeURIComponent(searchQuery))
       console.log(response)
        
        // Assuming your API returns an array of documents
        setResults(response.data.data); 
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
    setSearchQuery(''); // Reset search on close
    router.push(url);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-2xl tracking-tight text-main  ">
              NOTIYA
            </Link>
            <nav className="hidden md:flex gap-4 text-sm font-medium text-foreground/80">
              <Link href="/btech-study-material" className="hover:text-main transition-colors">Notes</Link>
              <Link href="/pyqs" className="hover:text-main transition-colors">PYQs</Link>
              <Link href="/syllabus" className="hover:text-main transition-colors">Syllabus</Link>
              <Link href="/important" className="hover:text-main transition-colors">Important</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/60 border border-border rounded-md hover:bg-muted transition-colors md:w-64 justify-between">
              <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Search...</span>
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </button>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-foreground/60 hover:bg-muted rounded-md transition-colors"
            >
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </button>
          </div>
        </div>
      </header>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden shadow-2xl max-w-2xl border-border bg-background">
          <DialogTitle className="sr-only">Search Resources</DialogTitle>
          
          {/* CRITICAL: shouldFilter={false} stops cmdk from filtering client-side */}
          <Command className="w-full flex h-full flex-col bg-transparent" shouldFilter={false}>
            <CommandInput 
              placeholder="Search notes, PYQs, subjects..." 
              className="h-14" 
              value={searchQuery}
              onValueChange={setSearchQuery} // Capture user typing
            />
            
            <CommandList className="max-h-[60vh] overflow-y-auto">
              {/* Handle Loading State */}
              {isLoading && (
                <div className="p-4 text-center text-sm text-foreground/50 flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Searching database...
                </div>
              )}

              {/* Handle Empty State */}
              {!isLoading && searchQuery && results.length === 0 && (
                <CommandEmpty>No results found for "{searchQuery}".</CommandEmpty>
              )}

              {/* Render Server Results */}
              {!isLoading && results.length > 0 && (
                <CommandGroup heading="Results">
                  {results.map((item) => (
                    <CommandItem
                      key={item._id}
                      value={item._id} // Value doesn't matter for filtering anymore, just needs to be unique
                      onSelect={() => handleSelect(item.url)}
                      className="cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-foreground/60" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-muted text-foreground/60 border border-border/50">
                          Sem {item.semester}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-muted text-foreground/60 border border-border/50 hidden sm:inline-block">
                          {item.subject}
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