'use client'

import { useEffect, useState, use } from 'react'
import { artistsData } from '@/data/artists'
import { Artist } from '@/types/types'
import { Particles } from '@/components/shared/Particles'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import Link from 'next/link'
import Image from 'next/image'

const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
}

export default function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params)
    const [artist, setArtist] = useState<Artist | null>(null)

    useEffect(() => {
        const foundArtist = artistsData.find(a => a.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.slug)
        setArtist(foundArtist || null)
    }, [resolvedParams.slug])

    if (!artist) {
        return (
            <PageWrapper>
                <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl text-violet-200">Artiste non trouvé</h1>
                        <Link href="/" className="mt-4 inline-block text-violet-400 hover:text-violet-300">
                            Retour à l&apos;accueil
                        </Link>
                    </div>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <Navbar />
            <main className="min-h-screen bg-gray-900 relative">
                {/* Header avec image de fond */}
                <div className="relative h-[60vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={artist.image}
                            alt={artist.name}
                            fill
                            className="object-cover brightness-50"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="container mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href="/"
                                    className="inline-flex items-center text-violet-300 hover:text-violet-200 group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 transform transition-transform group-hover:-translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Retour
                                </Link>
                                <div className="hidden md:flex gap-4">
                                    {artistsData.findIndex(a => a.name === artist.name) > 0 && (
                                        <Link
                                            href={`/artistes/${artistsData[artistsData.findIndex(a => a.name === artist.name) - 1].name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="px-4 py-2 rounded-full bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 transition-all duration-200"
                                        >
                                            Artiste précédent
                                        </Link>
                                    )}
                                    {artistsData.findIndex(a => a.name === artist.name) < artistsData.length - 1 && (
                                        <Link
                                            href={`/artistes/${artistsData[artistsData.findIndex(a => a.name === artist.name) + 1].name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="px-4 py-2 rounded-full bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 transition-all duration-200"
                                        >
                                            Artiste suivant
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{artist.name}</h1>
                            <div className="flex flex-wrap gap-2">
                                {artist.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium bg-violet-600/50 text-white backdrop-blur-sm"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Colonne principale */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            <div className="prose prose-invert prose-violet max-w-none mb-12">
                                <h2 className="text-2xl font-bold text-violet-200 mb-4">À propos</h2>
                                <div className="text-violet-100/90 leading-relaxed space-y-4">
                                    {artist.description.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Vidéo YouTube */}
                            {artist.youtubeVideo && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-violet-200 mb-6">Découvrir</h2>
                                    <div className="relative pb-[56.25%] h-0">
                                        <iframe
                                            src={getYoutubeEmbedUrl(artist.youtubeVideo)}
                                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Informations */}
                            <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-400/20 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-violet-200 mb-4">Informations</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-violet-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{artist.day}</span>
                                        {artist.time && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{artist.time}</span>
                                            </>
                                        )}
                                    </div>
                                    {artist.stage && (
                                        <div className="flex items-center gap-2 text-violet-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                            </svg>
                                            <span>{artist.stage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Spotify Profile */}
                            {artist.socialLinks?.spotify && (
                                <div>
                                    <h2 className="text-2xl font-bold text-violet-200 mb-4">Profil Spotify</h2>
                                    <div className="relative pb-[380px] h-0">
                                        <iframe
                                            src={`${artist.socialLinks.spotify.replace('/artist/', '/embed/artist/')}`}
                                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                                            allowFullScreen
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Liens sociaux */}
                            {artist.socialLinks && (
                                <div>
                                    <h2 className="text-2xl font-bold text-violet-200 mb-4">Suivre {artist.name}</h2>
                                    <div className="flex flex-wrap gap-4">
                                        {artist.socialLinks.instagram && (
                                            <a
                                                href={artist.socialLinks.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 hover:text-violet-200 rounded-full transition-all duration-200 hover:scale-105"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                                <span>Instagram</span>
                                            </a>
                                        )}
                                        {artist.socialLinks.youtube && (
                                            <a
                                                href={artist.socialLinks.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 hover:text-violet-200 rounded-full transition-all duration-200 hover:scale-105"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                                <span>YouTube</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* À découvrir - Section pleine largeur */}
                    <div className="mt-16 max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold text-violet-200 mb-6">À découvrir aussi</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {artistsData
                                .filter(a => a.name !== artist.name)
                                .sort(() => Math.random() - 0.5)
                                .slice(0, 3)
                                .map((randomArtist) => (
                                    <Link
                                        key={randomArtist.name}
                                        href={`/artistes/${randomArtist.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group relative overflow-hidden rounded-xl aspect-square"
                                    >
                                        <Image
                                            src={randomArtist.image}
                                            alt={randomArtist.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-lg font-bold text-white mb-1">{randomArtist.name}</h3>
                                            <div className="flex flex-wrap gap-1">
                                                {randomArtist.genres.slice(0, 2).map((genre, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs px-2 py-1 rounded-full bg-violet-500/50 text-violet-100"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>

                <Particles isVisible={true} />
            </main>
            <Footer />
        </PageWrapper>
    )
} 