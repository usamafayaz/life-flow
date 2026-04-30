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
      wcag: '1.3.4, 2.5.1, 2.5.2, 2.5.4, 2.5.7, 2.5.8, 2.4.11, 2.1.1, 3.2.2, 3.2.3',
      wcagDetails: [
        { code: '1.3.4', title: 'Orientation', description: 'Content works in both portrait and landscape orientations' },
        { code: '2.5.1', title: 'Pointer Gestures', description: 'No complex multi-touch or path-based gestures required' },
        { code: '2.5.2', title: 'Pointer Cancellation', description: 'Actions activate on pointer release, preventing accidental taps' },
        { code: '2.5.4', title: 'Motion Actuation', description: 'No device shake, tilt, or motion required to operate features' },
        { code: '2.5.7', title: 'Dragging Movements', description: 'All drag interactions have a single-pointer tap alternative' },
        { code: '2.5.8', title: 'Target Size (Minimum)', description: 'Touch targets are at least 24×24px; Noor uses 64px for easier tapping' },
        { code: '2.4.11', title: 'Focus Appearance', description: 'Focus indicator is clearly visible for keyboard and switch access' },
        { code: '2.1.1', title: 'Keyboard / Switch Access', description: 'All functionality operable via keyboard or assistive switch device' },
        { code: '3.2.2', title: 'On Input', description: 'No unexpected UI changes occur on touch or tap' },
        { code: '3.2.3', title: 'Consistent Navigation', description: 'Navigation is predictable and consistent across all screens' },
      ],
      features: [
        '64px touch targets',
        'No complex gestures',
        'Tap-to-release activation',
        'No motion/shake needed',
        'Portrait & landscape support',
        'Confirm before actions',
        'Large element spacing',
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
      wcag: '1.3.4, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 1.4.1, 2.4.11, 1.1.1, 2.4.6',
      wcagDetails: [
        { code: '1.3.4', title: 'Orientation', description: 'Content adapts to portrait and landscape without loss of information' },
        { code: '1.4.3', title: 'Contrast (Minimum)', description: 'Text meets the 4.5:1 AA contrast ratio on all backgrounds' },
        { code: '1.4.4', title: 'Resize Text', description: 'Text scales up to 200% without loss of content or functionality' },
        { code: '1.4.10', title: 'Reflow', description: 'Content reflows at 320px width with no horizontal scrolling needed' },
        { code: '1.4.11', title: 'Non-text Contrast', description: 'UI components and focus indicators meet 3:1 contrast ratio' },
        { code: '1.4.12', title: 'Text Spacing', description: 'No content is lost when line height, letter, or word spacing is adjusted' },
        { code: '1.4.1', title: 'Use of Colour', description: 'Colour is never the sole means of conveying information' },
        { code: '2.4.11', title: 'Focus Appearance', description: 'Keyboard focus indicator has sufficient size and contrast' },
        { code: '1.1.1', title: 'Non-text Content', description: 'All images and icons have accessible text alternatives' },
        { code: '2.4.6', title: 'Headings and Labels', description: 'Headings and labels clearly describe purpose and content' },
      ],
      features: [
        'High contrast always on',
        'Larger, heavier text',
        'Reflows at 320px width',
        'Icon labels always visible',
        '4px focus rings',
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
      wcag: '1.2.1, 1.2.2, 1.4.2, 1.3.4, 4.1.3, 1.3.1, 3.3.1, 3.3.2, 4.1.2, 1.4.13',
      wcagDetails: [
        { code: '1.2.1', title: 'Audio-only & Video-only', description: 'Text or visual alternatives provided for all audio-only content' },
        { code: '1.2.2', title: 'Captions (Prerecorded)', description: 'Captions provided for all prerecorded audio in video' },
        { code: '1.4.2', title: 'Audio Control', description: 'No audio plays automatically; all alerts are visual-only' },
        { code: '1.3.4', title: 'Orientation', description: 'Visual content works in both portrait and landscape orientations' },
        { code: '4.1.3', title: 'Status Messages', description: 'Status changes are conveyed visually without requiring focus' },
        { code: '1.3.1', title: 'Info and Relationships', description: 'Visual structure clearly conveys meaning and hierarchy' },
        { code: '3.3.1', title: 'Error Identification', description: 'Errors are identified and described visually, not by sound' },
        { code: '3.3.2', title: 'Labels or Instructions', description: 'All inputs and actions have clear written labels' },
        { code: '4.1.2', title: 'Name, Role, Value', description: 'All UI components expose state to assistive technologies' },
        { code: '1.4.13', title: 'Content on Hover or Focus', description: 'Tooltips and popups are persistent and dismissable' },
      ],
      features: [
        'Screen flash on step change',
        'Visual-only notifications',
        'No audio dependency',
        'Extended alert duration (8s)',
        'Bold status banners',
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
      wcag: '1.3.4, 3.1.5, 3.2.1, 3.2.2, 3.2.3, 3.3.1, 3.3.3, 3.3.7, 3.3.8, 2.5.8',
      wcagDetails: [
        { code: '1.3.4', title: 'Orientation', description: 'Content works in both portrait and landscape without disorientation' },
        { code: '3.1.5', title: 'Reading Level', description: 'Content is written in plain, simple language (lower secondary level)' },
        { code: '3.2.1', title: 'On Focus', description: 'No unexpected context changes occur when a component receives focus' },
        { code: '3.2.2', title: 'On Input', description: 'No sudden UI changes happen on touch or tap input' },
        { code: '3.2.3', title: 'Consistent Navigation', description: 'Navigation is consistent and predictable across all screens' },
        { code: '3.3.1', title: 'Error Identification', description: 'Errors are described clearly with friendly, actionable messages' },
        { code: '3.3.3', title: 'Error Suggestion', description: 'Suggestions are provided to help users correct mistakes' },
        { code: '3.3.7', title: 'Redundant Entry', description: 'Users are not asked to re-enter information already provided' },
        { code: '3.3.8', title: 'Accessible Authentication', description: 'No cognitive puzzle or memory test required to log in' },
        { code: '2.5.8', title: 'Target Size (Minimum)', description: 'All touch targets meet minimum 24×24px; reduces mis-taps' },
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
