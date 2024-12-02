'use client'

import { Particles } from '@/components/shared/Particles'

export const EditoSection = () => {
  return (
    <section className="bg-gray-900 relative overflow-hidden py-16">
      <div className="container mx-auto px-6 md:px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white">
            Édito
            <span className="block text-2xl md:text-3xl mt-4 text-violet-400/80 font-bold animate-fade-in-up animation-delay-300">
              50 ans de musique et de partage
            </span>
          </h2>

          <div className="space-y-6 text-lg text-violet-100/90">
            {/* Premier paragraphe avec mise en avant */}
            <div className="relative p-6 rounded-2xl bg-violet-500/5 border border-violet-400/20 backdrop-blur-sm animate-fade-in-up">
              <p className="leading-relaxed">
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                  Depuis 1974
                </span>
                , les 24 heures de l&apos;INSA font vibrer le campus de la Doua au rythme des plus grands artistes de la scène musicale. Cette année, pour notre 50e édition, nous vous préparons un festival encore plus exceptionnel, à la hauteur de cet anniversaire historique.
              </p>
            </div>

            {/* Deuxième paragraphe avec citation */}
            <div className="relative p-6 animate-fade-in-up animation-delay-300">
              <blockquote className="relative">
                <div className="absolute -top-4 -left-4 text-5xl text-violet-400/30">"</div>
                <p className="relative z-10 italic text-xl md:text-2xl text-center text-violet-200">
                  Le plus grand festival étudiant de France continue d&apos;écrire son histoire, 
                  avec vous, pour vous.
                </p>
                <div className="absolute -bottom-4 -right-4 text-5xl text-violet-400/30">"</div>
              </blockquote>
            </div>

            {/* Troisième paragraphe avec stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 animate-fade-in-up animation-delay-500">
              <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-400/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent mb-2">
                  45 000+
                </div>
                <div className="text-violet-300">festivaliers en 2023</div>
              </div>
              <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-400/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent mb-2">
                  50
                </div>
                <div className="text-violet-300">années d&apos;histoire</div>
              </div>
              <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-400/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent mb-2">
                  1000+
                </div>
                <div className="text-violet-300">bénévoles</div>
              </div>
            </div>

            {/* Quatrième paragraphe avec appel à l'action */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-700">
              <p className="text-xl">
                Cette année encore, nous vous promettons un festival inoubliable, 
                mêlant têtes d&apos;affiche internationales et découvertes musicales, 
                dans une ambiance unique en son genre.
              </p>
              
              <button className="px-8 py-4 bg-violet-500/10 hover:bg-violet-500/20 text-violet-200 font-medium rounded-full transition-all duration-300 hover:scale-105 border-2 border-violet-400/30 hover:border-violet-400/50 backdrop-blur-sm">
                Découvrir notre histoire
              </button>
            </div>
          </div>
        </div>
      </div>

      <Particles isVisible={true} />
    </section>
  )
}
