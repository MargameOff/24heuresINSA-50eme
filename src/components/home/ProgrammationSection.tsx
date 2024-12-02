'use client'

import { ArtistCarousel } from '@/components/shared/ArtistCarousel'
import { Particles } from '@/components/shared/Particles'

export const ProgrammationSection = () => {
  return (
    <section className="bg-gray-900 relative overflow-hidden py-16">
      <div className="relative">
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white font-sans px-6 md:px-4">
          Programmation
        </h2>
        
        <div className="animate-fade-in-up animation-delay-300">
          <ArtistCarousel />
        </div>

        <div className="text-center mt-10 animate-fade-in-up animation-delay-500 px-6 md:px-4">
          <button className="text-xl font-bold border border-violet-500/50 text-violet-400 hover:text-white hover:border-violet-400 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-violet-500/5">
            LINE UP COMPLÈTE
          </button>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <Particles isVisible={true} />
        </div>
      </div>
    </section>
  )
} 