/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google's image CDN added here
      },
    ],
  },
  // 1. For Next.js 16 Turbopack (default)
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.js",
    },
  },

  // 2. Fallback if you ever run with --webpack
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

// Use this if your file is named next.config.mjs OR you have "type": "module" in package.json
export default nextConfig; 

