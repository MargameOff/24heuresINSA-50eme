'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { LineUpSection } from '@/components/home/LineUpSection'
import { ProgrammationSection } from '@/components/home/ProgrammationSection'
import { EditoSection } from '@/components/home/EditoSection'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-gray-900">
        <HeroSection />
        <LineUpSection />
        <ProgrammationSection />
        <EditoSection />
      </main>
      <Footer />
    </PageWrapper>
  )
}
