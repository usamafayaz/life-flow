'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePersona } from '@/hooks/use-persona'

export function AccessibilityQuickBar() {
  const { fontScale, setFontScale } = usePersona()

  return (
    <div
      role="toolbar"
      aria-label="Accessibility quick controls"
      className="flex items-center gap-2"
    >
      <div className="flex items-center gap-1" role="group" aria-label="Text size">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setFontScale(Math.max(100, fontScale - 10))}
          disabled={fontScale <= 100}
          aria-label="Decrease text size"
          className="target-size"
        >
          <MinusIcon className="size-4" aria-hidden="true" />
        </Button>
        <span
          className="text-xs font-medium tabular-nums inline-block w-10 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {fontScale}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setFontScale(Math.min(200, fontScale + 10))}
          disabled={fontScale >= 200}
          aria-label="Increase text size"
          className="target-size"
        >
          <PlusIcon className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
