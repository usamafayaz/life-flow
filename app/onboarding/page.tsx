'use client'

import { useRouter } from 'next/navigation'
import { HeartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePersonaStore } from '@/store/persona-store'

export default function OnboardingPage() {
  const router = useRouter()
  const { setOnboarded } = usePersonaStore()

  const handleContinue = () => {
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
            A task management app built for everyone — accessible by default.
          </p>
        </div>

        {/* Features list */}
        <ul className="space-y-3 mb-8 text-sm text-foreground/80" aria-label="Included accessibility features">
          {[
            'Large, easy-to-tap touch targets',
            'Keyboard navigation with visible shortcuts',
            'Confirm dialogs before completing or exiting a task',
            'Step-by-step task guidance with visible progress',
            'Dyslexia-friendly font and comfortable spacing',
            'Error suggestions to help fix mistakes',
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="mt-0.5 size-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleContinue}
          className="w-full target-size justify-center text-base"
          size="lg"
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          You can adjust text size, contrast, and motion in Settings anytime.
        </p>
      </div>
    </div>
  )
}
