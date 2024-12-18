import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { findRedirect, fetchMaintenanceMode } from './data/routes'

// URL de l'API Strapi
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

// Liste des chemins qui seront toujours accessibles même en mode maintenance
const ALLOWED_PATHS = [
  '/stay-tuned',
  '/images',
  '/videos',
]

// Cache pour l'état de maintenance
let maintenanceMode = false
let lastMaintenanceFetch = 0
const CACHE_DURATION = 30 * 1000 // 30 secondes en millisecondes

// Cache pour les redirections
let redirectionsCache: Record<string, string> = {}
let lastRedirectionsFetch = 0

// Fonction pour mettre à jour le cache de l'état de maintenance
async function updateMaintenanceCache() {
  const now = Date.now()
  if (now - lastMaintenanceFetch > CACHE_DURATION) {
    maintenanceMode = await fetchMaintenanceMode(STRAPI_API_URL)
    lastMaintenanceFetch = now
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log('Middleware handling path:', path)

  // Autoriser l'accès aux ressources statiques
  if (path.startsWith('/images/') || path.startsWith('/videos/')) {
    console.log('Static resource access, continuing...')
    return NextResponse.next()
  }

  // Vérifier d'abord s'il y a une redirection externe
  console.log('Checking for external redirect with API URL:', STRAPI_API_URL)
  const externalRedirect = await findRedirect(path, STRAPI_API_URL)
  console.log('External redirect result:', externalRedirect)
  
  if (externalRedirect) {
    console.log('Redirecting to:', externalRedirect)
    const redirectUrl = new URL(externalRedirect)
    console.log('Constructed redirect URL:', redirectUrl.toString())
    return NextResponse.redirect(redirectUrl)
  }

  // Mettre à jour et vérifier l'état de maintenance
  await updateMaintenanceCache()
  console.log('Maintenance mode:', maintenanceMode)
  
  if (maintenanceMode) {
    const isAllowedPath = ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath))
    console.log('Path allowed during maintenance?', isAllowedPath)
    if (!isAllowedPath) {
      return NextResponse.redirect(new URL('/stay-tuned', request.url))
    }
  } else if (path === '/stay-tuned') {
    // Si le mode maintenance est désactivé et qu'on essaie d'accéder à stay-tuned
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log('No redirects needed, continuing...')
  return NextResponse.next()
}

// Configuration du middleware pour qu'il s'applique à toutes les routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 