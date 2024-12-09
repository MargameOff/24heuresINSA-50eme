interface ExternalRoute {
  path: string
  url: string
}

interface StrapiAttributes {
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface StrapiMaintenance {
  id: number
  documentId: string
  actif: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface StrapiError {
  status: number
  name: string
  message: string
  details: Record<string, unknown>
}

interface StrapiResponse<T> {
  data: T | null
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  error?: StrapiError
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

// Fonction pour récupérer l'état de maintenance depuis Strapi
export async function fetchMaintenanceMode(apiUrl: string): Promise<boolean> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN
    const response = await fetch(`${apiUrl}/api/maintenance`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    
    const data: StrapiResponse<StrapiMaintenance> = await response.json()
    
    if (data.error) {
      return false
    }
    
    return data.data?.actif ?? false
  } catch (error) {
    return false
  }
} 