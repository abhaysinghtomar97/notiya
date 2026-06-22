"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

export default function VideosSection({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Video Lectures
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Video Player */}

        <div className="lg:col-span-2">

          <div className="overflow-hidden rounded-2xl border">

            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

          </div>

          <div className="mt-4">

            <h3 className="text-xl font-semibold">
              {selectedVideo.title}
            </h3>

            <p className="text-muted-foreground mt-1">
              Unit {selectedVideo.unit}
            </p>

          </div>

        </div>

        {/* Playlist */}

        <div className="border rounded-2xl overflow-hidden">

          <div className="p-4 border-b">

            <h3 className="font-semibold">
              Playlist
            </h3>

          </div>

          <div className="max-h-[550px] overflow-y-auto">

            {[...videos]
              .sort((a, b) => a.unit - b.unit)
              .map((video, index) => (

                <button
                  key={index}
                  onClick={() => setSelectedVideo(video)}
                  className={`w-full flex gap-3 p-3 text-left transition hover:bg-muted
                  ${
                    selectedVideo.youtubeId === video.youtubeId
                      ? "bg-muted"
                      : ""
                  }`}
                >

                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    width={140}
                    height={80}
                    className="rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1">

                    <div className="flex items-center gap-2">

                      <PlayCircle
                        size={18}
                        className="text-red-500"
                      />

                      <span className="text-xs text-muted-foreground">
                        Unit {video.unit}
                      </span>

                    </div>

                    <p className="font-medium mt-2 line-clamp-2">
                      {video.title}
                    </p>

                  </div>

                </button>

              ))}

          </div>

        </div>

      </div>

    </section>
  );
}