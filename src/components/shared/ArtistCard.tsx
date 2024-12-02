'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Artist } from '@/types/types'

const dayColors = {
  'Vendredi': 'bg-emerald-500/70',
  'Samedi': 'bg-violet-500/70',
  'Dimanche': 'bg-rose-500/70'
} as const

interface ArtistCardProps {
  artist: Artist;
  isHovered: boolean;
}

const getArtistSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export const ArtistCard = ({ artist, isHovered }: ArtistCardProps) => {
  return (
    <Link 
      href={`/artistes/${getArtistSlug(artist.name)}`}
      className={`block w-72 h-96 relative rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 ${
        isHovered ? 'scale-110' : ''
      }`}
    >
      <Image
        src={artist.image}
        alt={artist.name}
        fill
        className="object-cover"
      />
      {/* Label du jour */}
      <div className={`absolute top-4 left-4 ${dayColors[artist.day]} px-4 py-1 rounded-full backdrop-blur-sm text-white font-medium z-10`}>
        {artist.day}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-3">{artist.name}</h3>
          <div className="flex flex-wrap gap-2">
            {artist.genres.map((genre, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-violet-600/50 text-white backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
} 