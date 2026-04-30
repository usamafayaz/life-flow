'use client'

import Link from 'next/link'
import { CheckCircleIcon, ArrowLeftIcon, LayoutGridIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useText } from '@/hooks/use-text'

interface CompletionScreenProps {
  taskTitle: string
  stepsCompleted: number
  onDoAnother?: () => void
}

export function CompletionScreen({ taskTitle, stepsCompleted, onDoAnother }: CompletionScreenProps) {
  const t = useText()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center">
      <div
        className="mb-6 flex items-center justify-center size-24 rounded-full bg-success/10"
        aria-hidden="true"
      >
        <CheckCircleIcon className="size-12 text-success" />
      </div>

      <div className="mb-2 text-5xl" role="img" aria-label="Celebration">🎉</div>

      <h1 className="text-3xl font-bold text-foreground mt-2">
        {t({ default: 'Task complete!', simple: 'Done!' })}
      </h1>

      <p className="mt-3 text-lg text-muted-foreground content-width">
        {t({
          default: `You completed "${taskTitle}". All ${stepsCompleted} steps done.`,
          simple: `You finished "${taskTitle}". ${stepsCompleted} steps done!`,
        })}
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-persona items-center justify-center w-full sm:w-auto px-4 sm:px-0">
        {onDoAnother && (
          <Button
            onClick={onDoAnother}
            className="target-size gap-2 w-full sm:w-auto justify-center"
            aria-label="Do another task"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            {t({ default: 'Do another task', simple: 'Do another task' })}
          </Button>
        )}
        <Button
          variant="outline"
          render={<Link href="/tasks" />}
          className="target-size gap-2 w-full sm:w-auto justify-center"
        >
          <LayoutGridIcon className="size-4" aria-hidden="true" />
          {t({ default: 'Back to library', simple: 'See all tasks' })}
        </Button>
      </div>
    </div>
  )
}
