"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PdfPreview from '../pdfPreview';

export default function PremiumResources() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set target date to exactly 30 days from the moment the component loads
    const targetDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const premiumResources = [
    { 
      name: 'Advanced Python Mastery', 
      meta: 'High-Quality PDF • 500 Pages', 
      tag: 'Best Seller',
      originalPrice: 99,
      link: '/premium-resources'
    },
    { 
      name: 'DSA Interview Crash Course', 
      meta: 'Top 100 Questions • Cheatsheet', 
      tag: 'Highly Rated',
      originalPrice: 99,
      link: '/premium-resources' 
    },
    { 
      name: 'Machine Learning Deep Dive', 
      meta: 'Colab Notebooks + PDF Guide', 
      tag: 'New',
      originalPrice: 99,
      link: '/premium-resources' 
    },
    { 
      name: 'System Design Pro', 
      meta: 'Architecture Diagrams • Case Studies', 
      tag: 'Trending',
      originalPrice: 99,
      link: '/premium-resources' 
    },
  ];

  return (
    <section className="py-8">
      {/* Header Section with Title, Timer, and See All */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600">
              Premium Resources
            </h2>
            <span className="px-3 py-1 text-[10px] font-bold tracking-widest text-amber-900 bg-amber-400 rounded-full uppercase shadow-sm animate-pulse">
              100% OFF
            </span>
          </div>
          
          {/* Client-side only rendering to prevent Next.js hydration errors */}
          {mounted && (
            <div className="inline-flex items-center gap-2 text-sm font-mono bg-white text-red-600 px-3 py-1.5 rounded-lg border border-red-500/20 w-fit">
              <span>⏳ Offer ends in:</span>
              <span className="font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          )}
        </div>

        {/* See All Button */}
        <Link 
          href="/premium-resources" 
          className="group flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-amber-500 transition-colors pb-1"
        >
          See All 
          <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
        </Link>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {premiumResources.map((res, idx) => (
          <div 
            key={idx} 
            className="group relative rounded-2xl bg-gradient-to-b from-border/80 to-transparent p-[1px] transition-all duration-300 hover:bg-gradient-to-b hover:from-amber-500/50 hover:to-amber-500/10 hover:shadow-xl hover:shadow-amber-500/10"
          >
            <div className="h-full flex flex-col justify-between bg-background rounded-2xl p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-amber-500/0 blur-2xl group-hover:bg-amber-500/10 transition-all duration-500"></div>

              <div className="relative z-10">
                {res.tag && (
                  <span className="inline-block px-2.5 py-1 mb-4 text-[10px] font-semibold text-amber-500 bg-amber-500/10 rounded-md border border-amber-500/20">
                    {res.tag}
                  </span>
                )}
                <h3 className="font-bold text-lg text-foreground leading-snug mb-2 group-hover:text-amber-500 transition-colors">
                  {res.name}
                </h3>
                <p className="text-sm text-foreground/60">{res.meta}</p>
              </div>

              <div className="relative z-10 mt-6 pt-5 border-t border-border/50 flex flex-col gap-4">
                
                {/* Pricing Area */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-500">Free</span>
                  <span className="text-sm text-foreground/40 line-through decoration-red-500/50">
                    ₹{res.originalPrice}
                  </span>
                  <span className="font-bold text-red-600">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
                </div>
                
                  <PdfPreview pdfUrl={res.link} />
                

                <Link 
                  href={res.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 px-4 bg-foreground text-background text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-amber-500 hover:text-white shadow-md hover:shadow-amber-500/25 active:scale-[0.98]"
                >
                  Download Now
                </Link>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}