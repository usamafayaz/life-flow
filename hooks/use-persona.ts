'use client'

import { usePersonaStore } from '@/store/persona-store'
import { UNIVERSAL_FLAGS, UNIVERSAL_TOKENS, type PersonaFlags, type PersonaTokens } from '@/lib/personas'

interface UsePersonaReturn {
  flags: PersonaFlags
  tokens: PersonaTokens
  fontScale: number
  highContrast: boolean
  reducedMotion: boolean
  focusMode: boolean
  setFontScale: (scale: number) => void
  setHighContrast: (hc: boolean) => void
  setReducedMotion: (rm: boolean) => void
  setFocusMode: (fm: boolean) => void
  resetToDefaults: () => void
}

export function usePersona(): UsePersonaReturn {
  const store = usePersonaStore()

  return {
    flags: {
      ...UNIVERSAL_FLAGS,
      reducedMotion: store.reducedMotion,
    },
    tokens: UNIVERSAL_TOKENS,
    fontScale: store.fontScale,
    highContrast: store.highContrast,
    reducedMotion: store.reducedMotion,
    focusMode: store.focusMode,
    setFontScale: store.setFontScale,
    setHighContrast: store.setHighContrast,
    setReducedMotion: store.setReducedMotion,
    setFocusMode: store.setFocusMode,
    resetToDefaults: store.resetToDefaults,
  }
}
