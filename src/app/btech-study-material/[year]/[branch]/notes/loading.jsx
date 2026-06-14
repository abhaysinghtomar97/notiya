export default function Loading() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
      
      {/* Header Skeleton */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
        <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <div className="h-5 w-24 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </div>

      {/* Rows */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800"
        >
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />

            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-32 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>
      ))}
    </div>
  );
}