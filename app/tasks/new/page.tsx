'use client'

import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { TaskBuilder } from '@/components/task/TaskBuilder'
import { useText } from '@/hooks/use-text'

export default function NewTaskPage() {
  const t = useText()

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
          <h1 className="text-2xl font-bold text-foreground">
            {t({ default: 'Create a custom task', simple: 'Make a new task' })}
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            {t({
              default: 'Build a step-by-step guide for any task that matters to you.',
              simple: 'Add your own steps.',
            })}
          </p>
        </header>

        <TaskBuilder />
      </div>
    </AppShell>
  )
}
