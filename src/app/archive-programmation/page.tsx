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

export default function ArchiveProgrammationPage() {
  const [selectedDate, setSelectedDate] = useState('all')
  const [selectedScene, setSelectedScene] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
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

        if (artistsResponse.data) {
          setArtists(artistsResponse.data)
        } else {
          setError("Aucun artiste trouvé")
        }

        if (editionsResponse.data) {
          setEditions(editionsResponse.data)
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

  // Créer le tableau des années à partir des éditions
  const yearOptions = [
    { id: 'all', label: 'TOUTES' },
    ...editions.map(edition => ({
      id: edition.annee.toString(),
      label: edition.annee.toString()
    }))
  ]

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

    // Vérification de l'année
    if (selectedYear !== 'all') {
      if (!artist.passage?.edition?.annee || artist.passage.edition.annee.toString() !== selectedYear) {
        return false;
      }
    }

    // Si toutes les conditions sont passées
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
                Archives des éditions
              </h1>
              <p className="text-violet-100/80 text-lg mb-6">
                Revivez les moments forts des éditions précédentes des 24 heures de l'INSA. 
                Explorez la riche histoire musicale de notre festival à travers les années.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtres */}
        <section className="mb-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Dropdown
                label="ANNÉES"
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
              />
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
                  key={`${selectedYear}-${selectedDate}-${selectedScene}`}
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
      </main>
      <Footer />
    </PageWrapper>
  )
} 