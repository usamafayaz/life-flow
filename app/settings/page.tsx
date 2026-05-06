'use client'

import { useState } from 'react'
import { RotateCcwIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { AppShell } from '@/components/layout/AppShell'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'

const FONT_SCALE_STEPS = [90, 100, 110, 120, 130, 140, 150]

function getFontScaleLabel(scale: number): string {
  if (scale <= 90) return 'SMALL'
  if (scale <= 100) return 'NORMAL'
  if (scale <= 115) return 'LARGE'
  if (scale <= 130) return 'LARGER'
  return 'LARGEST'
}

export default function SettingsPage() {
  const {
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
        <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>

        {/* Visual Settings */}
        <section aria-labelledby="visual-settings-heading" className="mb-8">
          <h2
            id="visual-settings-heading"
            className="text-base font-semibold text-foreground mb-4"
          >
            Visual Settings
          </h2>

          <div className="bg-card rounded-xl border divide-y">
            {/* High Contrast Mode */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">High Contrast Mode</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Increase visual contrast for better readability
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
                <p className="text-sm font-medium text-foreground">Text Size</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Adjust text size throughout the app
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={decreaseFont}
                  className="size-8 rounded-lg border bg-muted flex items-center justify-center text-sm font-bold hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
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
                  className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring"
                  aria-label="Increase text size"
                >
                  +
                </button>
              </div>
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Reduce Motion</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Minimise animations and transitions
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

        {/* Data */}
        <section aria-labelledby="data-section-heading" className="border-t pt-8">
          <h2
            id="data-section-heading"
            className="text-base font-semibold text-foreground mb-4"
          >
            Data
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmReset(true)}
              className="target-size gap-2"
            >
              <RotateCcwIcon className="size-4" aria-hidden="true" />
              Reset to defaults
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowConfirmClear(true)}
              className="target-size gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2Icon className="size-4" aria-hidden="true" />
              Clear completion history
            </Button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={showConfirmReset}
        title="Reset to defaults?"
        description="This will reset font size, contrast, and motion settings back to their defaults."
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
