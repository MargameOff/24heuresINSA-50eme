'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContactSection } from '@/components/shared/ContactSection'

export default function ContactPage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="bg-gray-950">
        <ContactSection 
          title="Nous contacter"
          subtitle="Vous avez une question ? Une suggestion ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais."
          className="pt-20 pb-16"
        />
      </main>
      <Footer />
    </PageWrapper>
  )
} 