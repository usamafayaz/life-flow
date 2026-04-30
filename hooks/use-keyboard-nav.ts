'use client'

import { useEffect, useCallback } from 'react'

interface UseKeyboardNavOptions {
  onNext?: () => void
  onPrev?: () => void
  onExit?: () => void
  enabled?: boolean
}

export function useKeyboardNav({
  onNext,
  onPrev,
  onExit,
  enabled = true,
}: UseKeyboardNavOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return
      const tag = (e.target as HTMLElement).tagName.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return

      if ((e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') && onNext) {
        if (e.key === ' ') e.preventDefault()
        onNext()
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev()
      } else if (e.key === 'Escape' && onExit) {
        onExit()
      }
    },
    [enabled, onNext, onPrev, onExit]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
