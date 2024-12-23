/** @type {import('next').NextConfig} */

// Extraire le hostname et le protocole de l'URL de Strapi
const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337');

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(':', ''),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.24heures.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'edition-limitee.fr',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 