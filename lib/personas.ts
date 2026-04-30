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

export interface WcagItem {
  code: string
  title: string
  description: string
}

export interface PersonaMeta {
  name: string
  fullName: string
  age: number
  impairment: string
  background: string
  description: string
  goals: string[]
  challenges: string[]
  wcag: string
  wcagDetails: WcagItem[]
  features: string[]
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
      fullName: 'Noor Ahmed',
      age: 22,
      impairment: 'Physical Impairment',
      background: 'University student with limited hand dexterity due to a motor condition. Uses a laptop and phone but struggles with precise interactions.',
      description: 'Limited hand dexterity. Needs large targets and keyboard-first navigation.',
      goals: [
        'Complete daily routines independently',
        'Use apps without frustration',
        'Avoid repetitive or complex gestures',
      ],
      challenges: [
        'Small buttons are hard to press',
        'Drag-and-drop interactions are difficult',
        'Repeated clicks cause fatigue',
      ],
      wcag: '2.1.1, 2.1.2, 2.2.1, 2.4.7, 2.5.1, 2.5.2, 2.5.3, 2.5.5, 3.2.3, 3.3.2',
      wcagDetails: [
        { code: '2.1.1', title: 'Keyboard', description: 'All functionality must be available via keyboard' },
        { code: '2.1.2', title: 'No Keyboard Trap', description: 'Users must not get stuck in components' },
        { code: '2.2.1', title: 'Timing Adjustable', description: 'Users must have enough time to complete actions' },
        { code: '2.4.7', title: 'Focus Visible', description: 'Keyboard focus must be clearly visible' },
        { code: '2.5.1', title: 'Pointer Gestures', description: 'Avoid complex gestures (e.g. multi-touch, drag)' },
        { code: '2.5.2', title: 'Pointer Cancellation', description: 'Prevent accidental input errors' },
        { code: '2.5.3', title: 'Label in Name', description: 'Buttons must match visible labels' },
        { code: '2.5.5', title: 'Target Size', description: 'Minimum touch target size (44×44px recommended)' },
        { code: '3.2.3', title: 'Consistent Navigation', description: 'Navigation must be predictable' },
        { code: '3.3.2', title: 'Labels or Instructions', description: 'Provide clear labels for all inputs' },
      ],
      features: [
        '64px touch targets',
        'Keyboard navigation',
        'Visible keyboard shortcuts',
        'Confirm before actions',
        'No animations',
        'Large element spacing',
        'Pointer gestures avoided',
      ],
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
      fullName: 'Daniel Smith',
      age: 34,
      impairment: 'Visual Impairment',
      background: 'Office worker with low vision. Uses screen zoom and prefers high contrast interfaces.',
      description: 'Low vision. Needs high contrast, large text, and prominent focus indicators.',
      goals: [
        'Easily read all content',
        'Navigate interfaces without confusion',
        'Adjust visual settings freely',
      ],
      challenges: [
        'Low contrast text is unreadable',
        'Small fonts are difficult to read',
        'Icons without labels are confusing',
      ],
      wcag: '1.1.1, 1.3.1, 1.3.2, 1.4.1, 1.4.3, 1.4.4, 1.4.5, 1.4.10, 1.4.11, 2.4.6',
      wcagDetails: [
        { code: '1.1.1', title: 'Non-text Content', description: 'Provide alt text for images' },
        { code: '1.3.1', title: 'Info and Relationships', description: 'Structure content properly with headings and labels' },
        { code: '1.3.2', title: 'Meaningful Sequence', description: 'Content must be readable in correct order' },
        { code: '1.4.1', title: 'Use of Colour', description: 'Do not rely only on colour to convey information' },
        { code: '1.4.3', title: 'Contrast (Minimum)', description: 'Text must meet AA contrast ratio' },
        { code: '1.4.4', title: 'Resize Text', description: 'Text must be scalable up to 200%' },
        { code: '1.4.5', title: 'Images of Text', description: 'Avoid text inside images' },
        { code: '1.4.10', title: 'Reflow', description: 'Content must adapt to different screen sizes' },
        { code: '1.4.11', title: 'Non-text Contrast', description: 'UI elements must have sufficient contrast' },
        { code: '2.4.6', title: 'Headings and Labels', description: 'Must clearly describe content' },
      ],
      features: [
        'High contrast always on',
        'Larger, heavier text',
        'Icon labels always visible',
        '4px focus rings',
        'Underlined links',
        'Text scales to 200%',
        'Strong UI borders',
      ],
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
      fullName: 'Aisha Khan',
      age: 24,
      impairment: 'Auditory Impairment',
      background: 'Deaf user who relies entirely on visual communication.',
      description: 'Deaf. Needs visual-only feedback with clear status indicators.',
      goals: [
        'Receive all information visually',
        'Never miss a notification',
        'Use apps fully independently',
      ],
      challenges: [
        'Audio alerts are not accessible',
        'Voice-only instructions are unusable',
        'Lack of captions limits understanding',
      ],
      wcag: '1.2.1, 1.2.2, 1.2.3, 1.2.5, 1.3.1, 1.4.2, 1.4.13, 3.3.1, 3.3.2, 4.1.2',
      wcagDetails: [
        { code: '1.2.1', title: 'Audio-only & Video-only', description: 'Provide alternatives for audio content' },
        { code: '1.2.2', title: 'Captions (Prerecorded)', description: 'Provide captions for audio content' },
        { code: '1.2.3', title: 'Audio Description', description: 'Provide text alternatives for media' },
        { code: '1.2.5', title: 'Audio Description (Prerecorded)', description: 'Provide visual alternatives' },
        { code: '1.3.1', title: 'Info and Relationships', description: 'Ensure clear visual structure' },
        { code: '1.4.2', title: 'Audio Control', description: 'Avoid auto-playing audio' },
        { code: '1.4.13', title: 'Content on Hover or Focus', description: 'Ensure content remains visible without sound' },
        { code: '3.3.1', title: 'Error Identification', description: 'Errors must be clearly described visually' },
        { code: '3.3.2', title: 'Labels or Instructions', description: 'Provide clear written guidance' },
        { code: '4.1.2', title: 'Name, Role, Value', description: 'Ensure assistive tech compatibility' },
      ],
      features: [
        'Screen flash on step change',
        'Visual-only notifications',
        'No audio dependency',
        'Bold status banners',
        'Extended alert duration',
        'Visual progress tracking',
        'Visual error identification',
      ],
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
      fullName: 'Leo Patel',
      age: 20,
      impairment: 'Cognitive Impairment',
      background: 'Student with ADHD and mild dyslexia. Struggles with focus, reading, and task organisation.',
      description: 'ADHD and mild dyslexia. Needs simplified text and focused, calm layouts.',
      goals: [
        'Complete tasks without feeling overwhelmed',
        'Stay focused throughout',
        'Understand instructions easily',
      ],
      challenges: [
        'Large blocks of text are difficult',
        'Complex layouts cause confusion',
        'Easily distracted by clutter',
      ],
      wcag: '2.4.3, 2.4.5, 3.1.1, 3.1.5, 3.2.1, 3.2.2, 3.2.3, 3.2.4, 3.3.1, 3.3.3',
      wcagDetails: [
        { code: '2.4.3', title: 'Focus Order', description: 'Logical navigation flow through the page' },
        { code: '2.4.5', title: 'Multiple Ways', description: 'Provide different navigation methods' },
        { code: '3.1.1', title: 'Language of Page', description: 'Content must be understandable' },
        { code: '3.1.5', title: 'Reading Level', description: 'Use simple, plain language' },
        { code: '3.2.1', title: 'On Focus', description: 'No unexpected changes on focus' },
        { code: '3.2.2', title: 'On Input', description: 'Avoid sudden UI changes on input' },
        { code: '3.2.3', title: 'Consistent Navigation', description: 'Predictable, consistent UI' },
        { code: '3.2.4', title: 'Consistent Identification', description: 'Same elements behave the same way' },
        { code: '3.3.1', title: 'Error Identification', description: 'Clear, friendly error messages' },
        { code: '3.3.3', title: 'Error Suggestion', description: 'Help users fix mistakes with suggestions' },
      ],
      features: [
        'Dyslexia-friendly font',
        'Simplified language',
        'Full-screen focus mode',
        'Wide line & letter spacing',
        'Break reminders',
        'Minimal, clutter-free layout',
        'Error fix suggestions',
      ],
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
