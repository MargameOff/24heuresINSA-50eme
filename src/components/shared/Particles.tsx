'use client'

import { useState, useEffect } from 'react'

export const Particles = ({ isVisible = true }: { isVisible?: boolean }) => {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number }>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setParticles(
      Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2
      }))
    )
  }, [])

  if (!isClient) return null

  return (
    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {particles.map((particle, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-violet-400/20 rounded-full animate-float-${i % 5}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
} 