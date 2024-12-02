'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'CONCERTS',
      items: [
        { name: 'Artistes', href: '/artistes' },
        { name: 'Planning', href: '/timetable' },
      ]
    },
    {
      name: 'ANIMATIONS',
      items: [
        { name: 'Animations', href: '/animations' },
      ]
    },
    {
      name: 'COURSES',
      items: [
        { name: 'Course à pied', href: '/course-a-pied' },
        { name: 'Course de vélo', href: '/course-velo' },
      ]
    },
    {
      name: 'INFOS PRATIQUES',
      items: [
        { name: 'Contact', href: '/contact' },
        { name: 'Cookies', href: '/cookies' },
      ]
    },
    {
      name: 'A PROPOS',
      items: [
        { name: 'Histoire', href: '/histoire' },
        { name: 'Partenaires', href: '/partenaires' },
      ]
    },
  ]

  // Diviser les éléments du menu en deux colonnes
  const leftColumnItems = menuItems.slice(0, 3) // CONCERTS, ANIMATIONS, COURSES
  const rightColumnItems = menuItems.slice(3) // INFOS PRATIQUES, A PROPOS

  return (
    <>
      {/* Navbar fixe */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Bouton Billetterie */}
          <Link 
            href="https://www.billetweb.fr/24h-de-linsa-2024"
            target="_blank"
            className="group flex items-center gap-2 text-violet-100"
          >
            <div className="p-3 bg-violet-600/30 hover:bg-violet-500/40 rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-violet-400/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="overflow-hidden w-0 group-hover:w-24 whitespace-nowrap transition-all duration-300 ease-out">
              Billetterie
            </span>
          </Link>

          {/* Bouton Menu */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-2 text-violet-100"
          >
            <span className="overflow-hidden w-0 group-hover:w-16 whitespace-nowrap transition-all duration-300 ease-out text-right">
              Menu
            </span>
            <div className="p-3 bg-violet-600/30 hover:bg-violet-500/40 rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-violet-400/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* Menu overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Left side - Close button and blur */}
        <div 
          className="absolute md:w-1/2 w-full h-full left-0 bg-black/60 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-500"
          onClick={() => setIsMenuOpen(false)}
        >
          <button className="text-violet-200 hover:text-violet-100 transition-all duration-300 transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Right side - Menu content */}
        <div className={`absolute right-0 top-0 md:w-1/2 w-full h-full bg-gray-900/95 backdrop-blur-md transition-all duration-500 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col justify-center px-8 md:px-16">
            {/* Mobile close button */}
            <button 
              className="absolute top-8 right-8 text-violet-200 hover:text-violet-100 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu items en deux colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Colonne gauche */}
              <div className="space-y-8">
                {leftColumnItems.map((item) => (
                  <div key={item.name} className="space-y-3">
                    <h3 className="text-base text-violet-400 font-medium tracking-wider">{item.name}</h3>
                    <div className="space-y-2 pl-2">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block text-xl md:text-2xl font-bold transition-all duration-300 transform hover:translate-x-2 ${
                            pathname === subItem.href ? 'text-violet-400' : 'text-violet-200 hover:text-violet-100'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Colonne droite */}
              <div className="space-y-8">
                {rightColumnItems.map((item) => (
                  <div key={item.name} className="space-y-3">
                    <h3 className="text-base text-violet-400 font-medium tracking-wider">{item.name}</h3>
                    <div className="space-y-2 pl-2">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block text-xl md:text-2xl font-bold transition-all duration-300 transform hover:translate-x-2 ${
                            pathname === subItem.href ? 'text-violet-400' : 'text-violet-200 hover:text-violet-100'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16">
              <div className="text-violet-300/80 space-y-4">
                {/* Réseaux sociaux */}
                <div className="flex items-center gap-4 mb-6">
                  <a href="https://www.facebook.com/24heuresinsa" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/24heuresinsa" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/24heuresinsa" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/24-heures-de-l-insa" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>

                <p className="text-base">17-19 Mai 2024</p>
                <p className="text-sm">Campus de l&apos;INSA Lyon</p>
                <Link 
                  href="https://www.billetweb.fr/24h-de-linsa-2024" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors duration-200 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span>Billetterie</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 