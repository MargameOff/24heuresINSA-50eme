'use client'

import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { motion } from 'framer-motion'

interface FormData {
  name: string
  email: string
  category: string
  subject: string
  message: string
}

interface ContactSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

const CATEGORIES = [
  { id: 'presse', label: 'Presse' },
  { id: 'concession', label: 'Concession' },
  { id: 'programmation', label: 'Programmation' },
  { id: 'partenariat', label: 'Partenariat' },
  { id: 'autre', label: 'Autre' }
]

export const ContactSection = ({
  title = "Contactez-nous",
  subtitle = "Une question ? Une suggestion ? N'hésitez pas à nous contacter !",
  className = ""
}: ContactSectionProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const captchaValue = recaptchaRef.current?.getValue()
    if (!captchaValue) {
      alert('Veuillez valider le captcha')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captcha: captchaValue,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          category: '',
          subject: '',
          message: ''
        })
        recaptchaRef.current?.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    }

    setIsSubmitting(false)
  }

  return (
    <section className={className}>
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {(title || subtitle) && (
            <div className="text-center">
              {title && <h2 className="text-3xl font-bold text-violet-400 mb-3">{title}</h2>}
              {subtitle && <p className="text-violet-100/80 max-w-2xl mx-auto">{subtitle}</p>}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-violet-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-violet-500/5 border border-violet-500/20 text-white placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-violet-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-violet-500/5 border border-violet-500/20 text-white placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-violet-300 mb-2">
                  Catégorie
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-violet-500/5 border border-violet-500/20 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors appearance-none"
                >
                  <option value="" disabled>Sélectionnez une catégorie</option>
                  {CATEGORIES.map(category => (
                    <option key={category.id} value={category.id} className="bg-gray-900">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-violet-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-violet-500/5 border border-violet-500/20 text-white placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                  placeholder="Le sujet de votre message"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-violet-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-violet-500/5 border border-violet-500/20 text-white placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors resize-none"
                placeholder="Votre message..."
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                theme="dark"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg bg-violet-500 text-white font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-violet-600 hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </div>
          </form>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-4 rounded-lg ${
                submitStatus === 'success'
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {submitStatus === 'success'
                ? 'Votre message a été envoyé avec succès !'
                : 'Une erreur est survenue. Veuillez réessayer.'}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 