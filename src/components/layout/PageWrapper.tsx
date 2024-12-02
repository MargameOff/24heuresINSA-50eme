'use client'

import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/shared/LoadingScreen'
import { motion, AnimatePresence } from 'framer-motion'

export function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1400) // 1.1s + 0.3s pour l'animation de fade out

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 1.1 : 0 }}
      >
        {children}
      </motion.div>
    </>
  )
} 