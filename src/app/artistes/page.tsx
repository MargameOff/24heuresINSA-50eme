'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Particles } from '@/components/shared/Particles'
import { ArtistListCard } from '@/components/shared/ArtistListCard'
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

interface DropdownProps {
  label: string
  options: { id: string; label: string }[]
  value: string
  onChange: (value: string) => void
}

const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(opt => opt.id === value)

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="text-violet-300 text-sm font-medium whitespace-nowrap">{label} :</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-violet-500/5 border border-violet-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/10 transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-between"
        >
          <span>{selectedOption?.label}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full min-w-[140px]"
          >
            <div className="bg-gray-900/95 backdrop-blur-sm border border-violet-500/20 rounded-xl py-1 shadow-xl">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange(option.id)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                    option.id === value
                      ? 'text-violet-400 bg-violet-500/10'
                      : 'text-violet-200 hover:bg-violet-500/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ArtistesPage() {
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
        <section className="relative py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-violet-400 mb-4">
                Les Artistes
              </h1>
              <p className="text-violet-100/80 text-lg mb-6">
                Découvrez tous les artistes qui se produiront lors du festival.
                Une programmation éclectique qui saura vous faire vibrer !
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