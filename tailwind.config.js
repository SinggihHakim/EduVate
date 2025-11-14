/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Izinkan SVG (Dibutuhkan untuk placehold.co)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img-c.udemycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'tse4.mm.bing.net',
      }
    ],
  },
};

module.exports = nextConfig;