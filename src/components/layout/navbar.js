'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams, usePathname } from 'next/navigation';
import axios from 'axios';
import { useTheme } from 'next-themes';

import {
  UploadCloud, ArrowUpRight,
  Search, Moon, Sun, FileText, Loader2, Menu as MenuIcon, X,
  ChevronDown, User as UserIcon, LogOut, Zap,
} from 'lucide-react';

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/* =====================================================================
   1. NAV DATA — single source of truth for desktop, mobile and search.
   To add a college/year/link, edit ONLY this section.
   NOTE: PYQ links use ?tab=pyq as a placeholder; change to your real route.
   ===================================================================== */

const ORD = ['1st', '2nd', '3rd', '4th'];

const years = (base, n) =>
  ORD.slice(0, n).map((o) => ({
    label: `${o} Year`,
    notes: `${base}/${o}-year`,
    pyq: `${base}/${o}-year?tab=pyq`,
  }));

const course = (label, href) => ({ label, notes: href, pyq: `${href}?tab=pyq` });

const UNIVERSITIES = [
  { name: 'AKTU', sub: 'B.Tech', rows: years('/study-material/aktu/btech', 4) },
  { name: 'PSIT', sub: 'B.Tech · Autonomous', rows: years('/study-material/psit/btech', 2) },
  {
    name: 'CSJMU',
    sub: 'BCA · BBA',
    rows: [course('BCA', '/study-material/csjmu/bca'), course('BBA', '/study-material/csjmu/bba')],
  },
];

const SYLLABUS = [
  { label: 'AKTU', href: '/AKTU-Syllabus' },
  { label: 'PSIT', href: '/PSIT-Syllabus' },
  { label: 'CSJMU', href: '/CSJMU-Syllabus' },
];

// Shown in the search dialog before the user types anything
const QUICK_LINKS = [
  { label: 'AKTU 1st Year Notes', href: '/study-material/aktu/btech/1st-year' },
  { label: 'AKTU 1st Year PYQ', href: '/study-material/aktu/btech/1st-year?tab=pyq' },
  { label: 'GATE Papers', href: '/gate' },
  { label: 'Notices & Updates', href: '/updates' },
];

/* =====================================================================
   2. SMALL SHARED PIECES
   ===================================================================== */

const itemBase =
  'rounded-md px-3 py-1.5 transition-colors hover:bg-amber-50 hover:text-amber-700 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ' +
  'dark:hover:bg-amber-950/40 dark:hover:text-amber-400';

function NavLink({ href, children, className, onClick }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(itemBase, active && 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400', className)}
    >
      {children}
    </Link>
  );
}

function Pill({ href, children, onClick, large }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'rounded-md border border-border font-medium transition-colors hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-amber-950/40 dark:hover:text-amber-400',
        large ? 'px-3.5 py-2 text-sm' : 'px-2.5 py-1 text-xs'
      )}
    >
      {children}
    </Link>
  );
}

/* CSS-only dropdown: opens on hover AND keyboard focus, no flicker */
function Dropdown({ label, children }) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className={cn(itemBase, 'flex items-center gap-1')}>
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      {/* pt-2 = invisible hover bridge so the menu doesn't close in the gap */}
      <div
        className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150
                   group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="rounded-xl border border-border bg-background p-4 shadow-lg">{children}</div>
      </div>
    </div>
  );
}

function PremiumLink({ onClick, className }) {
  return (
    <Link
      href="/premium-resources"
      onClick={onClick}
      className={cn(
        'flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-semibold text-amber-700',
        'transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
        'dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
        className
      )}
    >
      Premium Resources
      <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">FREE</span>
    </Link>
  );
}

/* =====================================================================
   3. NAVBAR
   ===================================================================== */

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const userMenuRef = useRef(null);
  const activeBranchContext = params?.branch || null;

  const closeMobile = useCallback(() => setIsMobileMenuOpen(false), []);

  /* ---------- Auth: read user + listen for changes ---------- */
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem('user');
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null); // corrupted value shouldn't crash the navbar
      }
    };
    loadUser();
    window.addEventListener('auth-change', loadUser);
    return () => window.removeEventListener('auth-change', loadUser);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (!res.ok) throw new Error('Logout failed');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-change'));
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /* ---------- Close menus on route change / outside click / Esc ---------- */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  // Stop the page behind the mobile menu from scrolling
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  /* ---------- Search: Ctrl/Cmd+K + custom 'open-search' event ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    const onCustomOpen = () => setSearchOpen(true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('open-search', onCustomOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('open-search', onCustomOpen);
    };
  }, []);

  /* ---------- Debounced API search (cancels stale requests) ---------- */
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/api/subject', {
          params: { input: q, currentBranch: activeBranchContext },
          signal: controller.signal,
        });
        setResults(data.subject ?? []);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return; // newer request took over
        console.error('Search failed:', error);
        setResults([]);
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, activeBranchContext]);

  const goTo = (href) => {
    setSearchOpen(false);
    setSearchQuery('');
    router.push(href);
  };

  /* =================================================================== */

  return (
    <>
      {/* NOTE: removed `relative` — it overrode `sticky` so the header never stuck */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* ---------- Logo ---------- */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="Notiya home">
            <Image src="/logo.svg" alt="" width={40} height={40} priority />
            <span className="font-serif text-2xl font-bold tracking-tight text-amber-700">NOTIYA</span>
          </Link>

          {/* ---------- Desktop nav (lg+) ---------- */}
          <nav
            aria-label="Main"
            className="hidden flex-1 items-center gap-1 text-sm font-medium text-foreground/80 lg:flex"
          >
            <NavLink href="/">Home</NavLink>

            {/* Notes + PYQs merged: university → year → Notes | PYQ */}
            <Dropdown label="Notes & PYQs">
              <div className="grid w-[34rem] grid-cols-3 gap-6">
                {UNIVERSITIES.map((u) => (
                  <div key={u.name}>
                    <p className="font-semibold text-amber-600">{u.name}</p>
                    <p className="mb-3 text-xs text-foreground/60">{u.sub}</p>
                    <ul className="space-y-2">
                      {u.rows.map((r) => (
                        <li key={r.label} className="flex items-center justify-between gap-2">
                          <span className="text-sm">{r.label}</span>
                          <span className="flex gap-1">
                            <Pill href={r.notes}>Notes</Pill>
                            <Pill href={r.pyq}>PYQ</Pill>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Dropdown>

            <Dropdown label="Syllabus">
              <ul className="w-44 space-y-1">
                {SYLLABUS.map((s) => (
                  <li key={s.href}>
                    <NavLink href={s.href} className="block">{s.label}</NavLink>
                  </li>
                ))}
              </ul>
            </Dropdown>

            <NavLink href="/gate">GATE Papers</NavLink>
            <NavLink href="/updates">Notices &amp; Updates</NavLink>
            <Link
              href="/contribute"
              className="group relative inline-flex items-center gap-2.5 rounded-full 
    bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white 
    shadow-sm shadow-amber-900/20 ring-1 ring-inset ring-black/10 
    transition-all duration-200 
    hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md hover:shadow-amber-900/30 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <UploadCloud
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />

              <span>Contribute Notes</span>

              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="opacity-70 transition-all duration-200 
      group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </Link>
            <PremiumLink className="ml-auto text-sm" />
          </nav>


          {/* ---------- Right actions ---------- */}
          <div className="flex items-center gap-1.5">
            {/* Search: full bar on lg+, icon on smaller screens (was missing on mobile) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden w-60 items-center justify-between rounded-md border border-border px-3 py-1.5 text-sm text-foreground/60 transition-colors hover:bg-muted lg:flex"
            >
              <span className="flex items-center gap-2"><Search className="h-4 w-4" /> Search subjects...</span>
              <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                Ctrl K
              </kbd>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search subjects"
              className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-muted lg:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-muted"
            >
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="hidden h-4 w-4 dark:block" />
            </button>

            {/* Auth */}
            {user ? (
              <div ref={userMenuRef} className="group relative flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((p) => !p)}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-amber-600 text-white transition-all hover:ring-2 hover:ring-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {user.picture ? (
                    <Image src={user.picture} alt={user.name || 'User'} width={32} height={32} className="rounded-full object-cover" />
                  ) : (
                    <UserIcon className="h-5 w-5" />
                  )}
                </button>

                <div
                  className={cn(
                    'absolute right-0 top-full z-50 pt-3 transition-all duration-200',
                    isUserMenuOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible translate-y-1 opacity-0 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100'
                  )}
                >
                  <div className="flex w-52 flex-col gap-1 rounded-xl border border-border bg-background p-2 shadow-lg">
                    <div className="mb-1 border-b border-border px-3 py-2">
                      <p className="truncate text-sm font-medium">{user.name || 'User'}</p>
                      <p className="truncate text-xs text-foreground/60">{user.email}</p>
                    </div>

                    {['ADMIN', 'SUPERADMIN'].includes(user.role) && (
                      <Link href="/admin" className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted">
                        Admin Portal
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
              >
                Sign in
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-muted lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ---------- Mobile menu (below lg) ---------- */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile"
            className="absolute left-0 top-14 z-50 flex h-[calc(100dvh-3.5rem)] w-full flex-col gap-1 overflow-y-auto border-t border-border bg-background p-4 shadow-xl lg:hidden"
          >
            <NavLink href="/" onClick={closeMobile} className="py-3 text-lg">Home</NavLink>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-3 text-lg font-medium hover:bg-muted">
                Notes &amp; PYQs
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:-rotate-180" />
              </summary>
              <div className="space-y-5 rounded-b-md bg-muted/30 p-4">
                {UNIVERSITIES.map((u) => (
                  <div key={u.name}>
                    <p className="mb-2 font-semibold text-amber-600">
                      {u.name} <span className="text-xs font-normal text-foreground/60">{u.sub}</span>
                    </p>
                    <ul className="space-y-2">
                      {u.rows.map((r) => (
                        <li key={r.label} className="flex items-center justify-between gap-2">
                          <span>{r.label}</span>
                          <span className="flex gap-2">
                            <Pill large href={r.notes} onClick={closeMobile}>Notes</Pill>
                            <Pill large href={r.pyq} onClick={closeMobile}>PYQ</Pill>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-3 text-lg font-medium hover:bg-muted">
                Syllabus
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:-rotate-180" />
              </summary>
              <ul className="rounded-b-md bg-muted/30 p-2">
                {SYLLABUS.map((s) => (
                  <li key={s.href}>
                    <NavLink href={s.href} onClick={closeMobile} className="block py-3">{s.label}</NavLink>
                  </li>
                ))}
              </ul>
            </details>

            <NavLink href="/gate" onClick={closeMobile} className="py-3 text-lg">GATE Papers</NavLink>
            <NavLink href="/updates" onClick={closeMobile} className="py-3 text-lg">Notices &amp; Updates</NavLink>
            <PremiumLink onClick={closeMobile} className="mx-3 mt-2 py-2 text-base" />

            <Link
              href="/contribute"
              className="group relative inline-flex items-center gap-2.5 rounded-full 
                bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white 
                shadow-sm shadow-amber-900/20 ring-1 ring-inset ring-black/10 
                transition-all duration-200 
                hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md hover:shadow-amber-900/30 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <UploadCloud
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />

              <span>Contribute Notes</span>

              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="opacity-70 transition-all duration-200 
               group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </Link>
          </nav>
        )}
      </header>

      {/* ---------- Search dialog ---------- */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl overflow-hidden border-border bg-background p-0 shadow-2xl">
          <DialogTitle className="sr-only">Search resources</DialogTitle>
          <Command className="flex h-full w-full flex-col bg-transparent" shouldFilter={false}>
            <CommandInput
              placeholder="Search subjects, e.g. Data Structures"
              className="h-14"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[60vh] overflow-y-auto">
              {/* Empty state: give direction instead of a blank box */}
              {!searchQuery.trim() && (
                <CommandGroup heading="Quick links">
                  {QUICK_LINKS.map((l) => (
                    <CommandItem key={l.href} value={l.href} onSelect={() => goTo(l.href)} className="cursor-pointer gap-2">
                      <Zap className="h-4 w-4 text-amber-600" /> {l.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {isLoading && (
                <div className="flex items-center justify-center gap-2 p-4 text-sm text-foreground/50">
                  <Loader2 className="h-4 w-4 animate-spin" /> Searching...
                </div>
              )}

              {!isLoading && searchQuery.trim() && results.length === 0 && (
                <CommandEmpty>No subjects found for “{searchQuery}”. Try a shorter keyword.</CommandEmpty>
              )}

              {!isLoading && results.length > 0 && (
                <CommandGroup heading="Results">
                  {results.map((item) => (
                    <CommandItem
                      key={item._id}
                      value={item._id}
                      onSelect={() => goTo(`/study-material/${item.path}`)}
                      className="flex cursor-pointer items-center justify-between gap-2"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-foreground/60" />
                        <span className="truncate font-medium">{item.subjectName}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span className="rounded-full border border-border/50 bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-700">
                          {item.course}
                        </span>
                        <span className="rounded-full border border-border/50 bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-700">
                          Sem {item.semester}
                        </span>
                      </span>
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