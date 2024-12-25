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

interface StrapiRedirection {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sourcePath: string
  type: 'external_url' | 'file'
  externalUrl: string | null
  description: string | null
  active: boolean
  file: any | null
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

// Fonction pour récupérer les redirections depuis Strapi
export async function fetchRedirections(apiUrl: string): Promise<ExternalRoute[]> {
  console.log('Fetching redirections from Strapi:', apiUrl)
  try {
    const response = await fetch(`${apiUrl}/api/redirections`)
    
    console.log('Strapi response status:', response.status)
    const data: StrapiResponse<StrapiRedirection[]> = await response.json()
    console.log('Strapi response data:', JSON.stringify(data, null, 2))
    
    if (data.error || !data.data) {
      console.log('Error or no data in response:', data.error)
      return []
    }
    
    // Convertir les redirections Strapi en ExternalRoute
    const routes = data.data
      .filter(redirection => redirection.active && redirection.type === 'external_url' && redirection.externalUrl)
      .map(redirection => ({
        path: `/${redirection.sourcePath}`.replace(/\/+/g, '/'),
        url: redirection.externalUrl!
      }))
    
    console.log('Converted routes:', routes)
    return routes
  } catch (error) {
    console.error('Error fetching redirections:', error)
    return []
  }
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
export async function findRedirect(path: string, apiUrl?: string): Promise<string | null> {
  console.log('Finding redirect for path:', path)
  console.log('API URL:', apiUrl)
  
  // D'abord, chercher dans les routes statiques
  console.log('Checking static routes:', allExternalRoutes.map(r => r.path))
  const staticRoute = allExternalRoutes.find(route => {
    console.log('Comparing paths:', { routePath: route.path, currentPath: path, match: route.path === path })
    return route.path === path
  })
  if (staticRoute) {
    console.log('Found static route:', staticRoute)
    return staticRoute.url
  }

  // Si une URL d'API est fournie, chercher dans les redirections dynamiques
  if (apiUrl) {
    console.log('Searching in dynamic routes')
    const dynamicRoutes = await fetchRedirections(apiUrl)
    console.log('Found dynamic routes:', dynamicRoutes.map(r => r.path))
    const dynamicRoute = dynamicRoutes.find(route => {
      console.log('Comparing dynamic paths:', { routePath: route.path, currentPath: path, match: route.path === path })
      return route.path === path
    })
    if (dynamicRoute) {
      console.log('Found dynamic route:', dynamicRoute)
      return dynamicRoute.url
    }
  }

  console.log('No redirect found')
  return null
}

// Fonction pour récupérer l'état de maintenance depuis Strapi
export async function fetchMaintenanceMode(apiUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${apiUrl}/api/maintenance`)
    const data: StrapiResponse<StrapiMaintenance> = await response.json()
    
    if (data.error) {
      return false
    }
    
    return data.data?.actif ?? false
  } catch (error) {
    return false
  }
} 