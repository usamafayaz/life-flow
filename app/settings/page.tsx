'use client'

import { useState } from 'react'
import { ArrowLeftIcon, RotateCcwIcon, Trash2Icon, CheckCircle2Icon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { AppShell } from '@/components/layout/AppShell'
import { PersonaCard } from '@/components/persona/PersonaCard'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { useText } from '@/hooks/use-text'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'
import type { Persona } from '@/lib/personas'

const PERSONAS: Persona[] = ['noor', 'daniel', 'aisha', 'leo']

export default function SettingsPage() {
  const t = useText()
  const {
    persona,
    config,
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

  return (
    <AppShell>
      <div className="mx-auto max-w-screen-md px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <nav aria-label="Breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring rounded"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            {t({ default: 'Back to home', simple: 'Back' })}
          </Link>
        </nav>

        <header>
          <h1 className="text-2xl font-bold text-foreground">
            {t({ default: 'Accessibility settings', simple: 'Settings' })}
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            {t({
              default: 'Customise how LifeFlow looks and behaves for you.',
              simple: 'Change how the app works for you.',
            })}
          </p>
        </header>

        {/* Persona */}
        <section aria-labelledby="persona-section-heading" className="space-y-4">
          <h2 id="persona-section-heading" className="text-base font-semibold text-foreground">
            {t({ default: 'Accessibility profile', simple: 'Your profile' })}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PERSONAS.map((id) => (
              <PersonaCard key={id} id={id} />
            ))}
          </div>
        </section>

        {/* Active features for current persona */}
        <section aria-labelledby="active-features-heading" className="space-y-4">
          <div>
            <h2 id="active-features-heading" className="text-base font-semibold text-foreground">
              {t({ default: 'Active accessibility features', simple: 'What is turned on' })}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {t({
                default: `Features enabled for ${config.meta.fullName} (${config.meta.impairment})`,
                simple: `What is on for ${config.meta.name}`,
              })}
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
            {config.meta.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
                <CheckCircle2Icon className="size-4 text-primary shrink-0" aria-hidden="true" />
                <span className="text-foreground">{f}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">WCAG 2.1 guidelines covered:</p>
            <div className="flex flex-wrap gap-1.5">
              {config.meta.wcagDetails.map((w) => (
                <span
                  key={w.code}
                  title={w.description}
                  className="text-xs bg-muted border border-border px-2 py-0.5 rounded font-mono text-muted-foreground"
                >
                  {w.code} – {w.title}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Display overrides */}
        <section aria-labelledby="display-section-heading" className="space-y-5">
          <h2 id="display-section-heading" className="text-base font-semibold text-foreground">
            {t({ default: 'Display overrides', simple: 'How it looks' })}
          </h2>

          {/* Font scale */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-scale-slider" className="text-sm font-medium">
                {t({ default: 'Text size', simple: 'Text size' })}
              </Label>
              <span
                className="text-sm text-muted-foreground tabular-nums"
                aria-live="polite"
                aria-atomic="true"
              >
                {fontScale}%
              </span>
            </div>
            <input
              id="font-scale-slider"
              type="range"
              min={100}
              max={200}
              step={10}
              value={fontScale}
              onChange={(e) => setFontScale(Number(e.target.value))}
              aria-valuemin={100}
              aria-valuemax={200}
              aria-valuenow={fontScale}
              aria-valuetext={`${fontScale}%`}
              className="w-full target-size accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
              <span>100%</span>
              <span>150%</span>
              <span>200%</span>
            </div>
          </div>

          {/* High contrast */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="high-contrast-toggle" className="text-sm font-medium">
                {t({ default: 'High contrast', simple: 'More contrast' })}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t({
                  default: 'Increase contrast between text and background.',
                  simple: 'Make colours stand out more.',
                })}
              </p>
            </div>
            <Switch
              id="high-contrast-toggle"
              checked={highContrast}
              onCheckedChange={setHighContrast}
              aria-label="Toggle high contrast"
            />
          </div>

          {/* Reduced motion */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="reduce-motion-toggle" className="text-sm font-medium">
                {t({ default: 'Reduce motion', simple: 'Less movement' })}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t({
                  default: 'Minimise animations and transitions throughout the app.',
                  simple: 'Turn off animations.',
                })}
              </p>
            </div>
            <Switch
              id="reduce-motion-toggle"
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
              aria-label="Toggle reduce motion"
            />
          </div>

        </section>

        <Separator />

        {/* Data management */}
        <section aria-labelledby="data-section-heading" className="space-y-4">
          <h2 id="data-section-heading" className="text-base font-semibold text-foreground">
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
        onConfirm={() => { resetToDefaults(); setShowConfirmReset(false) }}
        onCancel={() => setShowConfirmReset(false)}
      />

      <ConfirmDialog
        open={showConfirmClear}
        title="Clear all history?"
        description="This will permanently delete your task completion history. This cannot be undone."
        confirmLabel="Clear history"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={() => { clearHistory(); setShowConfirmClear(false) }}
        onCancel={() => setShowConfirmClear(false)}
      />
    </AppShell>
  )
}
