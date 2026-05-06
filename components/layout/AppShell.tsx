'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeartIcon, HomeIcon, ListChecksIcon, TimerIcon, SettingsIcon } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'

const SIDEBAR_NAV = [
  { href: '/', label: 'Dashboard', Icon: HomeIcon, exact: true },
  { href: '/tasks', label: 'Task Manager', Icon: ListChecksIcon, exact: false },
  { href: '/focus', label: 'Focus Mode', Icon: TimerIcon, exact: false },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon, exact: false },
] as const

const MOBILE_NAV = [
  { href: '/', label: 'Home', Icon: HomeIcon, exact: true },
  { href: '/tasks', label: 'Tasks', Icon: ListChecksIcon, exact: false },
  { href: '/focus', label: 'Focus', Icon: TimerIcon, exact: false },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon, exact: false },
] as const

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar — fixed, white, full height */}
      <aside
        data-sidebar
        className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:flex md:w-56 md:flex-col bg-card border-r"
      >
        <div className="flex h-full flex-col px-3 py-5 gap-y-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2 rounded-lg focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
            aria-label="LifeFlow home"
            style={{ fontSize: '16px' }}
          >
            <div className="size-8 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <HeartIcon className="size-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="font-bold text-foreground">LifeFlow</span>
          </Link>

          {/* Nav */}
          <nav aria-label="Main navigation" className="flex-1 space-y-1">
            {SIDEBAR_NAV.map(({ href, label, Icon, exact }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ fontSize: '14px' }}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 h-10 font-medium transition-colors',
                    'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </nav>

        </div>
      </aside>

      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 md:pl-56">
        {/* Mobile-only header */}
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className={cn('flex-1 outline-none pb-[60px] md:pb-0', className)}
        >
          {children}
        </main>

        {/* Mobile bottom navigation */}
        <nav
          aria-label="Mobile navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-sm"
        >
          <div className="flex items-stretch justify-around py-0.5">
            {MOBILE_NAV.map(({ href, label, Icon, exact }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] px-1 text-xs font-medium transition-colors',
                    'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
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
      </div>
    </>
  )
}
