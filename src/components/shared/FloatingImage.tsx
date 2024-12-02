'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Artist } from '@/types/types'

interface FloatingImageProps {
  artist: Artist | null;
  mousePosition: { x: number; y: number };
}

export const FloatingImage = ({ artist, mousePosition }: FloatingImageProps) => {
  if (!artist) return null;

  return (
    <div 
      className="fixed pointer-events-none transition-all duration-500 ease-out z-50"
      style={{ 
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-60 h-60 relative rounded-lg overflow-hidden shadow-2xl animate-float">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          quality={100}
          sizes="160px"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-sm font-bold text-center">{artist.name}</p>
        </div>
      </div>
    </div>
  );
}; 