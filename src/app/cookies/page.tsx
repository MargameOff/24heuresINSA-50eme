'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'

export default function CookiesPage() {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    setCookiesAccepted(consent === 'true')
  }, [])

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'true', { expires: 365 })
    setCookiesAccepted(true)
  }

  const handleRefuse = () => {
    Cookies.set('cookie-consent', 'false', { expires: 365 })
    setCookiesAccepted(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-violet-400">Politique des Cookies</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-violet-300">Qu'est-ce qu&#39;un cookie ?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. 
              Les cookies sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, 
              ainsi que pour fournir des informations aux propriétaires du site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-violet-300">Comment utilisons-nous les cookies ?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Nous utilisons des cookies pour :
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Mémoriser vos préférences</li>
              <li>Analyser le trafic de notre site web</li>
              <li>Améliorer votre expérience de navigation</li>
              <li>Personnaliser le contenu que vous voyez</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-violet-300">Vos préférences</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Vous pouvez choisir d'accepter ou de refuser les cookies. Votre choix sera enregistré pour une durée d'un an.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAccept}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                  cookiesAccepted === true
                    ? 'bg-violet-600 text-white'
                    : 'bg-violet-500 hover:bg-violet-600 text-white'
                }`}
              >
                Accepter les cookies
              </button>
              <button
                onClick={handleRefuse}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                  cookiesAccepted === false
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                Refuser les cookies
              </button>
            </div>
            {cookiesAccepted !== null && (
              <p className="mt-4 text-sm text-gray-400">
                Statut actuel : {cookiesAccepted ? 'Cookies acceptés' : 'Cookies refusés'}
              </p>
            )}
          </section>
        </motion.div>
      </div>
    </main>
  )
} 