'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessibilityState {
  fontScale: number
  highContrast: boolean
  reducedMotion: boolean
  focusMode: boolean
  onboarded: boolean
  setFontScale: (scale: number) => void
  setHighContrast: (hc: boolean) => void
  setReducedMotion: (rm: boolean) => void
  setFocusMode: (fm: boolean) => void
  setOnboarded: () => void
  resetToDefaults: () => void
}

export const usePersonaStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      fontScale: 100,
      highContrast: false,
      reducedMotion: false,
      focusMode: false,
      onboarded: false,
      setFontScale: (fontScale) => set({ fontScale }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setFocusMode: (focusMode) => set({ focusMode }),
      setOnboarded: () => set({ onboarded: true }),
      resetToDefaults: () =>
        set({
          fontScale: 100,
          highContrast: false,
          reducedMotion: false,
          focusMode: false,
        }),
    }),
    {
      name: 'lifeflow-persona',
      version: 2,
      migrate: (persisted: unknown, version: number) => {
        if (!persisted || typeof persisted !== 'object') return {}
        const s = persisted as Partial<AccessibilityState>
        if (version < 2) {
          // Reset onboarded so existing users see the new universal-accessibility onboarding.
          return {
            fontScale: s.fontScale ?? 100,
            highContrast: s.highContrast ?? false,
            reducedMotion: s.reducedMotion ?? false,
            focusMode: s.focusMode ?? false,
            onboarded: false,
          }
        }
        return persisted
      },
    }
  )
)
