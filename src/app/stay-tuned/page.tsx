'use client'

import { useState, useEffect } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { motion, AnimatePresence } from 'framer-motion'

function CountdownTimer() {
  const targetDate = new Date('2025-05-24T00:00:00')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">{timeLeft.days}</div>
        <div className="text-white font-medium text-sm">Jours</div>
      </div>
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">{timeLeft.hours}</div>
        <div className="text-white font-medium text-sm">Heures</div>
      </div>
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">{timeLeft.minutes}</div>
        <div className="text-white font-medium text-sm">Minutes</div>
      </div>
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">{timeLeft.seconds}</div>
        <div className="text-white font-medium text-sm">Secondes</div>
      </div>
    </div>
  )
}

const words = [
  "Concerts", "Course", "Festival", "Animations", 
  "Sport", "Musique", "Shows", "Spectacles",
  "DJ Sets", "Live", "Scènes", "Artistes"
]

interface FloatingWordProps {
  text: string
  duration: number
  delay: number
}

const FloatingWord = ({ text, duration, delay }: FloatingWordProps) => {
  const [position] = useState({
    left: `${Math.random() * 80 + 10}%`,
    top: `${Math.random() * 80 + 10}%`,
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ 
        duration: 0.6,
        delay: delay,
      }}
      className="absolute text-white/40 font-bold text-xl md:text-3xl blur-[0.5px]"
      style={position}
    >
      {text}
    </motion.div>
  )
}

const FloatingWords = () => {
  const [words1, setWords1] = useState<string[]>([])
  const [words2, setWords2] = useState<string[]>([])
  const [words3, setWords3] = useState<string[]>([])
  const [words4, setWords4] = useState<string[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const addWord = (setWords: React.Dispatch<React.SetStateAction<string[]>>) => {
      let randomWord
      do {
        randomWord = words[Math.floor(Math.random() * words.length)]
      } while (words1[0] === randomWord || words2[0] === randomWord || words3[0] === randomWord || words4[0] === randomWord)
      
      setWords([randomWord])
      setCount(prev => prev + 1)
    }

    const startCycle = () => {
      const timer1 = setTimeout(() => {
        addWord(setWords1)
        setTimeout(() => setWords1([]), 3000)
      }, 0)

      const timer2 = setTimeout(() => {
        addWord(setWords2)
        setTimeout(() => setWords2([]), 3000)
      }, 1000)

      const timer3 = setTimeout(() => {
        addWord(setWords3)
        setTimeout(() => setWords3([]), 3000)
      }, 2000)

      const timer4 = setTimeout(() => {
        addWord(setWords4)
        setTimeout(() => setWords4([]), 3000)
      }, 3000)

      return [timer1, timer2, timer3, timer4]
    }

    let timers = startCycle()

    const mainInterval = setInterval(() => {
      timers.forEach(clearTimeout)
      timers = startCycle()
    }, 4000)

    return () => {
      clearInterval(mainInterval)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {words1.map((word, index) => (
          <FloatingWord 
            key={`${word}-1-${count}`} 
            text={word}
            duration={3}
            delay={0}
          />
        ))}
        {words2.map((word, index) => (
          <FloatingWord 
            key={`${word}-2-${count}`} 
            text={word}
            duration={3}
            delay={0}
          />
        ))}
        {words3.map((word, index) => (
          <FloatingWord 
            key={`${word}-3-${count}`} 
            text={word}
            duration={3}
            delay={0}
          />
        ))}
        {words4.map((word, index) => (
          <FloatingWord 
            key={`${word}-4-${count}`} 
            text={word}
            duration={3}
            delay={0}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function StayTuned() {
  return (
    <PageWrapper>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Vidéo de fond */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover brightness-110"
            poster="/hero-poster.jpg"
          >
            <source src="/videos/festival-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        </div>

        {/* Mots flottants */}
        <FloatingWords />

        {/* Cercles décoratifs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 rounded-full border-2 border-violet-500"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full border-2 border-violet-500"
          />
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-violet-500/20 backdrop-blur-sm mx-auto mb-8 flex items-center justify-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white/90">
                  2025
                </h1>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-2">
                24h de l&apos;INSA
              </h2>
              <div className="w-32 h-1 bg-violet-500 mx-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-16 relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-violet-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -right-8 bottom-0 w-6 h-6 rounded-full bg-violet-500/20"
              />
              <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                Restez connectés
              </p>
              <p className="text-xl text-white font-medium">
                Ne manquez rien de cette 50ème édition
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-16"
            >
              <CountdownTimer />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center gap-8"
            >
              <a
                href="https://instagram.com/24heuresinsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-violet-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/24heuresINSA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-violet-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/24heuresINSA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-violet-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/24-heures-de-l'insa-lyon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-violet-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
} 