'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Particles } from '@/components/shared/Particles'
import { ClientWrapper } from '@/components/shared/ClientWrapper'

const NotFoundContent = () => {
  return (
    <div className="relative z-10 text-center">
      {/* Badge 50e édition */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 12 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
        className="absolute -top-12 right-0 md:right-20 bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 px-4 py-2 rounded-xl transform hover:scale-105 transition-transform duration-300 z-20"
      >
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
          50e édition
        </span>
      </motion.div>

      {/* Nombre 404 animé */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
        className="relative"
      >
        <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none select-none">
          <span className="bg-gradient-to-r from-violet-500 via-violet-300 to-violet-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        {/* Effet de glitch */}
        <div className="absolute inset-0 animate-glitch-1 opacity-30">
          <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none text-violet-500 translate-x-1">
            404
          </h1>
        </div>
        <div className="absolute inset-0 animate-glitch-2 opacity-30">
          <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none text-violet-300 -translate-x-1">
            404
          </h1>
        </div>
      </motion.div>

      {/* Message d'erreur */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-violet-200">
          Oups, mauvaise scène !
        </h2>
        <p className="text-violet-300/80 max-w-md mx-auto">
          Cette page n&apos;est pas à l&apos;affiche du festival... 
          Mais ne vous inquiétez pas, il y a plein d&apos;autres shows à découvrir !
        </p>
      </motion.div>

      {/* Boutons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500/10 hover:bg-violet-500/20 text-violet-200 rounded-full transition-all duration-300 hover:scale-105 border-2 border-violet-400/30 hover:border-violet-400/50 backdrop-blur-sm group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l&apos;accueil
        </Link>
        <Link 
          href="/artistes"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500/10 hover:bg-violet-500/20 text-violet-200 rounded-full transition-all duration-300 hover:scale-105 border-2 border-violet-400/30 hover:border-violet-400/50 backdrop-blur-sm group"
        >
          Voir la programmation
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>

      {/* Dates du festival */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-violet-300/60 text-sm"
      >
        23-25 Mai 2025 • Campus de l&apos;INSA Lyon
      </motion.div>
    </div>
  )
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 relative flex flex-col items-center justify-center px-4">
      <ClientWrapper>
        {/* Particules en arrière-plan */}
        <Particles isVisible={true} />

        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-violet-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
      </ClientWrapper>

      <NotFoundContent />
    </main>
  )
} 