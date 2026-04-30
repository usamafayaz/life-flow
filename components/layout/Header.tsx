'use client'

import Link from 'next/link'
import { SettingsIcon, ActivityIcon } from 'lucide-react'
import { PersonaSwitcher } from '@/components/persona/PersonaSwitcher'
import { AccessibilityQuickBar } from '@/components/layout/AccessibilityQuickBar'
import { usePersona } from '@/hooks/use-persona'
import { cn } from '@/lib/utils'

export function Header() {
  const { flags } = usePersona()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-screen-xl px-4 h-14 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring rounded"
          aria-label="LifeFlow home"
        >
          <ActivityIcon className="size-5 text-primary" aria-hidden="true" />
          <span>LifeFlow</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className={cn('hidden sm:flex items-center gap-1', flags.minimalLayout && 'hidden')}
        >
          <Link
            href="/tasks"
            className="target-size inline-flex items-center text-sm text-muted-foreground hover:text-foreground px-3 rounded-lg hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
          >
            Tasks
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <AccessibilityQuickBar />

          <PersonaSwitcher compact />

          <Link
            href="/settings"
            aria-label="Settings"
            className={cn(
              'target-size inline-flex items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
              flags.iconsAlwaysLabeled ? 'gap-1.5 px-3 text-sm font-medium' : 'justify-center'
            )}
          >
            <SettingsIcon className="size-4" aria-hidden="true" />
            <span className={flags.iconsAlwaysLabeled ? '' : 'sr-only'}>Settings</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
