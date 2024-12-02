'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Artist } from '@/types/types'

interface ArtistListCardProps {
  artist: Artist
  index: number
}

export const ArtistListCard = ({ artist, index }: ArtistListCardProps) => {
  const hasTopInfo = artist.day || artist.stage

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/artistes/${artist.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="block group"
      >
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 group">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover transition-all duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 transition-all duration-500 ease-out group-hover:opacity-90 group-hover:bg-gradient-to-t group-hover:from-violet-950 group-hover:via-violet-900/20" />
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_60%)]" />
          
          {/* Info en haut */}
          {hasTopInfo && (
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
              {artist.day && (
                <motion.div
                  initial={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-violet-200 bg-gray-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm transition-all duration-300 group-hover:bg-violet-500/60"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{artist.day}</span>
                </motion.div>
              )}
              {artist.stage && (
                <motion.div
                  initial={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-violet-200 bg-gray-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm transition-all duration-300 group-hover:bg-violet-500/60"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <span>{artist.stage}</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Info en bas */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 ease-out translate-y-0 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:text-violet-300">
              {artist.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-violet-500/50 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-violet-400/60"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 border border-violet-500/0 rounded-xl transition-all duration-500 group-hover:border-violet-500/50 group-hover:glow-effect" />
        </div>
      </Link>
    </motion.div>
  )
} 