
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  PlayCircle,
  Video,
  ListVideo,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function VideosSection({ videos = [] }) {
  const validVideos = useMemo(
    () =>
      videos.filter(
        (video) =>
          video &&
          typeof video.title === "string" &&
          video.title.trim() &&
          typeof video.youtubeId === "string" &&
          /^[a-zA-Z0-9_-]{11}$/.test(video.youtubeId)
      ),
    [videos]
  );

  const [selectedVideoId, setSelectedVideoId] = useState(
    validVideos[0]?.youtubeId ?? null
  );

  const sortedVideos = useMemo(
    () =>
      [...validVideos].sort(
        (a, b) => Number(a.unit || 0) - Number(b.unit || 0)
      ),
    [validVideos]
  );

  const selectedVideo =
    sortedVideos.find((video) => video.youtubeId === selectedVideoId) ??
    sortedVideos[0] ??
    null;

  if (sortedVideos.length === 0) {
    return (
      <section className="w-full">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
            <Video size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Video Lectures
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No video lectures are available for this subject yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="w-full scroll-mt-24">
      {/* Section header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
            <Video size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Video Lectures
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Watch lectures and revise concepts unit by unit.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium">
          {sortedVideos.length}{" "}
          {sortedVideos.length === 1 ? "lecture" : "lectures"}
        </span>
      </div>

      {/* Player and playlist */}
      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Main video player */}
        <div className="min-w-0 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="relative aspect-video w-full bg-black">
              {selectedVideo && (
                <iframe
                  key={selectedVideo.youtubeId}
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>

            {selectedVideo && (
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-400/10 dark:text-amber-400">
                    {selectedVideo.unit != null &&
                    String(selectedVideo.unit).trim() !== ""
                      ? `Unit ${selectedVideo.unit}`
                      : "Lecture"}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    Lecture {sortedVideos.findIndex(
                      (video) =>
                        video.youtubeId === selectedVideo.youtubeId
                    ) + 1}{" "}
                    of {sortedVideos.length}
                  </span>
                </div>

                <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                  {selectedVideo.title}
                </h3>

                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Watch on YouTube
                  <ExternalLink size={15} />
                </a>
              </div>
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Tip: Watch the lecture alongside the relevant unit notes, then
            practise questions to check your understanding.
          </p>
        </div>

        {/* Playlist */}
        <aside className="overflow-hidden rounded-2xl border bg-card">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <ListVideo size={19} />
              <h3 className="font-semibold">Lecture playlist</h3>
            </div>

            <span className="text-xs text-muted-foreground">
              {sortedVideos.length} videos
            </span>
          </div>

          <div
            className="max-h-[440px] overflow-y-auto"
            aria-label="Available video lectures"
          >
            {sortedVideos.map((video, index) => {
              const isSelected =
                video.youtubeId === selectedVideo?.youtubeId;

              return (
                <button
                  key={video.youtubeId}
                  type="button"
                  onClick={() => setSelectedVideoId(video.youtubeId)}
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={`Play lecture ${index + 1}: ${video.title}`}
                  className={`flex w-full gap-3 border-b p-3 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                    isSelected
                      ? "bg-amber-50 dark:bg-amber-400/10"
                      : "hover:bg-muted/60"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-32">
                    <Image
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 112px, 128px"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      {isSelected ? (
                        <CheckCircle2
                          size={25}
                          className="text-white drop-shadow"
                        />
                      ) : (
                        <PlayCircle
                          size={27}
                          className="text-white drop-shadow"
                        />
                      )}
                    </div>
                  </div>

                  {/* Video information */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {video.unit != null &&
                      String(video.unit).trim() !== ""
                        ? `Unit ${video.unit}`
                        : "Lecture"}{" "}
                      · {index + 1}
                    </span>

                    <p className="mt-1 line-clamp-3 text-sm font-medium leading-5">
                      {video.title}
                    </p>

                    {isSelected && (
                      <span className="mt-2 inline-block text-xs font-semibold text-amber-700 dark:text-amber-400">
                        Now selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
