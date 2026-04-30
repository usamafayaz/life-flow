'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClockIcon, ListIcon, ArrowLeftIcon, PlayIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AppShell } from '@/components/layout/AppShell'
import { useText } from '@/hooks/use-text'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'
import { useMemo } from 'react'

interface TaskDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = use(params)
  const t = useText()
  const { flags } = usePersona()
  const customTasks = useTaskStore((s) => s.customTasks)
  const task = useMemo(
    () => [...TASK_TEMPLATES, ...customTasks].find((t) => t.id === id),
    [id, customTasks]
  )

  if (!task) notFound()

  return (
    <AppShell>
      <div className="mx-auto max-w-screen-md px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring rounded"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            {t({ default: 'Back to tasks', simple: 'Back' })}
          </Link>
        </nav>

        <header className="mb-8">
          <div className="flex items-start gap-3 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {task.category}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
            {t({ default: task.title, simple: task.simpleTitle })}
          </h1>

          {!flags.focusModeDefault && (
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {t({ default: task.description, simple: task.simpleDescription })}
            </p>
          )}

          <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ListIcon className="size-4" aria-hidden="true" />
              <span>{task.steps.length} steps</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-4" aria-hidden="true" />
              <span>About {task.estimatedMinutes} minutes</span>
            </span>
          </div>
        </header>

        {/* Step preview — hidden in focus mode */}
        {!flags.focusModeDefault && (
          <section aria-labelledby="steps-preview-heading" className="mb-8">
            <h2 id="steps-preview-heading" className="text-base font-semibold text-foreground mb-3">
              {t({ default: 'Steps overview', simple: 'Steps' })}
            </h2>
            <ol className="space-y-2" aria-label="Task steps preview">
              {task.steps.map((step, i) => (
                <li key={step.id} className="flex items-start gap-3 py-2.5 border-b last:border-0">
                  <span
                    className="flex items-center justify-center size-6 rounded-full bg-muted text-xs font-medium text-muted-foreground shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">
                    {t({ default: step.title, simple: step.simpleTitle })}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Start CTA */}
        <div className="sm:sticky sm:bottom-4 pt-2">
          <Button
            render={<Link href={`/tasks/${task.id}/run`} />}
            className="target-size w-full sm:w-auto gap-2 justify-center"
            size="lg"
          >
            <PlayIcon className="size-5" aria-hidden="true" />
            {t({ default: 'Start task', simple: 'Start' })}
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
