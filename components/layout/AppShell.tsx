'use client'

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
      <PersonaBanner />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn('flex-1 outline-none', className)}
      >
        {children}
      </main>
    </>
  )
}
