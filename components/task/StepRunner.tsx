'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  LightbulbIcon,
  XIcon,
  KeyboardIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { StepProgress } from '@/components/task/StepProgress'
import { FocusMode } from '@/components/task/FocusMode'
import { CompletionScreen } from '@/components/task/CompletionScreen'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { usePersona } from '@/hooks/use-persona'
import { useText } from '@/hooks/use-text'
import { useKeyboardNav } from '@/hooks/use-keyboard-nav'
import { useBreakReminder } from '@/hooks/use-break-reminder'
import { useTaskStore } from '@/store/task-store'
import { cn } from '@/lib/utils'
import type { TaskTemplate } from '@/store/task-store'

interface StepRunnerProps {
  task: TaskTemplate
}

export function StepRunner({ task }: StepRunnerProps) {
  const router = useRouter()
  const { flags } = usePersona()
  const t = useText()
  const { inProgress, goToStep, completeTask, abandonTask, startTask } = useTaskStore()

  const [showConfirmExit, setShowConfirmExit] = useState(false)
  const [showConfirmComplete, setShowConfirmComplete] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [stepConfirmedAt, setStepConfirmedAt] = useState<number | null>(null)
  const [flashKey, setFlashKey] = useState<number | null>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inProgress || inProgress.taskId !== task.id) {
      startTask(task.id)
    }
  // only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useBreakReminder(inProgress?.startedAt ?? null)

  const currentIndex = inProgress?.taskId === task.id ? inProgress.currentStepIndex : 0
  const currentStep = task.steps[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === task.steps.length - 1

  const prevIndexRef = useRef(currentIndex)
  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      prevIndexRef.current = currentIndex
      nextBtnRef.current?.focus()
    }
  })

  const announceStep = useCallback(
    (idx: number) => {
      if (liveRef.current) {
        liveRef.current.textContent = ''
        requestAnimationFrame(() => {
          if (liveRef.current) {
            liveRef.current.textContent = `Step ${idx + 1} of ${task.steps.length}: ${task.steps[idx].title}`
          }
        })
      }
    },
    [task.steps]
  )

  const doComplete = useCallback(() => {
    setShowConfirmComplete(false)
    completeTask(task.title, task.steps.length)
    setIsComplete(true)
    toast.success(t({ default: 'Task complete!', simple: 'Done!' }), {
      duration: flags.visualNotificationsOnly ? 8000 : 4000,
    })
  }, [completeTask, task.title, task.steps.length, t, flags.visualNotificationsOnly])

  const doExit = useCallback(() => {
    abandonTask()
    router.push(`/tasks/${task.id}`)
  }, [abandonTask, router, task.id])

  const handleNext = useCallback(() => {
    if (isLast) {
      if (flags.confirmDestructive) {
        setShowConfirmComplete(true)
      } else {
        doComplete()
      }
    } else {
      const nextIdx = currentIndex + 1
      goToStep(nextIdx)
      announceStep(nextIdx)
      const now = Date.now()
      setStepConfirmedAt(now)
      if (flags.flashOnImportant) {
        setFlashKey(now)
      }
      if (flags.visualNotificationsOnly) {
        toast.success(`Step ${currentIndex + 1} complete`, {
          duration: 8000,
        })
      }
    }
  }, [isLast, flags.confirmDestructive, flags.flashOnImportant, flags.visualNotificationsOnly, doComplete, currentIndex, goToStep, announceStep])

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      const prevIdx = currentIndex - 1
      goToStep(prevIdx)
      announceStep(prevIdx)
    }
  }, [isFirst, currentIndex, goToStep, announceStep])

  const handleExit = useCallback(() => {
    if (flags.confirmDestructive) {
      setShowConfirmExit(true)
    } else {
      doExit()
    }
  }, [flags.confirmDestructive, doExit])

  useKeyboardNav({
    onNext: handleNext,
    onPrev: isFirst ? undefined : handlePrev,
    onExit: handleExit,
    enabled: !showConfirmExit && !showConfirmComplete,
  })

  if (isComplete) {
    return (
      <FocusMode>
        <CompletionScreen
          taskTitle={task.title}
          stepsCompleted={task.steps.length}
          onDoAnother={() => {
            setIsComplete(false)
            router.push('/tasks')
          }}
        />
      </FocusMode>
    )
  }

  if (!currentStep) return null

  const stepConfirmed = stepConfirmedAt !== null

  return (
    <FocusMode>
      {flashKey !== null && (
        <div
          key={flashKey}
          className="flash-important pointer-events-none fixed inset-0 z-50"
          aria-hidden="true"
        />
      )}
      <div className="min-h-screen flex flex-col">
        {/* Live region for screen reader announcements */}
        <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />

        {/* Header bar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-4">
          <StepProgress
            current={currentIndex + 1}
            total={task.steps.length}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExit}
            aria-label="Exit task"
            className={cn('target-size gap-1.5 text-muted-foreground shrink-0')}
          >
            <XIcon className="size-4" aria-hidden="true" />
            <span className={flags.iconsAlwaysLabeled ? '' : 'hidden sm:inline'}>Exit</span>
          </Button>
        </div>

        {/* Step content */}
        <div className="flex-1 px-4 py-6 mx-auto w-full content-width">
          {stepConfirmed && (
            <div
              className={cn(
                'mb-4 flex items-center gap-2 rounded-lg border font-medium',
                flags.visualNotificationsOnly
                  ? 'py-4 px-5 text-base bg-success text-success-foreground border-success'
                  : 'py-2.5 px-4 text-sm bg-success/10 border-success/30 text-success'
              )}
              role="status"
            >
              <CheckCircleIcon
                className={cn('shrink-0', flags.visualNotificationsOnly ? 'size-6' : 'size-4')}
                aria-hidden="true"
              />
              <span>{t({ default: 'Step complete ✓', simple: 'Done! ✓' })}</span>
            </div>
          )}

          <div className="mb-2 text-sm text-muted-foreground font-medium">
            Step {currentIndex + 1} of {task.steps.length}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t({ default: currentStep.title, simple: currentStep.simpleTitle })}
          </h1>

          <p className="text-base text-foreground/90 leading-relaxed mb-6">
            {t({ default: currentStep.instruction, simple: currentStep.simpleInstruction })}
          </p>

          {currentStep.tip && (
            <div className="flex items-start gap-2.5 rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-foreground/80">
              <LightbulbIcon className="size-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
              <div>
                <span className="font-medium">Tip: </span>
                {currentStep.tip}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-4 py-4 border-t bg-background sticky bottom-0 flex items-center justify-between gap-persona">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={isFirst}
            aria-label="Go to previous step"
            className="target-size gap-2"
          >
            <ChevronLeftIcon className="size-5" aria-hidden="true" />
            <span>{t({ default: 'Previous', simple: 'Back' })}</span>
            {flags.keyboardShortcutsVisible && (
              <kbd className="ml-1 text-xs opacity-60" aria-hidden="true">←</kbd>
            )}
          </Button>

          <Button
            ref={nextBtnRef}
            onClick={handleNext}
            aria-label={isLast ? 'Complete task' : 'Mark done and go to next step'}
            className="target-size gap-2 flex-1 sm:flex-none justify-center"
          >
            {isLast ? (
              <>
                <CheckCircleIcon className="size-5" aria-hidden="true" />
                <span>{t({ default: 'Complete task', simple: 'Finish!' })}</span>
              </>
            ) : (
              <>
                <span>{t({ default: 'Mark done & next', simple: 'Done, next step' })}</span>
                <ChevronRightIcon className="size-5" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>

        {flags.keyboardShortcutsVisible && (
          <div className="px-4 pb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <KeyboardIcon className="size-3.5" aria-hidden="true" />
            <span>Space / Enter: Next &nbsp;·&nbsp; ← →: Navigate &nbsp;·&nbsp; Esc: Exit</span>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showConfirmExit}
        title="Exit this task?"
        description="Your progress will be lost. Are you sure you want to leave?"
        confirmLabel="Exit task"
        cancelLabel="Keep going"
        variant="destructive"
        onConfirm={doExit}
        onCancel={() => setShowConfirmExit(false)}
      />

      <ConfirmDialog
        open={showConfirmComplete}
        title="Complete this task?"
        description={`You are about to mark "${task.title}" as done.`}
        confirmLabel="Complete"
        cancelLabel="Not yet"
        variant="default"
        onConfirm={doComplete}
        onCancel={() => setShowConfirmComplete(false)}
      />
    </FocusMode>
  )
}
