'use client'

import { useState } from 'react'
import { ArtistListCard } from '@/components/shared/ArtistListCard'
import { artistsData } from '@/data/artists'

export const ArtistCarousel = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const [isPaused, setIsPaused] = useState(false)

  // Double the array instead of triple for smoother scrolling
  const doubledArtists = [...artistsData, ...artistsData]

  return (
    <div className="relative py-12">
      {/* Boutons de direction */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex gap-4">
        <button
          onClick={() => setDirection('left')}
          className={`p-3 rounded-full bg-violet-500/10 hover:bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 text-violet-200 transition-all duration-300 hover:scale-110 ${direction === 'left' ? 'bg-violet-500/20' : ''}`}
          aria-label="Défiler vers la gauche"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setDirection('right')}
          className={`p-3 rounded-full bg-violet-500/10 hover:bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 text-violet-200 transition-all duration-300 hover:scale-110 ${direction === 'right' ? 'bg-violet-500/20' : ''}`}
          aria-label="Défiler vers la droite"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

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
            width: `${doubledArtists.length * 320}px`,
          }}
        >
          {doubledArtists.map((artist, index) => (
            <div
              key={`${artist.name}-${index}`}
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