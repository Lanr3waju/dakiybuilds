/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'okbmlqqydzhugibpwghq.supabase.co',
            },
        ],
    }
}

module.exports = nextConfig
