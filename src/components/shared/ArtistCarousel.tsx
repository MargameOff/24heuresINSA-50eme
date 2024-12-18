'use client'

import { useState } from 'react'
import { ArtistListCard } from '@/components/shared/ArtistListCard'
import type { Artiste } from '@/types/strapi'

interface ArtistCarouselProps {
  artists: Artiste[]
}

export const ArtistCarousel = ({ artists }: ArtistCarouselProps) => {
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const [isPaused, setIsPaused] = useState(false)

  if (artists.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-white text-xl">Aucun artiste disponible pour le moment</div>
      </div>
    );
  }

  // Multiplier le tableau d'artistes pour créer un effet infini
  // Si nous avons peu d'artistes, nous multiplions plus de fois
  const multiplier = Math.max(10, Math.ceil(20 / artists.length));
  const repeatedArtists = Array(multiplier).fill(artists).flat();

  return (
    <div className="relative py-12">
      {/* Carrousel */}
      <div 
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-x-auto scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`flex gap-6 pl-8 py-8 ${
            direction === 'left' 
              ? 'animate-scroll-left' 
              : 'animate-scroll-right'
          } ${isPaused ? 'animation-paused' : ''}`}
          style={{
            width: `${repeatedArtists.length * 320}px`,
          }}
        >
          {repeatedArtists.map((artist, index) => (
            <div
              key={`${artist.nom}-${index}`}
              className="flex-shrink-0 w-[300px]"
            >
              <ArtistListCard 
                artist={artist} 
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 