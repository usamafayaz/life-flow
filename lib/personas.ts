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

// Universal accessibility flags — all features active for everyone
export const UNIVERSAL_FLAGS: PersonaFlags = {
  confirmDestructive: true,
  noGestures: true,
  keyboardShortcutsVisible: true,
  singleClickActions: true,
  iconsAlwaysLabeled: true,
  colorNeverSole: true,
  largeTextControl: true,
  highContrastToggle: false,   // user-controlled toggle
  noAudio: true,
  visualNotificationsOnly: true,
  captionsForMedia: true,
  flashOnImportant: false,     // excluded: photosensitivity risk
  simplifiedLanguage: false,
  focusModeDefault: false,     // user-controlled toggle
  minimalLayout: false,
  errorSuggestions: true,
  progressVisible: true,
  noTimers: false,
  breakReminders: false,
  reducedMotion: false,        // user-controlled toggle
}

export const UNIVERSAL_TOKENS: PersonaTokens = {
  targetSize: '48px',
  fontSizeBase: '1rem',
  fontFamily: 'var(--font-lexend)',
  lineHeight: '1.7',
  letterSpacing: '0.03em',
  maxContentWidth: '65ch',
  elementSpacing: '1.25rem',
  ringWidth: '3px',
  radius: '0.75rem',
  fontWeight: '400',
  headingWeight: '600',
  motionScale: '1',
}
