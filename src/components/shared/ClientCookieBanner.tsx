'use client'

import dynamic from 'next/dynamic'

const CookieBanner = dynamic(
  () => import('./CookieBanner').then(mod => mod.CookieBanner),
  { ssr: false }
)

export const ClientCookieBanner = () => {
  return <CookieBanner />
} 