'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { PlayIcon, PauseIcon, RotateCcwIcon, Volume2Icon, ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/layout/AppShell'
import { usePersona } from '@/hooks/use-persona'
import { useText } from '@/hooks/use-text'
import { useTaskStore } from '@/store/task-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'
import { cn } from '@/lib/utils'

const DEFAULT_MINUTES = 15

export default function FocusPage() {
  const t = useText()
  const { flags, reducedMotion } = usePersona()
  const { customTasks } = useTaskStore()

  const allTasks = useMemo(() => [...TASK_TEMPLATES, ...customTasks], [customTasks])

  const [selectedTaskId, setSelectedTaskId] = useState(allTasks[0]?.id ?? '')
  const [timeLeft, setTimeLeft] = useState(DEFAULT_MINUTES * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectedTask = allTasks.find((t) => t.id === selectedTaskId) ?? allTasks[0]
  const totalSeconds = DEFAULT_MINUTES * 60
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const handleReset = () => {
    setIsRunning(false)
    setIsComplete(false)
    setTimeLeft(DEFAULT_MINUTES * 60)
  }

  if (flags.noTimers) {
    return (
      <AppShell>
        <div className="px-6 py-8">
          <div className="bg-card rounded-2xl border p-8 text-center space-y-4">
            <p className="text-base text-foreground font-medium">
              {t({
                default: 'Timers are hidden for cognitive accessibility.',
                simple: 'No timer shown.',
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {t({
                default: 'Use the step-by-step task runner instead.',
                simple: 'Try a task step by step.',
              })}
            </p>
            <Button
              render={<Link href="/tasks" />}
              className="target-size gap-2"
            >
              {t({ default: 'Go to tasks', simple: 'See tasks' })}
            </Button>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="px-6 py-8">
        {/* Task selector */}
        <div className="relative inline-flex items-center">
          <select
            value={selectedTaskId}
            onChange={(e) => {
              setSelectedTaskId(e.target.value)
              handleReset()
            }}
            aria-label="Select task for focus session"
            className={cn(
              'appearance-none bg-primary text-primary-foreground rounded-lg pl-4 pr-9 py-2.5',
              'font-medium text-sm cursor-pointer',
              'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
            )}
          >
            {allTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            className="pointer-events-none absolute right-2.5 size-4 text-primary-foreground"
            aria-hidden="true"
          />
        </div>

        {/* Timer card */}
        <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 sm:p-12 mt-6">
          {/* Focus session label */}
          <p className="text-sm text-muted-foreground text-center">Focus Session</p>

          {/* Task name row */}
          <div className="flex items-center justify-center gap-2 mt-1 mb-8">
            <h2 className="text-lg font-semibold text-foreground text-center">
              Task: {selectedTask?.title}
            </h2>
            <button
              aria-label="Read task name aloud"
              className={cn(
                'text-muted-foreground hover:text-foreground transition-colors rounded',
                'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
              )}
            >
              {/* <Volume2Icon className="size-4" aria-hidden="true" /> */}
            </button>
          </div>

          {/* Timer display */}
          <div
            role="timer"
            aria-label={`Focus timer: ${minutes} minutes and ${seconds} seconds remaining`}
            aria-live="off"
            className="text-center mb-8"
          >
            <span className="text-7xl sm:text-8xl font-bold tabular-nums text-foreground">
              {minutes}:{seconds}
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="h-1.5 bg-primary/20 rounded-full overflow-hidden mb-8"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Focus session progress"
          >
            <div
              className={cn('h-full bg-primary rounded-full', !reducedMotion && 'transition-all duration-1000')}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => setIsRunning((r) => !r)}
              className="target-size gap-2 px-8"
              aria-label={isRunning ? 'Pause focus session' : 'Start focus session'}
              disabled={isComplete}
            >
              {isRunning ? (
                <PauseIcon className="size-4" aria-hidden="true" />
              ) : (
                <PlayIcon className="size-4" aria-hidden="true" />
              )}
              {isRunning
                ? t({ default: 'Pause', simple: 'Pause' })
                : t({ default: 'Start', simple: 'Start' })}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="target-size gap-2 px-8"
              aria-label="Reset timer"
            >
              <RotateCcwIcon className="size-4" aria-hidden="true" />
              {t({ default: 'Reset', simple: 'Reset' })}
            </Button>
          </div>

          {/* Status text */}
          <p
            className="text-sm text-muted-foreground text-center mt-4"
            aria-live="polite"
            aria-atomic="true"
          >
            {isComplete
              ? t({ default: 'Focus session complete! 🎉', simple: 'Done! 🎉' })
              : !isRunning && timeLeft === totalSeconds
              ? t({
                  default: 'Click start to begin your focus session',
                  simple: 'Press Start to begin',
                })
              : null}
          </p>
        </div>
      </div>
    </AppShell>
  )
}
