'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, ListIcon, SettingsIcon } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

const NAV_ITEMS = [
  { href: '/', label: 'Home', Icon: HomeIcon, exact: true },
  { href: '/tasks', label: 'Tasks', Icon: ListIcon, exact: false },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon, exact: false },
]

export function AppShell({ children, className }: AppShellProps) {
  const pathname = usePathname()

  return (
    <>
      <Header />
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
          {NAV_ITEMS.map(({ href, label, Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 flex-1 min-h-12 px-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
