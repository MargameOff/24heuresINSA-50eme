interface ExternalRoute {
  path: string
  url: string
}

export const socialRoutes: ExternalRoute[] = [
  {
    path: '/facebook',
    url: 'https://www.facebook.com/24heuresINSA',
  },
  {
    path: '/instagram',
    url: 'https://www.instagram.com/24heuresinsa',
  },
  {
    path: '/twitter',
    url: 'https://twitter.com/24heuresINSA',
  },
]

export const artistRoutes: ExternalRoute[] = [
  // À remplir avec les artistes et leurs liens
  // Exemple:
  // {
  //   path: '/artistes/nom-artiste',
  //   url: 'https://spotify.com/artist/...',
  // },
]

// Combine toutes les routes externes pour faciliter la recherche
export const allExternalRoutes: ExternalRoute[] = [
  ...socialRoutes,
  ...artistRoutes,
]

// Fonction utilitaire pour trouver une redirection
export function findRedirect(path: string): string | null {
  const route = allExternalRoutes.find(route => route.path === path)
  return route ? route.url : null
} 