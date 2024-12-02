'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Particles } from '@/components/shared/Particles'

interface Animation {
  id: string
  title: string
  description: string
  image: string
  category: 'sport' | 'culture' | 'divertissement' | 'competition'
  time?: string
  location?: string
}

const ANIMATIONS: Animation[] = [
  {
    id: 'course-24h',
    title: 'Course des 24 heures',
    description: 'La mythique course des 24 heures ! En équipe ou en solo, à vélo, en roller, ou avec tout autre moyen de locomotion non motorisé, parcourez le plus de kilomètres possible pendant 24 heures sur le circuit du campus.',
    image: '/images/animations/course.jpg',
    category: 'sport',
    time: 'Du samedi 14h au dimanche 14h',
    location: 'Circuit du campus'
  },
  {
    id: 'karting',
    title: 'Course de karting',
    description: 'Affrontez-vous sur notre circuit de karting spécialement aménagé ! Une expérience unique de pilotage accessible à tous.',
    image: '/images/animations/karting.jpg',
    category: 'sport',
    time: 'Samedi de 10h à 18h',
    location: 'Parking du gymnase C'
  },
  {
    id: 'escape-game',
    title: 'Escape Game',
    description: "Plongez dans une aventure immersive ! Résolvez des énigmes et découvrez les secrets des 24h de l'INSA à travers un escape game unique.",
    image: '/images/animations/escape.jpg',
    category: 'divertissement',
    time: 'Sessions toutes les heures',
    location: 'Département GE'
  },
  {
    id: 'jeux-village',
    title: 'Village des jeux',
    description: 'Un espace dédié aux jeux en tout genre : jeux de société, jeux en bois géants, animations ludiques... Il y en a pour tous les goûts !',
    image: '/images/animations/jeux.jpg',
    category: 'divertissement',
    location: 'Village des 24h'
  }
]

const CATEGORIES = [
  { id: 'all', label: 'Toutes les animations' },
  { id: 'sport', label: 'Sport' },
  { id: 'culture', label: 'Culture' },
  { id: 'divertissement', label: 'Divertissement' },
  { id: 'competition', label: 'Compétition' }
]

export default function AnimationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredAnimations = ANIMATIONS.filter(
    animation => selectedCategory === 'all' || animation.category === selectedCategory
  )

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-gray-950 pt-20 pb-16 relative">
        <Particles isVisible={true} />
        
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-violet-400 mb-6">
                Les Animations des 24h
              </h1>
              <p className="text-violet-100/80 text-lg mb-8">
                Découvrez toutes les animations qui vous attendent pendant le festival. 
                Sport, culture, divertissement... Il y en a pour tous les goûts !
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtres */}
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map(category => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-violet-500 text-white'
                      : 'bg-violet-500/10 text-violet-300 hover:bg-violet-500/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Liste des animations */}
        <section>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredAnimations.map((animation, index) => (
                <motion.div
                  key={animation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-violet-500/5 backdrop-blur-sm border border-violet-500/20 rounded-xl overflow-hidden hover:border-violet-500/40 transition-colors duration-300"
                >
                  <div className="aspect-video relative">
                    <motion.div
                      className="absolute inset-0 bg-center bg-cover"
                      style={{ backgroundImage: `url(${animation.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-violet-300 mb-3">
                      {animation.title}
                    </h3>
                    <p className="text-violet-100/80 mb-4">
                      {animation.description}
                    </p>
                    <div className="space-y-2">
                      {animation.time && (
                        <div className="flex items-center gap-2 text-violet-300/80">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{animation.time}</span>
                        </div>
                      )}
                      {animation.location && (
                        <div className="flex items-center gap-2 text-violet-300/80">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{animation.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  )
} 