'use client'

import { usePersonaStore } from '@/store/persona-store'
import { PERSONAS, type Persona, type PersonaConfig, type PersonaFlags, type PersonaTokens } from '@/lib/personas'

interface UsePersonaReturn {
  persona: Persona
  config: PersonaConfig
  flags: PersonaFlags
  tokens: PersonaTokens
  fontScale: number
  highContrast: boolean
  reducedMotion: boolean
  focusMode: boolean
  setPersona: (persona: Persona) => void
  setFontScale: (scale: number) => void
  setHighContrast: (hc: boolean) => void
  setReducedMotion: (rm: boolean) => void
  setFocusMode: (fm: boolean) => void
  resetToDefaults: () => void
}

export function usePersona(): UsePersonaReturn {
  const store = usePersonaStore()
  const config = PERSONAS[store.persona]

  const reducedMotion = store.reducedMotion || config.flags.reducedMotion
  const highContrast = config.flags.highContrastToggle ? true : store.highContrast

  return {
    persona: store.persona,
    config,
    flags: {
      ...config.flags,
      reducedMotion,
    },
    tokens: config.tokens,
    fontScale: store.fontScale,
    highContrast,
    reducedMotion,
    focusMode: store.focusMode || config.flags.focusModeDefault,
    setPersona: store.setPersona,
    setFontScale: store.setFontScale,
    setHighContrast: store.setHighContrast,
    setReducedMotion: store.setReducedMotion,
    setFocusMode: store.setFocusMode,
    resetToDefaults: store.resetToDefaults,
  }
}
