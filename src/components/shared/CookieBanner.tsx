'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    if (consent === undefined) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'true', { expires: 365 })
    setShowBanner(false)
  }

  const refuseCookies = () => {
    Cookies.set('cookie-consent', 'false', { expires: 365 })
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-gray-900/95 backdrop-blur-sm border-t border-violet-500/20"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-violet-100/90 text-sm md:text-base text-center md:text-left">
                <p className="mb-2">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                  En continuant à naviguer, vous acceptez notre utilisation des cookies conformément 
                  à notre politique de confidentialité.
                </p>
                <Link 
                  href="/cookies" 
                  className="text-violet-400 hover:text-violet-300 underline transition-colors duration-200"
                >
                  En savoir plus sur notre politique des cookies
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={refuseCookies}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 whitespace-nowrap text-sm md:text-base order-2 sm:order-1"
                >
                  Refuser les cookies
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors duration-200 whitespace-nowrap text-sm md:text-base order-1 sm:order-2"
                >
                  Accepter les cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 