'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HeartIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePersonaStore } from '@/store/persona-store'
import { PERSONAS, type Persona } from '@/lib/personas'
import { cn } from '@/lib/utils'

const PERSONA_ORDER: Persona[] = ['leo', 'daniel', 'noor', 'aisha']

const PERSONA_LABELS: Record<Persona, { title: string; subtitle: string }> = {
  leo: { title: 'ADHD & Dyslexia', subtitle: 'Simplified layouts & focus tools' },
  daniel: { title: 'Visual Impairment', subtitle: 'High contrast & large text' },
  noor: { title: 'Physical Impairment', subtitle: 'Large targets & keyboard nav' },
  aisha: { title: 'Auditory Impairment', subtitle: 'Visual-only notifications' },
}

export default function OnboardingPage() {
  const router = useRouter()
  const { setPersona, setOnboarded } = usePersonaStore()
  const [selected, setSelected] = useState<Persona | null>(null)

  const handleContinue = () => {
    if (selected) {
      setPersona(selected)
    }
    setOnboarded()
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-card rounded-2xl border shadow-sm p-8 sm:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="size-16 bg-primary rounded-2xl flex items-center justify-center">
            <HeartIcon className="size-8 text-primary-foreground" aria-hidden="true" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome to LifeFlow</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            An adaptive life management system designed for your unique needs
          </p>
        </div>

        {/* Persona selector */}
        <fieldset>
          <legend className="text-sm font-semibold text-foreground text-center mb-4">
            Select your accessibility needs (optional)
          </legend>

          <div
            role="radiogroup"
            aria-label="Accessibility needs"
            className="grid grid-cols-2 gap-3"
          >
            {PERSONA_ORDER.map((id) => {
              const { title, subtitle } = PERSONA_LABELS[id]
              const isSelected = selected === id
              return (
                <button
                  key={id}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelected(isSelected ? null : id)}
                  className={cn(
                    'text-left p-4 rounded-xl border-2 transition-all min-h-[var(--target-size)]',
                    'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
                    'bg-card hover:border-primary/50',
                    isSelected ? 'border-primary bg-primary/10' : 'border-border'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'mt-0.5 size-5 rounded shrink-0 border-2 flex items-center justify-center transition-colors',
                        isSelected
                          ? 'bg-primary border-primary'
                          : 'border-muted-foreground/40 bg-background'
                      )}
                      aria-hidden="true"
                    >
                      {isSelected && <CheckIcon className="size-3 text-primary-foreground" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{subtitle}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* CTA */}
        <Button
          onClick={handleContinue}
          className="w-full mt-8 target-size justify-center text-base"
          size="lg"
        >
          Continue to Dashboard
        </Button>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          You can adjust these settings anytime in Settings
        </p>
      </div>
    </div>
  )
}
