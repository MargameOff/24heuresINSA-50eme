'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Particles } from '@/components/shared/Particles'
import { ArtistListCard } from '@/components/shared/ArtistListCard'
import { Dropdown } from '@/components/shared/Dropdown'
import { getArtistesPublies, getEditions, getScenes } from '@/lib/strapi'
import type { Artiste, Edition, Scene } from '@/types/strapi'

const FILTERS = {
  dates: [
    { id: 'all', label: 'TOUTES' },
    { id: 'vendredi', label: 'VENDREDI' },
    { id: 'samedi', label: 'SAMEDI' },
    { id: 'dimanche', label: 'DIMANCHE' }
  ]
}

export default function ArtistesPage() {
  const [selectedDate, setSelectedDate] = useState('all')
  const [selectedScene, setSelectedScene] = useState('all')
  const [artists, setArtists] = useState<Artiste[]>([])
  const [editions, setEditions] = useState<Edition[]>([])
  const [scenes, setScenes] = useState<Scene[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsResponse, editionsResponse, scenesResponse] = await Promise.all([
          getArtistesPublies(),
          getEditions(),
          getScenes()
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
          
          setArtists(currentYearArtists)
          setEditions(editionsResponse.data)
        } else {
          setError("Aucun artiste trouvé")
        }

        if (scenesResponse.data) {
          setScenes(scenesResponse.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError("Erreur lors du chargement des données")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Créer le tableau des scènes à partir des scènes
  const sceneOptions = [
    { id: 'all', label: 'TOUTES' },
    ...scenes.map(scene => ({
      id: scene.nom.toLowerCase(),
      label: scene.nom
    }))
  ]

  const filteredArtists = artists.filter(artist => {
    // Vérification de la date
    if (selectedDate !== 'all') {
      if (!artist.passage?.jour?.toLowerCase() || artist.passage.jour.toLowerCase() !== selectedDate) {
        return false;
      }
    }

    // Vérification de la scène
    if (selectedScene !== 'all') {
      if (!artist.passage?.scene?.nom || artist.passage.scene.nom.toLowerCase() !== selectedScene) {
        return false;
      }
    }

    return true;
  });

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-gray-950 pt-20 pb-16 relative">
        <Particles isVisible={true} />
        
        {/* Hero Section */}
        <section className="relative -mt-20">
          <div 
            className="absolute inset-0 h-[60vh] bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/og-image.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/70 to-gray-950" />
          </div>
          <div className="container mx-auto px-4 relative pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-violet-400 mb-4">
                Découvrir la programmation
              </h1>
              <p className="text-violet-100/80 text-lg mb-6">
                Plongez dans l'univers musical des 24 heures de l'INSA ! Des artistes talentueux, 
                des styles variés, une expérience unique à ne pas manquer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtres */}
        <section className="mb-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Dropdown
                label="DATES"
                options={FILTERS.dates}
                value={selectedDate}
                onChange={setSelectedDate}
              />
              <Dropdown
                label="SCÈNES"
                options={sceneOptions}
                value={selectedScene}
                onChange={setSelectedScene}
              />
            </div>
          </div>
        </section>

        {/* Liste des artistes */}
        <section>
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-violet-300">
                  {error}
                </div>
              ) : filteredArtists.length === 0 ? (
                <div className="text-center text-violet-300">
                  Aucun artiste ne correspond aux filtres sélectionnés
                </div>
              ) : (
                <motion.div
                  key={`${selectedDate}-${selectedScene}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredArtists.map((artist, index) => (
                    <ArtistListCard 
                      key={artist.id}
                      artist={artist}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Bouton Archives */}
        <section className="mt-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <motion.a
                href="/archive-programmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative inline-flex items-center gap-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 backdrop-blur-sm rounded-full px-6 py-3 text-violet-200 transition-all duration-200"
              >
                <span className="text-lg">Découvrir les archives</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  )
} 