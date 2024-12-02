import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { ClientCookieBanner } from '@/components/shared/ClientCookieBanner';
import { ClientWrapper } from '@/components/shared/ClientWrapper';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://24heures.org'),
  title: {
    default: "24h de l'INSA - Le plus grand festival étudiant de France",
    template: "%s | 24h de l'INSA"
  },
  description: "Festival étudiant majeur en France, les 24h de l'INSA reviennent pour leur 50e édition avec 3 jours de musique, de culture et de partage sur le campus de la Doua.",
  keywords: ["festival", "musique", "étudiant", "INSA Lyon", "concert", "culture", "Lyon", "Villeurbanne"],
  authors: [{ name: "24h de l'INSA" }],
  creator: "24h de l'INSA",
  publisher: "24h de l'INSA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "24h de l'INSA - 50e édition",
    description: "Le plus grand festival étudiant de France revient pour sa 50e édition. Trois jours de musique, de culture et de partage sur le campus de la Doua.",
    url: 'https://24heures.org',
    siteName: "24h de l'INSA",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "24h de l'INSA - 50e édition",
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "24h de l'INSA - 50e édition",
    description: "Le plus grand festival étudiant de France revient pour sa 50e édition.",
    images: ['/images/twitter-image.jpg'],
    creator: '@24hINSA',
    site: '@24hINSA',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://24heures.org',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#4C1D95" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ClientWrapper>
          {children}
          <ClientCookieBanner />
        </ClientWrapper>
      </body>
    </html>
  );
}
