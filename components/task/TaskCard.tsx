'use client'

import Link from 'next/link'
import { ClockIcon, ListIcon, CheckCircleIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useText } from '@/hooks/use-text'
import { useTaskStore } from '@/store/task-store'
import type { TaskTemplate } from '@/store/task-store'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: TaskTemplate
  className?: string
}

export function TaskCard({ task, className }: TaskCardProps) {
  const t = useText()
  const completionHistory = useTaskStore((s) => s.completionHistory)

  const completions = completionHistory.filter((c) => c.taskId === task.id)
  const lastCompleted = completions.at(-1)
  const isCompleted = completions.length > 0

  const title = t({ default: task.title, simple: task.simpleTitle })

  return (
    <Link
      href={`/tasks/${task.id}`}
      className={cn(
        'block rounded-xl border bg-card p-5 transition-all min-h-[var(--target-size)]',
        'hover:border-primary/50 hover:shadow-sm',
        'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
        isCompleted && 'border-success/40',
        className
      )}
      aria-label={`${title}, ${task.steps.length} steps, about ${task.estimatedMinutes} minutes${isCompleted ? ', completed' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground leading-snug">{title}</h3>
        <div className="flex items-center gap-1.5 shrink-0">
          {isCompleted && (
            <span
              className="inline-flex items-center gap-1 text-xs font-medium text-success"
              aria-label={`Completed ${completions.length} time${completions.length !== 1 ? 's' : ''}`}
            >
              <CheckCircleIcon className="size-3.5" aria-hidden="true" />
              {completions.length > 1 ? `×${completions.length}` : 'Done'}
            </span>
          )}
          {task.isCustom && (
            <Badge variant="secondary" className="text-xs">Custom</Badge>
          )}
        </div>
      </div>

      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {t({ default: task.description, simple: task.simpleDescription })}
      </p>

      <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ListIcon className="size-3.5" aria-hidden="true" />
          <span>{task.steps.length} steps</span>
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon className="size-3.5" aria-hidden="true" />
          <span>~{task.estimatedMinutes} min</span>
        </span>
        {lastCompleted && (
          <span className="text-xs text-muted-foreground">
            Last done {formatRelativeDate(lastCompleted.completedAt)}
          </span>
        )}
        <Badge variant="outline" className="ml-auto text-xs py-0">
          {task.category}
        </Badge>
      </div>
    </Link>
  )
}

function formatRelativeDate(timestamp: number): string {
  const diff = Date.now() - timestamp
  const mins = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'yesterday'
  return `${days}d ago`
}
