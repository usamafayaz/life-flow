'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PlayIcon, PlusIcon, CheckCircle2Icon, CircleIcon, ClockIcon, ListIcon, FlameIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/layout/AppShell'
import { AddTaskDialog } from '@/components/task/AddTaskDialog'
import { useText } from '@/hooks/use-text'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'
import { usePersonaStore } from '@/store/persona-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'
import { cn } from '@/lib/utils'

function getStartOfDay(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function calculateStreak(history: { completedAt: number }[]): number {
  if (history.length === 0) return 0
  let streak = 0
  const today = getStartOfDay()
  let cursor = today
  while (true) {
    const hasCompletion = history.some(
      (c) => c.completedAt >= cursor && c.completedAt < cursor + 86_400_000
    )
    if (!hasCompletion) break
    streak++
    cursor -= 86_400_000
  }
  return streak
}

export default function DashboardPage() {
  const router = useRouter()
  const t = useText()
  const { flags } = usePersona()
  const { customTasks, completionHistory } = useTaskStore()
  const onboarded = usePersonaStore((s) => s.onboarded)
  const hasHydrated = usePersonaStore((s) => s._hasHydrated)
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    if (hasHydrated && !onboarded) {
      router.replace('/onboarding')
    }
  }, [hasHydrated, onboarded, router])

  const allTasks = useMemo(() => [...TASK_TEMPLATES, ...customTasks], [customTasks])
  const displayTasks = allTasks.slice(0, 6)

  const todayStart = getStartOfDay()
  const todayCompletions = useMemo(
    () => completionHistory.filter((c) => c.completedAt >= todayStart),
    [completionHistory, todayStart]
  )
  const todayCompletedIds = useMemo(
    () => new Set(todayCompletions.map((c) => c.taskId)),
    [todayCompletions]
  )

  const completedDisplayed = useMemo(
    () => displayTasks.filter((t) => todayCompletedIds.has(t.id)).length,
    [displayTasks, todayCompletedIds]
  )
  const total = displayTasks.length
  const progress = total > 0 ? Math.min(100, Math.round((completedDisplayed / total) * 100)) : 0
  const weeklyStreak = useMemo(() => calculateStreak(completionHistory), [completionHistory])

  return (
    <AppShell>
      <div className="px-6 py-8">
        {/* Greeting */}
        {!flags.minimalLayout && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {t({ default: 'Good Morning!', simple: 'Good Morning!' })}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {t({ default: "Let's make today productive", simple: "Let's get things done" })}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6" aria-label="Today's stats">
          <div className="bg-card rounded-xl border p-3 sm:p-4">
            <div className="flex items-center gap-1 sm:gap-1.5 mb-1 min-w-0">
              <CheckCircle2Icon className="size-3.5 sm:size-4 text-primary shrink-0" aria-hidden="true" />
              <p className="text-xs text-muted-foreground font-medium truncate">Completed</p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-foreground tabular-nums">
              {completedDisplayed}/{total}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-3 sm:p-4">
            <div className="flex items-center gap-1 sm:gap-1.5 mb-1 min-w-0">
              <ClockIcon className="size-3.5 sm:size-4 text-primary shrink-0" aria-hidden="true" />
              <p className="text-xs text-muted-foreground font-medium truncate">Focus Time</p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-foreground tabular-nums">—</p>
          </div>
          <div className="bg-card rounded-xl border p-3 sm:p-4">
            <div className="flex items-center gap-1 sm:gap-1.5 mb-1 min-w-0">
              <FlameIcon className="size-3.5 sm:size-4 text-primary shrink-0" aria-hidden="true" />
              <p className="text-xs text-muted-foreground font-medium truncate">Streak</p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-foreground tabular-nums">
              {weeklyStreak} {weeklyStreak === 1 ? 'Day' : 'Days'}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {!flags.minimalLayout && (
          <div className="bg-card rounded-xl border p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {t({ default: "Today's Progress", simple: 'Progress' })}
              </span>
              <span className="text-sm font-semibold text-primary" aria-live="polite" aria-atomic="true">
                {progress}%
              </span>
            </div>
            <div
              className="h-2 bg-primary/20 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progress}% of today's tasks completed`}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button
            render={<Link href="/focus" />}
            className="target-size flex-1 gap-2 justify-center"
            size="lg"
          >
            <PlayIcon className="size-4" aria-hidden="true" />
            {t({ default: 'Start Focus Mode', simple: 'Focus Mode' })}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAddTask(true)}
            className="target-size flex-1 gap-2 justify-center"
            size="lg"
          >
            <PlusIcon className="size-4" aria-hidden="true" />
            {t({ default: 'Add New Task', simple: 'Add Task' })}
          </Button>
        </div>

        {/* Today's Tasks */}
        <section aria-labelledby="todays-tasks-heading">
          <h2
            id="todays-tasks-heading"
            className="text-base font-semibold text-foreground mb-3"
          >
            {t({ default: "Today's Tasks", simple: 'Tasks' })}
          </h2>

          {flags.focusModeDefault ? (
            <div className="bg-card rounded-xl border p-5 text-center">
              <p className="text-sm text-muted-foreground">
                {t({
                  default: 'Focus mode is on. Select a task to run it step by step.',
                  simple: 'Pick a task below.',
                })}
              </p>
              <Button
                render={<Link href="/tasks" />}
                variant="outline"
                className="target-size mt-3 gap-2"
              >
                <ListIcon className="size-4" aria-hidden="true" />
                {t({ default: 'Browse tasks', simple: 'See tasks' })}
              </Button>
            </div>
          ) : (
            <ul className="space-y-2" role="list" aria-label="Today's task list">
              {displayTasks.map((task) => {
                const done = todayCompletedIds.has(task.id)
                return (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      className={cn(
                        'flex items-center gap-3 bg-card rounded-xl border px-4 py-3 transition-colors',
                        'hover:border-primary/40 hover:bg-accent/30',
                        'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring',
                        done && 'opacity-70'
                      )}
                      aria-label={`${task.title}${done ? ', completed' : ''}`}
                    >
                      {done ? (
                        <CheckCircle2Icon
                          className="size-5 text-primary shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <CircleIcon
                          className="size-5 text-muted-foreground shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-sm font-medium text-foreground',
                            done && 'line-through text-muted-foreground'
                          )}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          / {task.steps.length} Steps &nbsp;·&nbsp;
                          <ClockIcon className="size-3 inline-block" aria-hidden="true" />{' '}
                          {task.estimatedMinutes} min
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>

      <AddTaskDialog open={showAddTask} onClose={() => setShowAddTask(false)} />
    </AppShell>
  )
}
