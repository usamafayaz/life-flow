'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface StepProgressProps {
  current: number
  total: number
  className?: string
}

export function StepProgress({ current, total, className }: StepProgressProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div
      className={cn('flex flex-col gap-2', className)}
      aria-label={`Step ${current} of ${total}`}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Step {current} of {total}
        </span>
        <span className="text-muted-foreground tabular-nums">{percent}%</span>
      </div>
      <Progress value={percent} aria-hidden="true" />
    </div>
  )
}
