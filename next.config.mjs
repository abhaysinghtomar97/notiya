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
};

// Use this if your file is named next.config.mjs OR you have "type": "module" in package.json
export default nextConfig; 

