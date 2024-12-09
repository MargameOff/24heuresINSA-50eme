'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Artiste } from '@/types/strapi'

interface FloatingImageProps {
  artist: Artiste | null;
  mousePosition: { x: number; y: number };
}

export const FloatingImage = ({ artist, mousePosition }: FloatingImageProps) => {
  if (!artist) return null;

  const imageUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL + 
    (artist.image?.formats?.medium?.url || 
     artist.image?.formats?.small?.url || 
     artist.image?.url || 
     '/placeholder-image.jpg');

  return (
    <div 
      className="fixed pointer-events-none transition-all duration-500 ease-out z-50"
      style={{ 
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-48 h-48 relative rounded-full overflow-hidden shadow-2xl animate-float backdrop-blur-md bg-violet-500/5">
        <div className="absolute inset-0 border border-violet-400/10 rounded-full" />
        <Image
          src={imageUrl}
          alt={artist.nom}
          fill
          quality={100}
          sizes="192px"
          priority
          className="object-cover opacity-75 hover:opacity-85 transition-opacity duration-300 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-violet-500/10 to-violet-900/40 mix-blend-overlay" />
        <div className="absolute bottom-4 left-0 right-0">
          <p className="text-white text-sm font-bold text-center drop-shadow-lg">
            {artist.nom}
          </p>
        </div>
      </div>
    </div>
  );
}; 