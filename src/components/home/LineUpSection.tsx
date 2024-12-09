'use client'

import { Particles } from '@/components/shared/Particles'
import { FloatingImage } from '@/components/shared/FloatingImage'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getArtistes } from '@/lib/strapi'
import type { Artiste } from '@/types/strapi'

const groupArtists = (artists: Artiste[], isMobile: boolean = false) => {
  const totalArtists = artists.length;
  const visibleArtists = isMobile ? artists.slice(0, Math.ceil(totalArtists / 2)) : artists;
  
  const visibleTotal = visibleArtists.length;
  const headliners = visibleArtists.slice(0, Math.ceil(visibleTotal * 0.2));
  const mainActs = visibleArtists.slice(Math.ceil(visibleTotal * 0.2), Math.ceil(visibleTotal * 0.5));
  const supportActs = visibleArtists.slice(Math.ceil(visibleTotal * 0.5));
  
  return { headliners, mainActs, supportActs };
};

const getArtistSlug = (nom: string) => {
  return nom.toLowerCase().replace(/\s+/g, '-');
};

export const LineUpSection = () => {
  const [hoveredArtist, setHoveredArtist] = useState<Artiste | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [artists, setArtists] = useState<Artiste[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getArtistes();
        setArtists(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des artistes');
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (isLoading) {
    return (
      <section className="lineup-section min-h-screen bg-gray-900 relative overflow-hidden py-20 md:py-20">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="text-white text-2xl">Chargement des artistes...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lineup-section min-h-screen bg-gray-900 relative overflow-hidden py-20 md:py-20">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="text-red-500 text-2xl">{error}</div>
        </div>
      </section>
    );
  }

  const desktopGroups = groupArtists(artists, false);
  const mobileGroups = groupArtists(artists, true);

  const renderArtistGroup = (artists: Artiste[], textSizeClass: string, colorClass: string = 'text-white', isMobile: boolean = false) => {
    return artists.map((artist, index) => (
      <div 
        key={artist.id} 
        className={`relative opacity-0 ${isMobile ? 'w-full text-center' : ''}`}
        style={{ 
          animation: `fade-in-artist 0.5s ease-out forwards`,
          animationDelay: `${index * 100}ms`
        }}
      >
        <Link 
          href={`/artistes/${getArtistSlug(artist.nom)}`}
          className={`${textSizeClass} ${colorClass} hover:text-violet-300 transition-all duration-300 cursor-pointer font-bold leading-tight inline-block`}
          onMouseEnter={() => setHoveredArtist(artist)}
          onMouseLeave={() => setHoveredArtist(null)}
        >
          {artist.nom}
        </Link>
        {index < artists.length - 1 && !isMobile && (
          <span className="text-gray-600 mx-2">/</span>
        )}
      </div>
    ));
  };

  return (
    <section className="lineup-section min-h-screen bg-gray-900 relative overflow-hidden py-20 md:py-20">
      <div className="container mx-auto px-4 md:px-6 relative h-screen md:h-auto flex flex-col md:block">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-center mb-8 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white font-sans relative z-10 animate-scale-in">
          Line Up
          <span className="block text-lg sm:text-xl md:text-3xl mt-2 text-violet-400/80 font-bold animate-fade-in-up animation-delay-300">2024</span>
        </h2>
        
        {/* Version Desktop */}
        <div className="hidden md:flex flex-col items-center gap-y-12 max-w-7xl mx-auto mb-8">
          {/* Têtes d'affiche */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4">
            {renderArtistGroup(desktopGroups.headliners, 'text-4xl md:text-6xl', 'text-white')}
          </div>

          {/* Artistes principaux */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4">
            {renderArtistGroup(desktopGroups.mainActs, 'text-2xl md:text-4xl', 'text-violet-200')}
          </div>

          {/* Artistes support */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4">
            {renderArtistGroup(desktopGroups.supportActs, 'text-xl md:text-2xl', 'text-violet-300')}
          </div>
        </div>

        {/* Version Mobile */}
        <div className="md:hidden flex-1 flex flex-col justify-between py-4">
          {/* Têtes d'affiche */}
          <div className="flex flex-col items-center gap-y-2">
            {renderArtistGroup(mobileGroups.headliners, 'text-3xl sm:text-4xl', 'text-white', true)}
          </div>

          {/* Artistes principaux */}
          <div className="flex flex-col items-center gap-y-1">
            {renderArtistGroup(mobileGroups.mainActs, 'text-xl sm:text-2xl', 'text-violet-200', true)}
          </div>

          {/* Artistes support */}
          <div className="flex flex-col items-center gap-y-0.5">
            {renderArtistGroup(mobileGroups.supportActs, 'text-base sm:text-lg', 'text-violet-300', true)}
          </div>
        </div>

        {/* Image flottante - cachée sur mobile */}
        <div className="hidden md:block">
          <FloatingImage artist={hoveredArtist} mousePosition={mousePosition} />
        </div>

        {/* Bouton Programmation */}
        <div className="text-center animate-fade-in-up animation-delay-700 mt-6 md:mt-12">
          <Link 
            href="/programmation"
            className="inline-block w-full md:w-auto text-base md:text-xl font-bold border border-violet-500/50 text-violet-400 hover:text-white hover:border-violet-400 px-6 md:px-8 py-2 md:py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-violet-500/5"
          >
            PROGRAMMATION COMPLÈTE
          </Link>
        </div>
      </div>

      <Particles isVisible={!hoveredArtist} />
    </section>
  )
} 