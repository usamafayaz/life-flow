'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { usePersona } from '@/hooks/use-persona'
import { PERSONAS, type Persona } from '@/lib/personas'

const PERSONA_ORDER: Persona[] = ['noor', 'daniel', 'aisha', 'leo']

const PERSONA_ICONS: Record<Persona, string> = {
  noor: '✋',
  daniel: '👁',
  aisha: '👂',
  leo: '🧠',
}

interface PersonaSwitcherProps {
  className?: string
  compact?: boolean
}

export function PersonaSwitcher({ className, compact = false }: PersonaSwitcherProps) {
  const { persona, setPersona } = usePersona()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, current: Persona) => {
      const idx = PERSONA_ORDER.indexOf(current)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const next = PERSONA_ORDER[(idx + 1) % PERSONA_ORDER.length]
        setPersona(next)
        const btn = containerRef.current?.querySelector<HTMLButtonElement>(
          `[data-persona-btn="${next}"]`
        )
        btn?.focus()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = PERSONA_ORDER[(idx - 1 + PERSONA_ORDER.length) % PERSONA_ORDER.length]
        setPersona(prev)
        const btn = containerRef.current?.querySelector<HTMLButtonElement>(
          `[data-persona-btn="${prev}"]`
        )
        btn?.focus()
      }
    },
    [setPersona]
  )

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Select accessibility persona"
      className={cn('flex gap-1', className)}
    >
      {PERSONA_ORDER.map((id) => {
        const config = PERSONAS[id]
        const isActive = persona === id
        return (
          <button
            key={id}
            data-persona-btn={id}
            role="radio"
            aria-checked={isActive}
            aria-label={config.meta.impairment}
            onClick={() => setPersona(id)}
            onKeyDown={(e) => handleKeyDown(e, id)}
            tabIndex={isActive ? 0 : -1}
            className={cn(
              'inline-flex items-center justify-center rounded-lg transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring',
              compact
                ? 'size-9 shrink-0'
                : 'target-size gap-1.5 px-3 py-1.5 text-sm font-medium aspect-square',
              isActive
                ? 'bg-primary text-primary-foreground outline outline-2 outline-primary outline-offset-2'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <span
              aria-hidden="true"
              style={{ fontSize: compact ? '20px' : 'calc(var(--target-size, 44px) * 0.45)' }}
            >
              {PERSONA_ICONS[id]}
            </span>
            {!compact && (
              <span>{config.meta.impairment}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
