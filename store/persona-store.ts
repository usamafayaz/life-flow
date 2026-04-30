'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Persona, defaultPersona } from '@/lib/personas'

interface PersonaState {
  persona: Persona
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

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set) => ({
      persona: defaultPersona,
      fontScale: 100,
      highContrast: false,
      reducedMotion: false,
      focusMode: false,
      setPersona: (persona) => set({ persona }),
      setFontScale: (fontScale) => set({ fontScale }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setFocusMode: (focusMode) => set({ focusMode }),
      resetToDefaults: () =>
        set({
          fontScale: 100,
          highContrast: false,
          reducedMotion: false,
          focusMode: false,
        }),
    }),
    { name: 'lifeflow-persona' }
  )
)
