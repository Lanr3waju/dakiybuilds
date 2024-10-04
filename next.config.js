/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'okbmlqqydzhugibpwghq.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
      },
    ],
  },
  transpilePackages: ['@mui/x-charts'],
}

module.exports = nextConfig
