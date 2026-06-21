"use client";

import { useState } from "react";
import { FiPlayCircle } from "react-icons/fi";

export default function VideoPlaylist({ videos }) {
  if (!videos || videos.length === 0) return null;

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Active Video Player (Iframe) */}
        <div className="lg:w-2/3 bg-black relative">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0`}
            title={activeVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Playlist Scrollable Sidebar */}
        <div className="lg:w-1/3 flex flex-col bg-zinc-950 border-l border-zinc-800 h-full">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900">
            <h3 className="text-lg font-semibold text-white">Video Lectures</h3>
            <p className="text-xs text-zinc-400">{videos.length} videos available</p>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
            {videos.map((video, index) => {
              const isActive = activeVideo.id === video.id;
              return (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 border border-cyan-500/50"
                      : "hover:bg-zinc-800 border border-transparent"
                  }`}
                >
                  <span className="text-zinc-500 text-sm mt-0.5 w-4 shrink-0 text-center">
                    {isActive ? <FiPlayCircle className="text-cyan-400" /> : index + 1}
                  </span>
                  <div>
                    <p className={`text-sm font-medium line-clamp-2 ${isActive ? "text-cyan-400" : "text-zinc-200"}`}>
                      {video.title}
                    </p>
                    {video.unit && (
                      <span className="text-xs text-zinc-500">Unit {video.unit}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}