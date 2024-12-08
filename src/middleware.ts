import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { findRedirect } from './data/routes'

// Vous pouvez activer/désactiver le mode maintenance en changeant cette variable
const MAINTENANCE_MODE = false

// Liste des chemins qui seront toujours accessibles même en mode maintenance
const ALLOWED_PATHS = [
  '/stay-tuned',
  '/images',
  '/videos',
]

export function middleware(request: NextRequest) {
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

  // Ensuite, gérer le mode maintenance
  if (MAINTENANCE_MODE && !ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath))) {
    return NextResponse.redirect(new URL('/stay-tuned', request.url))
  }

  return NextResponse.next()
}

// Configuration du middleware pour qu'il s'applique à toutes les routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 