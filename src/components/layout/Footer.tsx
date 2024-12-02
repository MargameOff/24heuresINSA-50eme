'use client'

import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 relative overflow-hidden border-t border-violet-500/20">
      {/* Effet de gradient en haut du footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="container mx-auto px-6 py-16">
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
              24h de l&apos;INSA
            </h3>
            <p className="text-violet-300/80 max-w-md">
              Le plus grand festival étudiant de France revient pour sa 50e édition. 
              Trois jours de musique, de culture et de partage sur le campus de la Doua.
            </p>
            <div className="flex space-x-4">
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
          </div>

          {/* Navigation - Concerts & Animations */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold mb-4">CONCERTS</h4>
            <ul className="space-y-2">
              <li><Link href="/artistes" className="text-violet-300/80 hover:text-violet-200 transition-colors">Artistes</Link></li>
              <li><Link href="/timetable" className="text-violet-300/80 hover:text-violet-200 transition-colors">Planning</Link></li>
            </ul>
            <h4 className="text-white font-semibold mb-4 mt-8">ANIMATIONS</h4>
            <ul className="space-y-2">
              <li><Link href="/animations" className="text-violet-300/80 hover:text-violet-200 transition-colors">Animations</Link></li>
            </ul>
          </div>

          {/* Navigation - Courses & Infos */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold mb-4">COURSES</h4>
            <ul className="space-y-2">
              <li><Link href="/course-a-pied" className="text-violet-300/80 hover:text-violet-200 transition-colors">Course à pied</Link></li>
              <li><Link href="/course-velo" className="text-violet-300/80 hover:text-violet-200 transition-colors">Course de vélo</Link></li>
            </ul>
            <h4 className="text-white font-semibold mb-4 mt-8">INFOS PRATIQUES</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-violet-300/80 hover:text-violet-200 transition-colors">Contact</Link></li>
              <li><Link href="/cookies" className="text-violet-300/80 hover:text-violet-200 transition-colors">Cookies</Link></li>
            </ul>
          </div>

          {/* Contact & A Propos */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold mb-4">A PROPOS</h4>
            <ul className="space-y-2">
              <li><Link href="/histoire" className="text-violet-300/80 hover:text-violet-200 transition-colors">Histoire</Link></li>
              <li><Link href="/partenaires" className="text-violet-300/80 hover:text-violet-200 transition-colors">Partenaires</Link></li>
            </ul>
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">CONTACT</h4>
              <ul className="space-y-2">
                <li className="text-violet-300/80">
                  <a href="mailto:contact@24heures.org" className="hover:text-violet-200 transition-colors">
                    contact@24heures.org
                  </a>
                </li>
                <li className="text-violet-300/80">
                  20 Avenue Albert Einstein
                  <br />
                  69100 Villeurbanne
                </li>
              </ul>
            </div>
          </div>

          {/* Billetterie */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              href="https://www.billetweb.fr/24h-de-linsa-2024"
              target="_blank"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors duration-200 text-lg font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span>Billetterie</span>
            </Link>
          </div>
        </div>

        {/* Barre de séparation avec gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mb-8" />

        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row justify-between items-center text-violet-300/60 text-sm">
          <div className="mb-4 md:mb-0">
            © 2024 24h de l&apos;INSA. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <Link href="/mentions-legales" className="hover:text-violet-200 transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-violet-200 transition-colors">Politique de confidentialité</Link>
            <Link href="/cgv" className="hover:text-violet-200 transition-colors">CGV</Link>
          </div>
        </div>
      </div>

      {/* Effet de gradient en bas du footer */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    </footer>
  )
} 