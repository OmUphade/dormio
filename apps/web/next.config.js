/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
      {
        source: '/hostel/:slug',
        destination: '/listings/:slug',
      },
      {
        source: '/pg/:slug',
        destination: '/listings/:slug',
      },
    ];
  },
};

export default nextConfig;
