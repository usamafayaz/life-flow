'use client'

import { useEffect } from 'react'
import { usePersonaStore } from '@/store/persona-store'

export function ThemeBootstrap() {
  const { fontScale, highContrast, reducedMotion } = usePersonaStore()

  useEffect(() => {
    const html = document.documentElement
    html.style.setProperty('--font-scale', String(fontScale / 100))
    html.setAttribute('data-high-contrast', String(highContrast))
    html.setAttribute('data-reduce-motion', String(reducedMotion))
  }, [fontScale, highContrast, reducedMotion])

  return null
}
