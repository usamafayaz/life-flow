'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AppShell } from '@/components/layout/AppShell'
import { TaskList } from '@/components/task/TaskList'
import { useText } from '@/hooks/use-text'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'
import { cn } from '@/lib/utils'

const ALL = 'All'

export default function TasksPage() {
  const t = useText()
  const { flags } = usePersona()
  const customTasks = useTaskStore((s) => s.customTasks)
  const [activeCategory, setActiveCategory] = useState(ALL)

  const allTasks = useMemo(() => [...TASK_TEMPLATES, ...customTasks], [customTasks])
  const categories = [ALL, ...Array.from(new Set(allTasks.map((t) => t.category))).sort()]
  const filtered =
    activeCategory === ALL ? allTasks : allTasks.filter((t) => t.category === activeCategory)

  return (
    <AppShell>
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:py-8 space-y-5 sm:space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {t({ default: 'Task library', simple: 'All tasks' })}
            </h1>
            {!flags.minimalLayout && (
              <p className="mt-1 text-muted-foreground text-sm">
                {t({
                  default: 'Choose a task to start step-by-step guidance.',
                  simple: 'Pick a task to start.',
                })}
              </p>
            )}
          </div>

          <Button
            render={<Link href="/tasks/new" />}
            className="target-size gap-2 shrink-0 whitespace-nowrap"
          >
            <PlusIcon className="size-4" aria-hidden="true" />
            {t({ default: 'Create custom task', simple: 'New task' })}
          </Button>
        </div>

        {/* Category filter */}
        {!flags.minimalLayout && (
          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={cn(
                  'target-size px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div>
          {activeCategory !== ALL && (
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{activeCategory}</Badge>
              <span className="text-sm text-muted-foreground">{filtered.length} tasks</span>
            </div>
          )}
          <TaskList
            tasks={filtered}
            emptyMessage={t({
              default: 'No tasks in this category yet. Create a custom task to get started.',
              simple: 'No tasks here. Add your own task.',
            })}
          />
        </div>
      </div>
    </AppShell>
  )
}
