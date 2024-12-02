'use client'

import { useState, useEffect } from 'react'

export const HeroSection = () => {
  const [currentSection, setCurrentSection] = useState(0)

  const scrollToNextSection = () => {
    const lineUpSection = document.querySelector('.lineup-section')
    if (lineUpSection) {
      lineUpSection.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(1)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const heroSection = document.querySelector('.hero-section')
      const lineUpSection = document.querySelector('.lineup-section')

      if (currentSection === 0 && e.deltaY > 0 && lineUpSection) {
        // Défilement vers le bas depuis hero
        e.preventDefault()
        scrollToNextSection()
      } else if (currentSection === 1 && e.deltaY < 0 && heroSection) {
        // Défilement vers le haut depuis line-up
        const rect = lineUpSection?.getBoundingClientRect()
        if (rect && rect.top >= 0) {
          e.preventDefault()
          heroSection.scrollIntoView({ behavior: 'smooth' })
          setCurrentSection(0)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentSection])

  return (
    <section className="hero-section h-screen relative">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      >
        <source src="/videos/festival-background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 md:px-4">
        <div className="space-y-8 max-w-4xl">
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold animate-fade-in-up">
              <span className="bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 bg-clip-text text-transparent">
                24h de l&apos;INSA
              </span>
            </h1>
            <div className="absolute -top-12 right-0 rotate-12 bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 px-4 py-2 rounded-xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                50e édition
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-6 animate-fade-in-up-delay">
            {/* Dates avec effet spécial */}
            <div className="relative group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500/30 blur-xl group-hover:bg-violet-400/40 transition-all duration-300"></div>
                  <div className="relative px-5 py-2 bg-violet-500/20 backdrop-blur-sm rounded-2xl border border-violet-400/30 transform group-hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-violet-200 mb-1">Ven.</span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-violet-200 to-white bg-clip-text text-transparent">23</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500/40 blur-xl group-hover:bg-violet-400/50 transition-all duration-300"></div>
                  <div className="relative px-5 py-2 bg-violet-500/30 backdrop-blur-sm rounded-2xl border border-violet-400/40 transform group-hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-violet-200 mb-1">Sam.</span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-violet-200 to-white bg-clip-text text-transparent">24</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500/30 blur-xl group-hover:bg-violet-400/40 transition-all duration-300"></div>
                  <div className="relative px-5 py-2 bg-violet-500/20 backdrop-blur-sm rounded-2xl border border-violet-400/30 transform group-hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-violet-200 mb-1">Dim.</span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-violet-200 to-white bg-clip-text text-transparent">25</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-center mt-4">
                <span className="bg-gradient-to-r from-violet-200 via-white to-violet-200 bg-clip-text text-transparent">
                  Mai 2025
                </span>
              </p>
              <div className="flex items-center gap-2 justify-center text-violet-300/80 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Campus de la Doua</span>
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl text-violet-100/90 max-w-2xl mx-auto">
            Le plus grand festival étudiant de France
            <br />
            revient pour une 
            <span className="relative inline-block px-3 mx-1">
              <span className="relative z-10 font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                50e édition exceptionnelle
              </span>
              <span className="absolute inset-0 bg-violet-500/20 blur-md"></span>
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 animate-fade-in-up-delay-3">
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-violet-500/10 text-violet-200 font-medium rounded-full transition-all duration-300 hover:scale-105 border-2 border-violet-400/30 hover:border-violet-400/50">
              Découvrir la programmation
            </button>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 text-violet-200 hover:text-violet-100 transition-colors duration-300 animate-bounce cursor-pointer"
          aria-label="Défiler vers le bas"
        >
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        <button className="absolute bottom-8 right-8 px-6 py-3 bg-transparent hover:bg-violet-500/10 text-violet-200 rounded-full transition-all duration-200 hover:scale-105 border-2 border-violet-400/30 hover:border-violet-400/50 backdrop-blur-sm group hidden sm:flex">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Aftermovie 2024
          </span>
        </button>
      </div>
    </section>
  )
} 