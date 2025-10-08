/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*']
    }
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;
