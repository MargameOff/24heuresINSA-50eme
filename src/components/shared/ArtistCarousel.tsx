'use client'

import { useState } from 'react'
import { ArtistCard } from '@/components/shared/ArtistCard'
import { artistsData } from '@/data/artists'

export const ArtistCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Triple the array to create a longer seamless loop
  const tripledArtists = [...artistsData, ...artistsData, ...artistsData]

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-12">
      <div 
        className={`flex gap-6 animate-scroll-x pl-8 ${hoveredIndex !== null ? 'animation-paused' : ''}`}
        style={{
          width: `${tripledArtists.length * 300}px`, // 300px per card
        }}
      >
        {tripledArtists.map((artist, index) => (
          <div
            key={`${artist.name}-${index}`}
            className="flex-shrink-0"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ArtistCard 
              artist={artist} 
              isHovered={index === hoveredIndex}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 