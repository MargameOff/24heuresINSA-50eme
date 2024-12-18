'use client'

import { useState, useEffect } from 'react'
import { ArtistCarousel } from '@/components/shared/ArtistCarousel'
import { Particles } from '@/components/shared/Particles'
import { getArtistesPublies, getEditions } from '@/lib/strapi'
import type { Artiste } from '@/types/strapi'
import Link from 'next/link'

export const ProgrammationSection = () => {
  const [artists, setArtists] = useState<Artiste[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsResponse, editionsResponse] = await Promise.all([
          getArtistesPublies(),
          getEditions()
        ]);

        if (artistsResponse.data && editionsResponse.data) {
          // Trouver l'année la plus récente
          const mostRecentEdition = editionsResponse.data.reduce((latest, current) => 
            latest.annee > current.annee ? latest : current
          );

          // Filtrer les artistes pour ne garder que ceux de l'année la plus récente
          const currentYearArtists = artistsResponse.data.filter(artist => 
            artist.passage?.edition?.annee === mostRecentEdition.annee
          );
          
          setArtists(currentYearArtists);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-gray-900 relative overflow-hidden py-16">
        <div className="relative">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white font-sans px-6 md:px-4">
            Programmation
          </h2>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-900 relative overflow-hidden py-16">
        <div className="relative">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white font-sans px-6 md:px-4">
            Programmation
          </h2>
          <div className="text-center text-violet-300">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (artists.length === 0) {
    return (
      <section className="bg-gray-900 relative overflow-hidden py-16">
        <div className="relative">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white font-sans px-6 md:px-4">
            Programmation
          </h2>
          
          <div className="text-center space-y-4">
            <p className="text-2xl text-violet-200">
              La programmation sera dévoilée prochainement
            </p>
            <p className="text-lg text-violet-300/80">
              Restez connectés pour découvrir les artistes de la prochaine édition !
            </p>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <Particles isVisible={true} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 relative overflow-hidden py-16">
      <div className="relative">
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white font-sans px-6 md:px-4">
          Programmation
        </h2>
        
        <div className="animate-fade-in-up animation-delay-300">
          <ArtistCarousel artists={artists} />
        </div>

        <div className="text-center mt-10 animate-fade-in-up animation-delay-500 px-6 md:px-4">
          <Link 
            href="/programmation"
            className="inline-block text-xl font-bold border border-violet-500/50 text-violet-400 hover:text-white hover:border-violet-400 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-violet-500/5"
          >
            LINE UP COMPLÈTE
          </Link>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <Particles isVisible={true} />
        </div>
      </div>
    </section>
  )
} 