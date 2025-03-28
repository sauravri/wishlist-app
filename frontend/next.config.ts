/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',// Allows images from ANY https domain
      },
    ],
  },
};

export default nextConfig;
