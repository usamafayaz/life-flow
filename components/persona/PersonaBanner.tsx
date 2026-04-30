'use client'

import { usePersona } from '@/hooks/use-persona'
import { PERSONAS, type Persona } from '@/lib/personas'

const PERSONA_ICONS: Record<Persona, string> = {
  noor: '✋',
  daniel: '👁',
  aisha: '👂',
  leo: '🧠',
}

const BANNER_COLORS: Record<Persona, string> = {
  noor: 'bg-blue-50 border-blue-200',
  daniel: 'bg-violet-50 border-violet-200',
  aisha: 'bg-emerald-50 border-emerald-200',
  leo: 'bg-amber-50 border-amber-200',
}

const BADGE_COLORS: Record<Persona, string> = {
  noor: 'bg-blue-100 text-blue-800 border-blue-200',
  daniel: 'bg-violet-100 text-violet-800 border-violet-200',
  aisha: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  leo: 'bg-amber-100 text-amber-800 border-amber-200',
}

const TEXT_COLORS: Record<Persona, string> = {
  noor: 'text-blue-900',
  daniel: 'text-violet-900',
  aisha: 'text-emerald-900',
  leo: 'text-amber-900',
}

export function PersonaBanner() {
  const { persona } = usePersona()
  const config = PERSONAS[persona]

  return (
    <div
      className={`border-b ${BANNER_COLORS[persona]} px-4 py-2`}
      role="status"
      aria-label={`Active accessibility profile: ${config.meta.impairment}`}
    >
      <div className="mx-auto max-w-screen-xl flex items-center gap-2 sm:gap-3 flex-wrap">
        <span className={`text-sm font-semibold flex items-center gap-1.5 shrink-0 ${TEXT_COLORS[persona]}`}>
          <span aria-hidden="true">{PERSONA_ICONS[persona]}</span>
          {config.meta.impairment}
        </span>
        <span className={`hidden sm:block text-xs ${TEXT_COLORS[persona]} opacity-40`} aria-hidden="true">|</span>
        <div className="flex items-center flex-wrap gap-1.5">
          {config.meta.features.slice(0, 4).map((f) => (
            <span
              key={f}
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_COLORS[persona]}`}
            >
              {f}
            </span>
          ))}
          {config.meta.features.length > 4 && (
            <span className={`text-xs font-medium opacity-60 ${TEXT_COLORS[persona]}`}>
              +{config.meta.features.length - 4} more in settings
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
