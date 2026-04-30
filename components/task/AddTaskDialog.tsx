'use client'

import { useState } from 'react'
import { PlusIcon, ChevronDownIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useTaskStore } from '@/store/task-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'
import { cn } from '@/lib/utils'
import type { TaskTemplate, TaskStep } from '@/store/task-store'

interface AddTaskDialogProps {
  open: boolean
  onClose: () => void
}

export function AddTaskDialog({ open, onClose }: AddTaskDialogProps) {
  const { customTasks, addCustomTask } = useTaskStore()
  const allTasks = [...TASK_TEMPLATES, ...customTasks]

  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [title, setTitle] = useState('')
  const [stepInputs, setStepInputs] = useState([''])
  const [totalTime, setTotalTime] = useState('')

  const handleAddStep = () => setStepInputs((p) => [...p, ''])

  const handleClose = () => {
    setSelectedTemplateId('')
    setTitle('')
    setStepInputs([''])
    setTotalTime('')
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedTemplateId) {
      handleClose()
      return
    }

    if (!title.trim()) return

    const steps: TaskStep[] = stepInputs
      .filter((s) => s.trim())
      .map((s, i) => ({
        id: `custom-step-${Date.now()}-${i}`,
        title: s,
        simpleTitle: s,
        instruction: s,
        simpleInstruction: s,
      }))

    if (steps.length === 0) {
      steps.push({
        id: `custom-step-${Date.now()}-0`,
        title: title,
        simpleTitle: title,
        instruction: title,
        simpleInstruction: title,
      })
    }

    const newTask: TaskTemplate = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      simpleTitle: title.trim(),
      description: `Custom task: ${title.trim()}`,
      simpleDescription: title.trim(),
      category: 'Custom',
      estimatedMinutes: parseInt(totalTime) || 30,
      steps,
      isCustom: true,
    }

    addCustomTask(newTask)
    handleClose()
  }

  const inputClass = cn(
    'w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground',
    'outline-none focus:border-primary focus:ring-1 focus:ring-primary',
    'placeholder:text-muted-foreground'
  )

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Fill the following fields to add your new task in your tasks list.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Select from list */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Select From List</label>
            <div className="relative">
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className={cn(
                  'w-full rounded-lg bg-primary/20 border border-primary/20 pl-3 pr-8 py-2.5',
                  'text-sm text-foreground outline-none appearance-none',
                  'focus:border-primary focus:ring-1 focus:ring-primary'
                )}
                aria-label="Select an existing task template"
              >
                <option value="">Select Task</option>
                {allTasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-foreground/60"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative" aria-hidden="true">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-popover px-3 text-sm font-semibold text-foreground">
                Add your own
              </span>
            </div>
          </div>

          {/* Task Title */}
          <div className="space-y-1.5">
            <label htmlFor="task-title" className="text-sm font-medium text-foreground">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className={inputClass}
            />
          </div>

          {/* Steps */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Steps</label>
              <button
                type="button"
                onClick={handleAddStep}
                className={cn(
                  'text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1',
                  'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring rounded'
                )}
                aria-label="Add another step"
              >
                <PlusIcon className="size-3.5" aria-hidden="true" />
                Add
              </button>
            </div>
            {stepInputs.map((step, i) => (
              <input
                key={i}
                type="text"
                value={step}
                onChange={(e) =>
                  setStepInputs((p) => p.map((s, j) => (j === i ? e.target.value : s)))
                }
                placeholder={i === 0 ? 'Break down your task' : `Step ${i + 1}`}
                aria-label={`Step ${i + 1}`}
                className={inputClass}
              />
            ))}
          </div>

          {/* Total Time */}
          <div className="space-y-1.5">
            <label htmlFor="total-time" className="text-sm font-medium text-foreground">
              Total Time (minutes)
            </label>
            <input
              id="total-time"
              type="number"
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
              placeholder="Enter time"
              min={1}
              className={inputClass}
            />
          </div>

          <Button type="submit" className="w-full target-size justify-center">
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
