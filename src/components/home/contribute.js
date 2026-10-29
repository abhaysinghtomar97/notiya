
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";

const topContributors = [
  {
    name: "Aditi Singh",
    image: "/contributors/female-avatar.png",
  },
  {
    name: "Aman Trivedi",
    image: "/contributors/male-avatar.png",
  },
  {
    name: "Suryansh Tiwari",
    image: "/contributors/male-avatar.png",
  },
  {
    name: "Palak Bajpai",
    image: "/contributors/female-avatar.png",
  },
];

export default function Contribute() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-7 shadow-sm dark:border-amber-900/50 dark:from-amber-950/30 dark:via-background dark:to-orange-950/20 sm:p-12 lg:p-14">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-medium text-amber-800 shadow-sm dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
            <span>Be a part of the Notiya community</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Your notes can make a{" "}
            <span className="text-amber-600 dark:text-amber-400">
              real difference.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Share your notes, PYQs, and study resources with fellow AKTU
            students. What helped you succeed could help someone else too.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contribute"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Contribute Your Notes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-rose-500" />
              <span>Learn together. Grow together.</span>
            </div>
          </div>

          {/* Top contributors */}
          <div className="mx-auto mt-10 max-w-xl border-t border-amber-200/70 pt-7 dark:border-amber-900/50">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Our TOP contributors</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
              {topContributors.map((contributor) => (
                <div
                  key={contributor.name}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-amber-200 transition duration-200 group-hover:-translate-y-1 group-hover:ring-amber-400 dark:border-background dark:ring-amber-800 sm:h-16 sm:w-16">
                    <Image
                      src={contributor.image}
                      alt={contributor.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <span className="max-w-20 truncate text-xs font-medium text-muted-foreground">
                    {contributor.name}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Every shared resource helps someone move forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
