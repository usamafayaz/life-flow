export type Persona = 'noor' | 'daniel' | 'aisha' | 'leo'

export interface PersonaTokens {
  targetSize: string
  fontSizeBase: string
  fontFamily: string
  lineHeight: string
  letterSpacing: string
  maxContentWidth: string
  elementSpacing: string
  ringWidth: string
  radius: string
  fontWeight: string
  headingWeight: string
  motionScale: string
}

export interface PersonaFlags {
  confirmDestructive: boolean
  noGestures: boolean
  keyboardShortcutsVisible: boolean
  singleClickActions: boolean
  iconsAlwaysLabeled: boolean
  colorNeverSole: boolean
  largeTextControl: boolean
  highContrastToggle: boolean
  noAudio: boolean
  visualNotificationsOnly: boolean
  captionsForMedia: boolean
  flashOnImportant: boolean
  simplifiedLanguage: boolean
  focusModeDefault: boolean
  minimalLayout: boolean
  errorSuggestions: boolean
  progressVisible: boolean
  noTimers: boolean
  breakReminders: boolean
  reducedMotion: boolean
}

export interface PersonaMeta {
  name: string
  age: number
  impairment: string
  description: string
  wcag: string
}

export interface PersonaConfig {
  tokens: PersonaTokens
  flags: PersonaFlags
  meta: PersonaMeta
}

export const PERSONAS: Record<Persona, PersonaConfig> = {
  noor: {
    meta: {
      name: 'Noor',
      age: 34,
      impairment: 'Physical Impairment',
      description: 'Limited hand dexterity. Needs large targets and keyboard-first navigation.',
      wcag: '2.1.1, 2.1.2, 2.5.1, 2.5.5',
    },
    tokens: {
      targetSize: '64px',
      fontSizeBase: '1.125rem',
      fontFamily: 'var(--font-inter)',
      lineHeight: '1.6',
      letterSpacing: '0',
      maxContentWidth: '72ch',
      elementSpacing: '1.5rem',
      ringWidth: '3px',
      radius: '0.75rem',
      fontWeight: '400',
      headingWeight: '600',
      motionScale: '0',
    },
    flags: {
      confirmDestructive: true,
      noGestures: true,
      keyboardShortcutsVisible: true,
      singleClickActions: true,
      iconsAlwaysLabeled: false,
      colorNeverSole: false,
      largeTextControl: false,
      highContrastToggle: false,
      noAudio: false,
      visualNotificationsOnly: false,
      captionsForMedia: false,
      flashOnImportant: false,
      simplifiedLanguage: false,
      focusModeDefault: false,
      minimalLayout: false,
      errorSuggestions: false,
      progressVisible: false,
      noTimers: false,
      breakReminders: false,
      reducedMotion: true,
    },
  },
  daniel: {
    meta: {
      name: 'Daniel',
      age: 52,
      impairment: 'Visual Impairment',
      description: 'Low vision. Needs high contrast, large text, and prominent focus indicators.',
      wcag: '1.4.1, 1.4.3, 1.4.4, 2.4.6',
    },
    tokens: {
      targetSize: '48px',
      fontSizeBase: '1.25rem',
      fontFamily: 'var(--font-inter)',
      lineHeight: '1.6',
      letterSpacing: '0',
      maxContentWidth: '72ch',
      elementSpacing: '1rem',
      ringWidth: '4px',
      radius: '0.625rem',
      fontWeight: '500',
      headingWeight: '700',
      motionScale: '1',
    },
    flags: {
      confirmDestructive: false,
      noGestures: false,
      keyboardShortcutsVisible: false,
      singleClickActions: false,
      iconsAlwaysLabeled: true,
      colorNeverSole: true,
      largeTextControl: true,
      highContrastToggle: true,
      noAudio: false,
      visualNotificationsOnly: false,
      captionsForMedia: false,
      flashOnImportant: false,
      simplifiedLanguage: false,
      focusModeDefault: false,
      minimalLayout: false,
      errorSuggestions: false,
      progressVisible: false,
      noTimers: false,
      breakReminders: false,
      reducedMotion: false,
    },
  },
  aisha: {
    meta: {
      name: 'Aisha',
      age: 28,
      impairment: 'Auditory Impairment',
      description: 'Deaf. Needs visual-only feedback with clear status indicators.',
      wcag: '1.2.1, 1.2.2, 1.4.2, 4.1.2',
    },
    tokens: {
      targetSize: '44px',
      fontSizeBase: '1rem',
      fontFamily: 'var(--font-inter)',
      lineHeight: '1.5',
      letterSpacing: '0',
      maxContentWidth: '72ch',
      elementSpacing: '1rem',
      ringWidth: '2px',
      radius: '0.625rem',
      fontWeight: '400',
      headingWeight: '600',
      motionScale: '1',
    },
    flags: {
      confirmDestructive: false,
      noGestures: false,
      keyboardShortcutsVisible: false,
      singleClickActions: false,
      iconsAlwaysLabeled: false,
      colorNeverSole: true,
      largeTextControl: false,
      highContrastToggle: false,
      noAudio: true,
      visualNotificationsOnly: true,
      captionsForMedia: true,
      flashOnImportant: true,
      simplifiedLanguage: false,
      focusModeDefault: false,
      minimalLayout: false,
      errorSuggestions: false,
      progressVisible: true,
      noTimers: false,
      breakReminders: false,
      reducedMotion: false,
    },
  },
  leo: {
    meta: {
      name: 'Leo',
      age: 19,
      impairment: 'Cognitive Impairment',
      description: 'ADHD and mild dyslexia. Needs simplified text and focused, calm layouts.',
      wcag: '3.1.1, 3.1.5, 3.2.1, 3.3.1',
    },
    tokens: {
      targetSize: '48px',
      fontSizeBase: '1rem',
      fontFamily: 'var(--font-lexend)',
      lineHeight: '1.7',
      letterSpacing: '0.03em',
      maxContentWidth: '60ch',
      elementSpacing: '1rem',
      ringWidth: '2px',
      radius: '1rem',
      fontWeight: '400',
      headingWeight: '600',
      motionScale: '1',
    },
    flags: {
      confirmDestructive: false,
      noGestures: false,
      keyboardShortcutsVisible: false,
      singleClickActions: false,
      iconsAlwaysLabeled: false,
      colorNeverSole: false,
      largeTextControl: false,
      highContrastToggle: false,
      noAudio: false,
      visualNotificationsOnly: false,
      captionsForMedia: false,
      flashOnImportant: false,
      simplifiedLanguage: true,
      focusModeDefault: true,
      minimalLayout: true,
      errorSuggestions: true,
      progressVisible: true,
      noTimers: true,
      breakReminders: true,
      reducedMotion: false,
    },
  },
}

export const defaultPersona: Persona = 'aisha'
