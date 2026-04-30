import { AlertCircleIcon, LightbulbIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineErrorProps {
  id?: string
  message: string
  suggestion?: string
  className?: string
}

export function InlineError({ id, message, suggestion, className }: InlineErrorProps) {
  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className={cn(
        'flex flex-col gap-1 rounded-lg border border-destructive/50 bg-destructive/5 px-3 py-2 text-sm',
        className
      )}
    >
      <div className="flex items-center gap-2 text-destructive font-medium">
        <AlertCircleIcon className="size-4 shrink-0" aria-hidden="true" />
        <span>{message}</span>
      </div>
      {suggestion && (
        <div className="flex items-start gap-2 text-muted-foreground pl-6">
          <LightbulbIcon className="size-3.5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          <span>Try this: {suggestion}</span>
        </div>
      )}
    </div>
  )
}
