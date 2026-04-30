'use client'

import { cn } from '@/lib/utils'
import { usePersona } from '@/hooks/use-persona'
import { PERSONAS, type Persona } from '@/lib/personas'

const PERSONA_ICONS: Record<Persona, string> = {
  noor: '✋',
  daniel: '👁',
  aisha: '👂',
  leo: '🧠',
}

const PERSONA_COLORS: Record<Persona, string> = {
  noor: 'from-blue-50 border-blue-200 hover:border-blue-400',
  daniel: 'from-purple-50 border-purple-200 hover:border-purple-400',
  aisha: 'from-green-50 border-green-200 hover:border-green-400',
  leo: 'from-amber-50 border-amber-200 hover:border-amber-400',
}

const ACTIVE_COLORS: Record<Persona, string> = {
  noor: 'border-blue-500 ring-2 ring-blue-300',
  daniel: 'border-purple-500 ring-2 ring-purple-300',
  aisha: 'border-green-500 ring-2 ring-green-300',
  leo: 'border-amber-500 ring-2 ring-amber-300',
}

const BADGE_COLORS: Record<Persona, string> = {
  noor: 'bg-blue-100 text-blue-800 border-blue-200',
  daniel: 'bg-violet-100 text-violet-800 border-violet-200',
  aisha: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  leo: 'bg-amber-100 text-amber-800 border-amber-200',
}

const WCAG_COLORS: Record<Persona, string> = {
  noor: 'bg-blue-50 text-blue-700 border-blue-200',
  daniel: 'bg-violet-50 text-violet-700 border-violet-200',
  aisha: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  leo: 'bg-amber-50 text-amber-700 border-amber-200',
}

const SECTION_LABEL: Record<Persona, string> = {
  noor: 'text-blue-700',
  daniel: 'text-violet-700',
  aisha: 'text-emerald-700',
  leo: 'text-amber-700',
}

interface PersonaCardProps {
  id: Persona
}

export function PersonaCard({ id }: PersonaCardProps) {
  const { persona, setPersona } = usePersona()
  const config = PERSONAS[id]
  const isActive = persona === id

  return (
    <button
      onClick={() => setPersona(id)}
      aria-pressed={isActive}
      aria-label={`Select ${config.meta.fullName} persona (${config.meta.impairment})`}
      className={cn(
        'w-full text-left rounded-xl border-2 bg-gradient-to-b p-5',
        'transition-all duration-150',
        'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
        PERSONA_COLORS[id],
        isActive && ACTIVE_COLORS[id]
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0" aria-hidden="true">
          {PERSONA_ICONS[id]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-base font-bold text-foreground leading-tight">
              {config.meta.impairment}
            </p>
            {isActive && (
              <span className="shrink-0 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm font-medium text-muted-foreground">{config.meta.fullName}</p>
            <span className="text-xs text-muted-foreground opacity-60">·</span>
            <span className="text-xs text-muted-foreground">Age {config.meta.age}</span>
          </div>
        </div>
      </div>

      {/* Background */}
      <p className="mt-3 text-sm text-foreground/70 leading-relaxed italic">
        {config.meta.background}
      </p>

      {/* Goals & Challenges */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1.5', SECTION_LABEL[id])}>
            Goals
          </p>
          <ul className="space-y-1">
            {config.meta.goals.map((g) => (
              <li key={g} className="flex items-start gap-1.5 text-xs text-foreground/80">
                <span className="mt-0.5 shrink-0 text-green-500" aria-hidden="true">✓</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1.5', SECTION_LABEL[id])}>
            Challenges
          </p>
          <ul className="space-y-1">
            {config.meta.challenges.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-xs text-foreground/80">
                <span className="mt-0.5 shrink-0 text-destructive" aria-hidden="true">✕</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* WCAG guidelines */}
      <div className="mt-4">
        <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1.5', SECTION_LABEL[id])}>
          WCAG 2.1 Guidelines
        </p>
        <div className="flex flex-wrap gap-1">
          {config.meta.wcagDetails.map((w) => (
            <span
              key={w.code}
              title={w.description}
              className={cn('text-xs px-1.5 py-0.5 rounded border font-mono font-medium', WCAG_COLORS[id])}
            >
              {w.code}
            </span>
          ))}
        </div>
      </div>

      {/* Feature chips */}
      <div className="mt-4">
        <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1.5', SECTION_LABEL[id])}>
          Accessibility Features
        </p>
        <div className="flex flex-wrap gap-1.5">
          {config.meta.features.map((f) => (
            <span
              key={f}
              className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', BADGE_COLORS[id])}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
