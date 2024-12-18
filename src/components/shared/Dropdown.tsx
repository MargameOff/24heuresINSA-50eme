import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface DropdownProps {
  label: string
  options: { id: string; label: string }[]
  value: string
  onChange: (value: string) => void
}

export const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(opt => opt.id === value)

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="text-violet-300 text-sm font-medium whitespace-nowrap">{label} :</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-violet-500/5 border border-violet-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/10 transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-between"
        >
          <span>{selectedOption?.label}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full min-w-[140px]"
          >
            <div className="bg-gray-900/95 backdrop-blur-sm border border-violet-500/20 rounded-xl py-1 shadow-xl">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange(option.id)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                    option.id === value
                      ? 'text-violet-400 bg-violet-500/10'
                      : 'text-violet-200 hover:bg-violet-500/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 