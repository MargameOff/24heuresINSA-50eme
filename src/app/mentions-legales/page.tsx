import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Particles } from '@/components/shared/Particles'

export default function MentionsLegalesPage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-gray-950 pt-20 pb-16 relative">
        <Particles isVisible={true} />
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-violet-400 mb-8">Mentions Légales</h1>
          
          <div className="space-y-8 text-violet-100/80">
            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Coordonnées</h2>
              <p className="whitespace-pre-line">
                Club des 24 heures de l'INSA
                Association loi 1901 à but non lucratif
                RdC Bâtiment D – INSA de Lyon
                20 avenue Albert Einstein
                69621 Villeurbanne CEDEX
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Informations Légales</h2>
              <ul className="list-none space-y-2">
                <li>N° TVA : FR93 322 927 674</li>
                <li>N° SIRET : 322 927 674 00018</li>
                <li>N° SIREN : 322 927 674</li>
                <li>Code APE/NAF : 94 99 Z</li>
                <li>N° Association : 691015444</li>
                <li>N° Dossier info (RNA) : W691055107</li>
                <li>Licenses entrepreneur du spectacle : 2-1085832 & 3-1085833</li>
                <li>N° GUSO : 0012794195 / Code : 748C</li>
                <li>Président : Mr. Antoine Piron</li>
              </ul>
              <p className="mt-4">
                Le site www.24heures.org est hébergé par la société OVH (2 rue Kellermann – 59100 Roubaix – France)
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Droits d'Auteurs</h2>
              <p>
                L'intégralité de ce site relève des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.
              </p>
              <p className="mt-2">
                Site basé sur Mazel Template développé par nileforest. Repris et publié par Paul BELIN pour les 24 heures de l'INSA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Charte Graphique</h2>
              <p>
                En collaboration avec MADE iN Sainte-Marie Lyon, la charte graphique de la 49e édition a été réalisée par Maxime ROBERT et Adrien CHARLET GONZALEZ.
              </p>
              <p className="mt-2">
                L'équipe communication est dirigée par Amandine TESTARD. Elle est composée de Maïlys ALEXANDRE, Anna BLANCHET, Gaëtan DANH-NGHET, 
                Marius DELEUIL, Lucas FALLOT, Marianne GUILLIEN, Gaëlle OUDART, Lori POYREUX et Antoni TENREIRO.
              </p>
              <p className="mt-2">
                Le pôle communication de l'équipe course est composé de Claire OLLIVIER et Lucas LEBLANC.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Données Personnelles</h2>
              <p>
                D'une façon générale, vous pouvez visiter notre site sans avoir à décliner votre identité ou à fournir d'informations personnelles. 
                Cependant, pour traiter un achat, établir une correspondance, fournir un abonnement ou soumettre une candidature à un poste, 
                nous pouvons parfois vous demander des informations vous concernant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Cookies</h2>
              <p>
                Le site www.24heures.org peut être amené à vous demander l'acceptation des cookies pour des besoins de statistique et d'affichage. 
                Un cookies est une information déposée sur votre disque dur par le serveur du site que vous visitez. 
                Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour 
                lire et enregistrer des informations. Certaines parties de ce site ne peuvent pas être fonctionnelles sans l'acceptation de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-violet-200 mb-4">Règlements</h2>
              <p>
                Que ce soit en journée, en soirée ou pour les courses, en achetant vos places ou en vous rendant sur le festivals, 
                vous acceptez les différents règlements du festival.
              </p>
              <div className="mt-4 space-y-2">
                <p>Vous pouvez consulter les règlements ci-dessous :</p>
                <ul className="list-disc list-inside space-y-1 text-violet-400">
                  <li><a href="#" className="hover:text-violet-300 transition-colors">Règlement concerts</a></li>
                  <li><a href="#" className="hover:text-violet-300 transition-colors">Règlement animations</a></li>
                  <li><a href="#" className="hover:text-violet-300 transition-colors">Règlement courses</a></li>
                  <li><a href="#" className="hover:text-violet-300 transition-colors">Conditions Générales de Vente</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  )
} 