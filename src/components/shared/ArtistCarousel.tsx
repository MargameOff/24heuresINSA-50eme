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