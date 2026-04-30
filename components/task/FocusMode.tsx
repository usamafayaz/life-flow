'use client'

import { usePersona } from '@/hooks/use-persona'
import { cn } from '@/lib/utils'

interface FocusModeProps {
  children: React.ReactNode
  active?: boolean
  className?: string
}

export function FocusMode({ children, active, className }: FocusModeProps) {
  const { focusMode } = usePersona()
  const isFocus = active ?? focusMode

  return (
    <div
      data-focus-mode={isFocus}
      className={cn(
        isFocus && 'fixed inset-0 z-30 bg-background overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  )
}
