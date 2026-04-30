'use client'

import { useState } from 'react'
import { RotateCcwIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { AppShell } from '@/components/layout/AppShell'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { useText } from '@/hooks/use-text'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'
import { PERSONAS, type Persona } from '@/lib/personas'
import { cn } from '@/lib/utils'

const PERSONA_ORDER: Persona[] = ['noor', 'daniel', 'aisha', 'leo']

const PERSONA_ICONS: Record<Persona, string> = {
  noor: '✋',
  daniel: '👁',
  aisha: '👂',
  leo: '🧠',
}

const FONT_SCALE_STEPS = [90, 100, 110, 120, 130, 140, 150]

function getFontScaleLabel(scale: number): string {
  if (scale <= 90) return 'SMALL'
  if (scale <= 100) return 'NORMAL'
  if (scale <= 115) return 'LARGE'
  if (scale <= 130) return 'LARGER'
  return 'LARGEST'
}

export default function SettingsPage() {
  const t = useText()
  const {
    persona,
    setPersona,
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    resetToDefaults,
  } = usePersona()

  const clearHistory = useTaskStore((s) => s.clearHistory)
  const [showConfirmClear, setShowConfirmClear] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const decreaseFont = () => {
    const idx = FONT_SCALE_STEPS.indexOf(fontScale)
    if (idx > 0) setFontScale(FONT_SCALE_STEPS[idx - 1])
    else setFontScale(Math.max(90, fontScale - 10))
  }

  const increaseFont = () => {
    const idx = FONT_SCALE_STEPS.indexOf(fontScale)
    if (idx !== -1 && idx < FONT_SCALE_STEPS.length - 1) setFontScale(FONT_SCALE_STEPS[idx + 1])
    else setFontScale(Math.min(150, fontScale + 10))
  }

  return (
    <AppShell>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          {t({ default: 'Settings', simple: 'Settings' })}
        </h1>

        {/* Section 1: Accessibility Needs */}
        <section aria-labelledby="accessibility-needs-heading" className="mb-8">
          <h2
            id="accessibility-needs-heading"
            className="text-base font-semibold text-foreground mb-4"
          >
            {t({ default: 'Your Accessibility Needs', simple: 'Your profile' })}
          </h2>

          <div
            role="group"
            aria-label="Select accessibility profile"
            className="grid grid-cols-2 gap-3"
          >
            {PERSONA_ORDER.map((id) => {
              const config = PERSONAS[id]
              const isActive = persona === id
              return (
                <button
                  key={id}
                  onClick={() => setPersona(id)}
                  aria-pressed={isActive}
                  className={cn(
                    'text-left p-4 rounded-xl border-2 transition-all',
                    'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
                    'bg-card hover:border-primary/50',
                    isActive ? 'border-primary bg-primary/10' : 'border-border'
                  )}
                >
                  <span className="text-2xl block mb-1" aria-hidden="true">
                    {PERSONA_ICONS[id]}
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {config.meta.impairment}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {config.meta.description}
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        {/* Section 2: Visual Settings */}
        <section aria-labelledby="visual-settings-heading" className="mb-8 border-t pt-8">
          <h2
            id="visual-settings-heading"
            className="text-base font-semibold text-foreground mb-4"
          >
            {t({ default: 'Visual Settings', simple: 'How it looks' })}
          </h2>

          <div className="bg-card rounded-xl border divide-y">
            {/* High Contrast Mode */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t({ default: 'High Contrast Mode', simple: 'More contrast' })}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t({
                    default: 'Increase visual contrast for better readability',
                    simple: 'Make colours stand out more',
                  })}
                </p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={setHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            {/* Text Size */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t({ default: 'Text Size', simple: 'Text size' })}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t({
                    default: 'Adjust text size throughout the app',
                    simple: 'Make text bigger or smaller',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={decreaseFont}
                  className={cn(
                    'size-8 rounded-lg border bg-muted flex items-center justify-center',
                    'text-sm font-bold hover:bg-accent transition-colors',
                    'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                  )}
                  aria-label="Decrease text size"
                >
                  −
                </button>
                <span
                  className="text-sm font-medium w-16 text-center tabular-nums"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {getFontScaleLabel(fontScale)}
                </span>
                <button
                  onClick={increaseFont}
                  className={cn(
                    'size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center',
                    'text-sm font-bold hover:bg-primary/90 transition-colors',
                    'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                  )}
                  aria-label="Increase text size"
                >
                  +
                </button>
              </div>
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t({ default: 'Reduce Motion', simple: 'Less movement' })}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t({
                    default: 'Minimise animations and transitions',
                    simple: 'Turn off animations',
                  })}
                </p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
                aria-label="Toggle reduce motion"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Data */}
        <section aria-labelledby="data-section-heading" className="border-t pt-8">
          <h2
            id="data-section-heading"
            className="text-base font-semibold text-foreground mb-4"
          >
            {t({ default: 'Data', simple: 'Your data' })}
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmReset(true)}
              className="target-size gap-2"
            >
              <RotateCcwIcon className="size-4" aria-hidden="true" />
              {t({ default: 'Reset to profile defaults', simple: 'Reset settings' })}
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowConfirmClear(true)}
              className="target-size gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2Icon className="size-4" aria-hidden="true" />
              {t({ default: 'Clear completion history', simple: 'Delete history' })}
            </Button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={showConfirmReset}
        title="Reset to profile defaults?"
        description="This will reset font size, contrast, and motion settings back to your selected profile's defaults."
        confirmLabel="Reset"
        cancelLabel="Cancel"
        variant="default"
        onConfirm={() => {
          resetToDefaults()
          setShowConfirmReset(false)
        }}
        onCancel={() => setShowConfirmReset(false)}
      />

      <ConfirmDialog
        open={showConfirmClear}
        title="Clear all history?"
        description="This will permanently delete your task completion history. This cannot be undone."
        confirmLabel="Clear history"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={() => {
          clearHistory()
          setShowConfirmClear(false)
        }}
        onCancel={() => setShowConfirmClear(false)}
      />
    </AppShell>
  )
}
