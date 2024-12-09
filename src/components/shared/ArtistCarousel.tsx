'use client'

import { useState, useEffect } from 'react'
import { ArtistListCard } from '@/components/shared/ArtistListCard'
import { getArtistesPublies } from '@/lib/strapi'
import type { Artiste } from '@/types/strapi'

export const ArtistCarousel = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const [isPaused, setIsPaused] = useState(false)
  const [artists, setArtists] = useState<Artiste[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getArtistesPublies();
        setArtists(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des artistes');
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-white text-xl">Chargement des artistes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-500 text-xl">{error}</div>
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