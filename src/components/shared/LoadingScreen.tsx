'use client'

import { motion } from 'framer-motion'

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 1.1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div className="relative">
        {/* Logo animé */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="text-4xl font-bold text-white">
            24
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-violet-400"
            >
              H
            </motion.span>
          </div>
        </motion.div>

        {/* Cercle pulsant */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: 1,
            repeatType: "reverse",
          }}
          className="absolute inset-0 rounded-full bg-violet-500/20"
        />

        {/* Particules */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-20 opacity-30"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
        </motion.div>
      </div>
    </motion.div>
  )
} 