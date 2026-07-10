"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsappFloatingButton() {
  return (
    <>
      {/* Desktop */}
      <a
        href="https://whatsapp.com/channel/0029VbDcifPLdQelA2tKNl3e"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Notiya WhatsApp Channel"
        className="group fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:flex"
      >
        <div className="flex items-center rounded-l-2xl bg-[#25D366] px-3 py-4 shadow-2xl transition-all duration-300 group-hover:pr-6">
          <MessageCircle className="h-7 w-7 text-white" />

          <div className="ml-3 max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
            <p className="text-sm font-bold text-white">
              Follow WhatsApp
            </p>
            <p className="text-xs text-green-100">
              Daily Notes & Updates
            </p>
          </div>
        </div>
      </a>

     
    </>
  );
}