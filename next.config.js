/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com', 'i.scdn.co'],
  },
}

module.exports = nextConfig
