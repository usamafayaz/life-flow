'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PlusIcon, CheckCircle2Icon, CircleIcon, ClockIcon } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { AddTaskDialog } from '@/components/task/AddTaskDialog'
import { useText } from '@/hooks/use-text'
import { usePersona } from '@/hooks/use-persona'
import { useTaskStore } from '@/store/task-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'
import { cn } from '@/lib/utils'
import type { TaskTemplate } from '@/store/task-store'

function getStartOfDay() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export default function TasksPage() {
  const t = useText()
  const { flags } = usePersona()
  const { customTasks, completionHistory, startTask, completeTask, uncompleteTask } = useTaskStore()
  const [showAddTask, setShowAddTask] = useState(false)

  const allTasks = useMemo(() => [...TASK_TEMPLATES, ...customTasks], [customTasks])

  const todayStart = getStartOfDay()
  const todayCompletions = useMemo(
    () => completionHistory.filter((c) => c.completedAt >= todayStart),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completionHistory]
  )
  const todayCompletedIds = useMemo(
    () => new Set(todayCompletions.map((c) => c.taskId)),
    [todayCompletions]
  )

  const activeTasks = useMemo(
    () => allTasks.filter((task) => !todayCompletedIds.has(task.id)),
    [allTasks, todayCompletedIds]
  )

  const completedTasks = useMemo(() => {
    const seen = new Set<string>()
    return todayCompletions
      .map((c) => allTasks.find((t) => t.id === c.taskId))
      .filter((t): t is TaskTemplate => t !== undefined && !seen.has(t.id) && seen.add(t.id) !== undefined)
  }, [todayCompletions, allTasks])

  const handleMarkComplete = (task: TaskTemplate) => {
    startTask(task.id)
    completeTask(task.title, task.steps.length)
  }

  if (flags.minimalLayout) {
    return (
      <AppShell>
        <div className="px-6 py-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            {t({ default: 'Task Manager', simple: 'Tasks' })}
          </h1>
          <div className="space-y-2">
            {allTasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className={cn(
                  'flex items-center gap-3 bg-card rounded-xl border px-4 py-3 transition-colors',
                  'hover:border-primary/40 focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                )}
              >
                <span className="text-sm font-medium text-foreground flex-1">{task.title}</span>
                <span className="text-xs text-muted-foreground">
                  {task.steps.length} steps
                </span>
              </Link>
            ))}
          </div>
        </div>
        <AddTaskDialog open={showAddTask} onClose={() => setShowAddTask(false)} />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          {t({ default: 'Task Manager', simple: 'Tasks' })}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Tasks column */}
          <section aria-labelledby="active-tasks-heading">
            <h2
              id="active-tasks-heading"
              className="text-sm font-semibold text-foreground mb-3"
            >
              {t({ default: `Active Tasks (${activeTasks.length})`, simple: `Active (${activeTasks.length})` })}
            </h2>

            {/* Add task bar */}
            <div className="flex items-center gap-2 bg-card rounded-xl border px-4 py-3 mb-3">
              <span className="flex-1 text-sm text-muted-foreground select-none">
                {t({ default: 'Add a new task...', simple: 'New task...' })}
              </span>
              <button
                onClick={() => setShowAddTask(true)}
                className={cn(
                  'size-8 bg-primary rounded-lg flex items-center justify-center shrink-0',
                  'text-primary-foreground hover:bg-primary/90 transition-colors',
                  'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                )}
                aria-label="Add new task"
              >
                <PlusIcon className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Active task list */}
            <ul className="space-y-2" role="list" aria-label="Active tasks">
              {activeTasks.length === 0 ? (
                <li className="bg-card rounded-xl border px-4 py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t({ default: 'All tasks completed for today! 🎉', simple: 'All done!' })}
                  </p>
                </li>
              ) : (
                activeTasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      className={cn(
                        'flex items-center gap-3 bg-card rounded-xl border px-4 py-3 min-h-[var(--target-size)]',
                        'transition-colors hover:border-primary/40 hover:bg-accent/30',
                        'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                      )}
                      aria-label={`Start task: ${task.title}`}
                    >
                      <CircleIcon
                        className="size-5 text-muted-foreground shrink-0"
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          / {task.steps.length} Steps &nbsp;
                          <ClockIcon className="size-3 inline-block" aria-hidden="true" />{' '}
                          {task.estimatedMinutes} min
                        </p>
                      </div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Completed Tasks column */}
          <section aria-labelledby="completed-tasks-heading">
            <h2
              id="completed-tasks-heading"
              className="text-sm font-semibold text-foreground mb-3"
            >
              {t({
                default: `Completed Tasks (${completedTasks.length})`,
                simple: `Done (${completedTasks.length})`,
              })}
            </h2>

            <ul className="space-y-2" role="list" aria-label="Completed tasks">
              {completedTasks.length === 0 ? (
                <li className="bg-card rounded-xl border px-4 py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t({ default: 'No tasks completed today yet.', simple: 'Nothing done yet.' })}
                  </p>
                </li>
              ) : (
                completedTasks.map((task) => (
                  <li key={task.id}>
                    <button
                      onClick={() => uncompleteTask(task.id)}
                      className={cn(
                        'w-full flex items-center gap-3 bg-card rounded-xl border px-4 py-3 min-h-[var(--target-size)]',
                        'opacity-80 transition-colors hover:border-primary/40 hover:bg-accent/30',
                        'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                      )}
                      aria-label={`Mark "${task.title}" as incomplete`}
                    >
                      <CheckCircle2Icon className="size-5 text-primary shrink-0" aria-hidden="true" />
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-muted-foreground line-through">
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          / {task.steps.length} Steps &nbsp;
                          <ClockIcon className="size-3 inline-block" aria-hidden="true" />{' '}
                          {task.estimatedMinutes} min
                        </p>
                      </div>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>

      <AddTaskDialog open={showAddTask} onClose={() => setShowAddTask(false)} />
    </AppShell>
  )
}
