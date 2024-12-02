/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['edition-limitee.fr', 'www.24heures.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 