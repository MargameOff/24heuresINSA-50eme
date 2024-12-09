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

  // Autoriser l'accès aux ressources statiques
  if (path.startsWith('/images/') || path.startsWith('/videos/')) {
    return NextResponse.next()
  }

  // Vérifier d'abord s'il y a une redirection externe
  const externalRedirect = findRedirect(path)
  if (externalRedirect) {
    return NextResponse.redirect(externalRedirect)
  }

  // Mettre à jour et vérifier l'état de maintenance
  await updateMaintenanceCache()
  
  if (maintenanceMode) {
    const isAllowedPath = ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath))
    if (!isAllowedPath) {
      return NextResponse.redirect(new URL('/stay-tuned', request.url))
    }
  } else if (path === '/stay-tuned') {
    // Si le mode maintenance est désactivé et qu'on essaie d'accéder à stay-tuned
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configuration du middleware pour qu'il s'applique à toutes les routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 