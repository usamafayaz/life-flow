'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
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


const TEXT_COLORS: Record<Persona, string> = {
  noor: 'text-blue-900',
  daniel: 'text-violet-900',
  aisha: 'text-emerald-900',
  leo: 'text-amber-900',
}

export function PersonaBanner() {
  const { persona, flags, fontScale, setFontScale } = usePersona()
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

        {/* Text scale controls for Daniel on mobile (desktop shows these in the header QuickBar) */}
        {flags.largeTextControl && (
          <div
            className={`sm:hidden ml-auto flex items-center gap-1 ${TEXT_COLORS[persona]}`}
            role="group"
            aria-label="Text size"
          >
            <button
              onClick={() => setFontScale(Math.max(100, fontScale - 10))}
              disabled={fontScale <= 100}
              aria-label="Decrease text size"
              className="target-size inline-flex items-center justify-center rounded-md hover:bg-black/10 disabled:opacity-40 transition-colors"
            >
              <MinusIcon className="size-4" aria-hidden="true" />
            </button>
            <span className="text-xs font-medium tabular-nums inline-block w-10 text-center" aria-live="polite" aria-atomic="true">
              {fontScale}%
            </span>
            <button
              onClick={() => setFontScale(Math.min(200, fontScale + 10))}
              disabled={fontScale >= 200}
              aria-label="Increase text size"
              className="target-size inline-flex items-center justify-center rounded-md hover:bg-black/10 disabled:opacity-40 transition-colors"
            >
              <PlusIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
