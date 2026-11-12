"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Maximize2,
  Moon,
  Sun,
  ShieldAlert,
  List,
  X,
  ArrowLeft,
  Lock,
  Loader2,
} from "lucide-react";

// Renders a single PDF page directly onto a native HTML <canvas>
function PdfPageCanvas({
  pdfDoc,
  pageNumber,
  width,
  nightMode,
  watermarkText,
  onPageVisible,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [isVisible, setIsVisible] = useState(pageNumber <= 3);
  const [rendered, setRendered] = useState(false);
  const [pageHeight, setPageHeight] = useState(() => Math.round(width * 1.414));

  // 1. Lazy load when near viewport & update active page counter
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "1000px 0px" }
    );

    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onPageVisible(pageNumber);
      },
      { threshold: 0.45 }
    );

    loadObserver.observe(el);
    activeObserver.observe(el);

    return () => {
      loadObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [pageNumber, onPageVisible]);

  // 2. Draw PDF page onto HTML <canvas>
  useEffect(() => {
    if (!isVisible || !pdfDoc || !canvasRef.current) return;

    let cancelled = false;

    async function renderPage() {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const scaleFactor = width / unscaledViewport.width;
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Crisp Retina/HD text
        const viewport = page.getViewport({ scale: scaleFactor * dpr });

        const displayHeight = Math.round(unscaledViewport.height * scaleFactor);
        setPageHeight(displayHeight);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${displayHeight}px`;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderTask = page.render({
          canvasContext: context,
          viewport,
        });
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!cancelled) setRendered(true);
      } catch (err) {
        if (err?.name !== "RenderingCancelledException") {
          console.error(`Page ${pageNumber} render error:`, err);
        }
      }
    }

    renderPage();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [isVisible, pdfDoc, pageNumber, width]);

  return (
    <div
      ref={containerRef}
      id={`notiya-pdf-page-${pageNumber}`}
      style={{ minHeight: pageHeight + 38, width }}
      className={`relative mb-6 rounded-xl shadow-md overflow-hidden select-none shrink-0 ${
        nightMode ? "bg-zinc-900" : "bg-white"
      }`}
    >
      {/* Top Page Header */}
      <div
        className={`flex items-center justify-between px-6 py-2.5 text-xs border-b ${
          nightMode
            ? "bg-zinc-900 border-zinc-800 text-zinc-400"
            : "bg-white border-slate-100 text-slate-500"
        }`}
      >
        <span className="font-semibold text-blue-600">
          Notiya <span className="font-normal opacity-75">· Study Reader</span>
        </span>
        <span>Page {pageNumber}</span>
      </div>

      {/* Native HTML Canvas */}
      <div
        style={{ minHeight: pageHeight }}
        className={`relative flex items-center justify-center ${
          nightMode ? "invert hue-rotate-180 contrast-95" : ""
        }`}
      >
        <canvas ref={canvasRef} className="block" />
        {!rendered && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            <Loader2 className="animate-spin mr-2" size={18} />
            Rendering page {pageNumber}...
          </div>
        )}
      </div>

      {/* Diagonal Watermark Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-20 flex flex-wrap content-around justify-around opacity-[0.15] select-none">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className={`-rotate-[28deg] whitespace-nowrap font-bold text-base sm:text-lg tracking-wide p-6 ${
              nightMode ? "text-white" : "text-blue-900"
            }`}
          >
            {watermarkText} • Notiya
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PdfPreview({
  driveId,
  pdfUrl,
  subjectCode = "AKTU",
  title = "Study Notes",
  userEmail = "Notiya Student",
  buttonText = "Preview",
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Store the loaded PDF document proxy in a ref + state
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [scale, setScale] = useState(1.0);
  const [nightMode, setNightMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("pages");
  const [outline, setOutline] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pageWidth, setPageWidth] = useState(760);

  const src = driveId
    ? `/api/pdf?driveId=${encodeURIComponent(driveId)}`
    : pdfUrl
    ? `/api/pdf?url=${encodeURIComponent(pdfUrl)}`
    : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load PDF using pdfjs-dist when modal opens
  useEffect(() => {
    if (!open || !src) return;

    let cancelled = false;
    setLoadingPdf(true);
    setFetchError(null);

    async function loadPdfDocument() {
      try {
        // Import pdfjs from react-pdf (which re-exports pdfjs-dist cleanly)
        const { pdfjs } = await import("react-pdf");
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const res = await fetch(src);
        if (!res.ok) throw new Error(`API returned status ${res.status}`);

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("text/html")) {
          throw new Error(
            "Google Drive returned an HTML page instead of a PDF. Make sure the file is shared as 'Anyone with the link'."
          );
        }

        const buffer = await res.arrayBuffer();
        if (cancelled) return;

        const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
        const doc = await loadingTask.promise;
        if (cancelled) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
        setPageInput("1");

        try {
          const extractedOutline = await doc.getOutline();
          setOutline(extractedOutline || []);
        } catch {
          setOutline([]);
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(err.message || "Failed to load PDF.");
        }
      } finally {
        if (!cancelled) {
          setLoadingPdf(false);
        }
      }
    }

    loadPdfDocument();

    return () => {
      cancelled = true;
    };
  }, [open, src]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "s")) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Responsive page width
  useEffect(() => {
    if (!open) return;
    const updateWidth = () => {
      const winW = window.innerWidth;
      const reservedSidebar = sidebarOpen && winW >= 768 ? 320 : 0;
      const available = winW - reservedSidebar - 64;
      setPageWidth(Math.min(Math.max(available, 300), 820));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [open, sidebarOpen]);

  const scrollToPage = (targetPage) => {
    if (!numPages) return;
    const clamped = Math.min(Math.max(targetPage, 1), numPages);
    setCurrentPage(clamped);
    setPageInput(String(clamped));
    const pageEl = document.getElementById(`notiya-pdf-page-${clamped}`);
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageVisible = useCallback((visiblePage) => {
    setCurrentPage((prev) => {
      if (prev !== visiblePage) {
        setPageInput(String(visiblePage));
        return visiblePage;
      }
      return prev;
    });
  }, []);

  if (!src) return null;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-muted"
      >
        <Eye size={18} />
        {buttonText}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            className={`fixed inset-0 z-[9999] flex flex-col h-screen w-screen select-none overflow-hidden overscroll-contain ${
              nightMode
                ? "bg-zinc-950 text-zinc-100"
                : "bg-[#eef2f6] text-slate-900"
            }`}
          >
            {/* ================= TOP HEADER BAR ================= */}
            <header
              className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b shrink-0 z-30 ${
                nightMode
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Left: Back Button + Subject Code + Title */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                  title="Back"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
                      {subjectCode}
                    </span>
                    <h1 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                      {title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-0.5">
                    <Lock size={11} />
                    <span>100%· Free </span>
                  </div>
                </div>
              </div>

              {/* Center: Page Counter + Zoom Controls */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                    nightMode
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => scrollToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="p-1 hover:text-blue-600 disabled:opacity-30"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  <span className="text-slate-500">Page</span>
                  <input
                    type="text"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = parseInt(pageInput, 10);
                        if (!isNaN(val)) scrollToPage(val);
                      }
                    }}
                    onBlur={() => {
                      const val = parseInt(pageInput, 10);
                      if (!isNaN(val)) scrollToPage(val);
                      else setPageInput(String(currentPage));
                    }}
                    className={`w-10 text-center font-semibold rounded border py-0.5 ${
                      nightMode
                        ? "bg-zinc-900 border-zinc-700 text-white"
                        : "bg-white border-slate-300 text-slate-900"
                    }`}
                  />
                  <span className="text-slate-500">of {numPages || "--"}</span>

                  <button
                    type="button"
                    onClick={() => scrollToPage(currentPage + 1)}
                    disabled={!numPages || currentPage >= numPages}
                    className="p-1 hover:text-blue-600 disabled:opacity-30"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="hidden md:flex items-center gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      setScale((s) => Math.max(+(s - 0.15).toFixed(2), 0.6))
                    }
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-zinc-800"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-11 text-center font-medium">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setScale((s) => Math.min(+(s + 0.15).toFixed(2), 2.0))
                    }
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-zinc-800"
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setScale(1.0)}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-zinc-800"
                    title="Reset Zoom"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Right: Night Mode + Protected Pill + Sidebar Toggle + Exit Reader */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNightMode((n) => !n)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                    nightMode
                      ? "bg-zinc-800 border-zinc-700 text-amber-400"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {nightMode ? <Sun size={14} /> : <Moon size={14} />}
                  <span className="hidden sm:inline">
                    {nightMode ? "Light" : "Night"}
                  </span>
                </button>

                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium max-w-[230px] truncate">
                  <ShieldAlert size={14} className="text-amber-600 shrink-0" />
                  <span className="truncate">Protected · {userEmail}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSidebarOpen((o) => !o)}
                  className={`p-2 rounded-lg border transition ${
                    sidebarOpen
                      ? "bg-blue-50 border-blue-200 text-blue-600"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                  title="Toggle Document Navigator"
                >
                  <List size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                    nightMode
                      ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <X size={14} />
                  <span className="hidden sm:inline">Exit reader</span>
                </button>
              </div>
            </header>

            {/* ================= MAIN BODY ================= */}
            <div className="flex flex-1 overflow-hidden">
              {/* Center Scrollable PDF Viewport */}
              <div className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-3 sm:px-6">
                {fetchError ? (
                  <div className="flex flex-col items-center justify-center h-64 text-red-500 text-sm text-center max-w-md px-4">
                    <p className="font-semibold mb-1">Could not load PDF</p>
                    <p className="text-xs opacity-80">{fetchError}</p>
                  </div>
                ) : loadingPdf || !pdfDoc ? (
                  <div className="flex items-center gap-2 h-64 text-slate-500 text-sm">
                    <Loader2 className="animate-spin" size={20} />
                    Loading PDF pages...
                  </div>
                ) : (
                  Array.from({ length: numPages }, (_, index) => (
                    <PdfPageCanvas
                      key={index + 1}
                      pdfDoc={pdfDoc}
                      pageNumber={index + 1}
                      width={Math.round(pageWidth * scale)}
                      nightMode={nightMode}
                      watermarkText={userEmail}
                      onPageVisible={handlePageVisible}
                    />
                  ))
                )}
              </div>

              {/* Right Document Navigator Sidebar */}
              {sidebarOpen && (
                <aside
                  className={`hidden md:flex w-80 border-l flex-col justify-between shrink-0 ${
                    nightMode
                      ? "bg-zinc-900 border-zinc-800"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="p-4 overflow-y-auto flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <List size={16} className="text-blue-600" />
                        <span>Document navigator</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {numPages || "--"} pages
                      </span>
                    </div>

                    <div
                      className={`grid grid-cols-2 p-1 rounded-lg mb-4 text-xs font-medium ${
                        nightMode ? "bg-zinc-800" : "bg-slate-100"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveTab("contents")}
                        className={`py-1.5 rounded-md transition ${
                          activeTab === "contents"
                            ? nightMode
                              ? "bg-zinc-900 text-blue-400 shadow-sm"
                              : "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        Contents
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("pages")}
                        className={`py-1.5 rounded-md transition ${
                          activeTab === "pages"
                            ? nightMode
                              ? "bg-zinc-900 text-blue-400 shadow-sm"
                              : "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        Pages
                      </button>
                    </div>

                    {activeTab === "contents" ? (
                      outline.length > 0 ? (
                        <ul className="space-y-1.5 text-xs">
                          {outline.map((item, i) => (
                            <li key={i}>
                              <button
                                type="button"
                                onClick={() => setActiveTab("pages")}
                                className="text-left w-full px-2.5 py-2 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 truncate"
                              >
                                {item.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-500 leading-relaxed">
                          This PDF has no table of contents. Use{" "}
                          <button
                            type="button"
                            onClick={() => setActiveTab("pages")}
                            className="font-semibold text-slate-800 dark:text-zinc-200 underline"
                          >
                            Pages
                          </button>{" "}
                          to jump around.
                        </p>
                      )
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {numPages > 0 &&
                          Array.from({ length: numPages }, (_, i) => {
                            const p = i + 1;
                            const isCurrent = p === currentPage;
                            return (
                              <button
                                type="button"
                                key={p}
                                onClick={() => scrollToPage(p)}
                                className={`py-2 rounded-lg border text-xs font-medium transition ${
                                  isCurrent
                                    ? "border-blue-600 bg-blue-50 text-blue-600 font-bold"
                                    : nightMode
                                    ? "border-zinc-800 hover:bg-zinc-800"
                                    : "border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                {p}
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-3.5 border-t text-[11px] leading-normal flex items-start gap-2 ${
                      nightMode
                        ? "border-zinc-800 text-zinc-400 bg-zinc-900/50"
                        : "border-slate-200 text-slate-500 bg-slate-50/70"
                    }`}
                  >
                    <ShieldAlert
                      size={15}
                      className="text-amber-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Share it with your friend .
                    </span>
                  </div>
                </aside>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}