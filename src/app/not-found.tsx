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

      {/* Réseaux sociaux */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 flex justify-center items-center gap-4"
      >
        <a 
          href="https://www.facebook.com/24heuresinsa" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>
        <a 
          href="https://www.instagram.com/24heuresinsa" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        </a>
        <a 
          href="https://twitter.com/24heuresinsa" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/company/24-heures-de-l-insa" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </motion.div>

      {/* Dates du festival */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-violet-300/60 text-sm"
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