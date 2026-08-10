import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: '/admin/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
