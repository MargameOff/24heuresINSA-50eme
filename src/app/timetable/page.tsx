'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Particles } from '@/components/shared/Particles'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Stage = 'Main Stage' | 'Echo Stage' | 'Pulse Stage'
type Day = 'Vendredi' | 'Samedi' | 'Dimanche'

interface TimeSlot {
  time: string
  artist: string
  stage: Stage
  day: Day
}

const getStageColor = (stage: Stage) => {
  switch (stage) {
    case 'Main Stage':
      return 'border-violet-500/30 bg-violet-500/5'
    case 'Echo Stage':
      return 'border-cyan-500/30 bg-cyan-500/5'
    case 'Pulse Stage':
      return 'border-rose-500/30 bg-rose-500/5'
    default:
      return 'border-violet-500/30 bg-violet-500/5'
  }
}

const getStageHeaderColor = (stage: Stage) => {
  switch (stage) {
    case 'Main Stage':
      return 'bg-violet-500/20'
    case 'Echo Stage':
      return 'bg-cyan-500/20'
    case 'Pulse Stage':
      return 'bg-rose-500/20'
    default:
      return 'bg-violet-500/20'
  }
}

const getStageHoverColor = (stage: Stage) => {
  switch (stage) {
    case 'Main Stage':
      return 'hover:bg-violet-500/20'
    case 'Echo Stage':
      return 'hover:bg-cyan-500/20'
    case 'Pulse Stage':
      return 'hover:bg-rose-500/20'
    default:
      return 'hover:bg-violet-500/20'
  }
}

const timeSlots: TimeSlot[] = [
  // Vendredi
  { time: '18:00', artist: 'DJ Opening', stage: 'Main Stage', day: 'Vendredi' },
  { time: '20:00', artist: 'GAMBI', stage: 'Main Stage', day: 'Vendredi' },
  { time: '22:00', artist: 'Headliner 1', stage: 'Main Stage', day: 'Vendredi' },
  { time: '19:00', artist: 'Electronic Act 1', stage: 'Echo Stage', day: 'Vendredi' },
  { time: '21:00', artist: 'Electronic Act 2', stage: 'Echo Stage', day: 'Vendredi' },
  { time: '23:00', artist: 'Electronic Act 3', stage: 'Echo Stage', day: 'Vendredi' },
  { time: '18:30', artist: 'Underground DJ 1', stage: 'Pulse Stage', day: 'Vendredi' },
  { time: '20:30', artist: 'Underground DJ 2', stage: 'Pulse Stage', day: 'Vendredi' },
  { time: '22:30', artist: 'Underground DJ 3', stage: 'Pulse Stage', day: 'Vendredi' },

  // Samedi
  { time: '18:00', artist: 'Opening Act', stage: 'Main Stage', day: 'Samedi' },
  { time: '20:00', artist: 'Main Act 1', stage: 'Main Stage', day: 'Samedi' },
  { time: '22:00', artist: 'Headliner 2', stage: 'Main Stage', day: 'Samedi' },
  { time: '19:00', artist: 'TOBY ROMEO', stage: 'Echo Stage', day: 'Samedi' },
  { time: '21:00', artist: 'Electronic Act 4', stage: 'Echo Stage', day: 'Samedi' },
  { time: '23:00', artist: 'Electronic Act 5', stage: 'Echo Stage', day: 'Samedi' },
  { time: '18:30', artist: 'Underground DJ 4', stage: 'Pulse Stage', day: 'Samedi' },
  { time: '20:30', artist: 'Underground DJ 5', stage: 'Pulse Stage', day: 'Samedi' },
  { time: '22:30', artist: 'Underground DJ 6', stage: 'Pulse Stage', day: 'Samedi' },

  // Dimanche
  { time: '16:00', artist: 'Sunday Opening', stage: 'Main Stage', day: 'Dimanche' },
  { time: '18:00', artist: 'Main Act 2', stage: 'Main Stage', day: 'Dimanche' },
  { time: '20:00', artist: 'Closing Act', stage: 'Main Stage', day: 'Dimanche' },
  { time: '17:00', artist: 'Electronic Act 6', stage: 'Echo Stage', day: 'Dimanche' },
  { time: '19:00', artist: 'DARKTEK', stage: 'Echo Stage', day: 'Dimanche' },
  { time: '21:00', artist: 'Electronic Closing', stage: 'Echo Stage', day: 'Dimanche' },
  { time: '16:30', artist: 'Underground DJ 7', stage: 'Pulse Stage', day: 'Dimanche' },
  { time: '18:30', artist: 'Underground DJ 8', stage: 'Pulse Stage', day: 'Dimanche' },
  { time: '20:30', artist: 'Underground Closing', stage: 'Pulse Stage', day: 'Dimanche' },
]

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<Day>('Vendredi')
  const days: Day[] = ['Vendredi', 'Samedi', 'Dimanche']
  const stages: Stage[] = ['Main Stage', 'Echo Stage', 'Pulse Stage']

  const handleDownload = () => {
    alert('Le téléchargement de la programmation sera bientôt disponible !')
  }

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-gray-900 relative pt-20">
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Programme
            </h1>
            <p className="text-violet-300/80 mb-8">
              Découvrez les horaires de passage de tous les artistes
            </p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Télécharger la programmation
            </button>
          </div>

          {/* Sélecteur de jour */}
          <div className="flex justify-center gap-3 mb-12">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  selectedDay === day
                    ? 'bg-violet-500 text-white'
                    : 'bg-violet-500/10 text-violet-300 hover:bg-violet-500/20'
                )}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Grille des horaires */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {stages.map((stage) => (
              <div
                key={stage}
                className={cn(
                  'rounded-xl overflow-hidden backdrop-blur-sm border',
                  getStageColor(stage)
                )}
              >
                <div className={cn('px-6 py-4', getStageHeaderColor(stage))}>
                  <h2 className="text-lg font-bold text-white text-center">
                    {stage}
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {timeSlots
                    .filter(
                      (slot) => slot.stage === stage && slot.day === selectedDay
                    )
                    .sort((a, b) => {
                      const timeA = parseInt(a.time.replace(':', ''))
                      const timeB = parseInt(b.time.replace(':', ''))
                      return timeA - timeB
                    })
                    .map((slot, index) => (
                      <motion.div
                        key={`${slot.time}-${slot.artist}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={`/artistes/${slot.artist.toLowerCase().replace(/\s+/g, '-')}`}
                          className={cn(
                            'block rounded-lg p-3 transition-colors bg-black/20',
                            getStageHoverColor(stage)
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-violet-300 text-sm">
                              {slot.time}
                            </span>
                            <span className="text-white font-medium">
                              {slot.artist}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Particles isVisible={true} />
      </main>
      <Footer />
    </PageWrapper>
  )
} 