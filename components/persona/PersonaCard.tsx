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
      aria-label={`Select ${config.meta.name} persona (${config.meta.impairment})`}
      className={cn(
        'w-full text-left rounded-xl border-2 bg-gradient-to-b p-5',
        'transition-all duration-150',
        'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
        PERSONA_COLORS[id],
        isActive && ACTIVE_COLORS[id]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          {PERSONA_ICONS[id]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-foreground leading-tight">
              {config.meta.impairment}
            </h3>
            {isActive && (
              <span className="shrink-0 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <p className="text-xs font-medium text-muted-foreground">
              {config.meta.name}
            </p>
            <span className="text-xs text-muted-foreground opacity-50" aria-hidden="true">·</span>
            <span className="text-xs text-muted-foreground">Age {config.meta.age}</span>
          </div>
          <p className="text-sm text-foreground/80 mt-2 leading-snug">
            {config.meta.description}
          </p>
        </div>
      </div>
    </button>
  )
}
