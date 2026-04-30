'use client'

import Link from 'next/link'
import { HomeIcon, ListIcon, SettingsIcon } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { PersonaBanner } from '@/components/persona/PersonaBanner'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {

  return (
    <>
      <Header />
      {/* <PersonaBanner /> */}
      <main
        id="main-content"
        tabIndex={-1}
        className={cn('flex-1 outline-none pb-24 sm:pb-0', className)}
      >
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Mobile navigation"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-sm"
      >
        <div className="flex items-stretch justify-around py-1">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 flex-1 min-h-12 px-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
          >
            <HomeIcon className="size-5 shrink-0" aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link
            href="/tasks"
            className="flex flex-col items-center justify-center gap-1 flex-1 min-h-12 px-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
          >
            <ListIcon className="size-5 shrink-0" aria-hidden="true" />
            <span>Tasks</span>
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center justify-center gap-1 flex-1 min-h-12 px-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
          >
            <SettingsIcon className="size-5 shrink-0" aria-hidden="true" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
