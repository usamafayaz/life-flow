'use client'

import { useState, useId } from 'react'
import { useRouter } from 'next/navigation'
import {
  PlusIcon,
  Trash2Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  SaveIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InlineError } from '@/components/feedback/InlineError'
import { usePersona } from '@/hooks/use-persona'
import { useText } from '@/hooks/use-text'
import { useTaskStore } from '@/store/task-store'
import type { TaskStep, TaskTemplate } from '@/store/task-store'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Daily Living', 'Cooking', 'Household', 'Errands', 'Learning', 'Health', 'Other']

function generateId() {
  return `custom-${Math.random().toString(36).slice(2, 9)}`
}

function emptyStep(): TaskStep {
  return {
    id: generateId(),
    title: '',
    simpleTitle: '',
    instruction: '',
    simpleInstruction: '',
    tip: '',
  }
}

export function TaskBuilder() {
  const router = useRouter()
  const { flags } = usePersona()
  const t = useText()
  const { addCustomTask } = useTaskStore()
  const formId = useId()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [estimatedMinutes, setEstimatedMinutes] = useState(15)
  const [steps, setSteps] = useState<TaskStep[]>([emptyStep()])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Task title is required.'
    if (!description.trim()) newErrors.description = 'Description is required.'
    steps.forEach((step, i) => {
      if (!step.title.trim()) newErrors[`step-${i}-title`] = `Step ${i + 1} needs a title.`
      if (!step.instruction.trim()) newErrors[`step-${i}-instruction`] = `Step ${i + 1} needs instructions.`
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    setSaving(true)

    const task: TaskTemplate = {
      id: generateId(),
      title: title.trim(),
      simpleTitle: title.trim(),
      description: description.trim(),
      simpleDescription: description.trim(),
      category,
      estimatedMinutes,
      steps: steps.map((s) => ({
        ...s,
        simpleTitle: s.simpleTitle || s.title,
        simpleInstruction: s.simpleInstruction || s.instruction,
      })),
      isCustom: true,
    }

    addCustomTask(task)
    router.push(`/tasks/${task.id}`)
  }

  const updateStep = (index: number, partial: Partial<TaskStep>) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...partial } : s)))
  }

  const addStep = () => setSteps((prev) => [...prev, emptyStep()])

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index))
  }

  const moveStep = (index: number, direction: 'up' | 'down') => {
    setSteps((prev) => {
      const next = [...prev]
      const target = direction === 'up' ? index - 1 : index + 1
      if (target < 0 || target >= next.length) return next
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  return (
    <form
      id={formId}
      onSubmit={(e) => { e.preventDefault(); handleSave() }}
      noValidate
      className="space-y-8"
    >
      {/* Task details */}
      <section aria-labelledby="task-details-heading">
        <h2 id="task-details-heading" className="text-lg font-semibold mb-4">
          {t({ default: 'Task details', simple: 'About this task' })}
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor={`${formId}-title`}>
              Task title <span aria-hidden="true">*</span>
            </Label>
            <Input
              id={`${formId}-title`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Evening wind-down"
              aria-required="true"
              aria-describedby={errors.title ? `${formId}-title-err` : undefined}
              aria-invalid={!!errors.title}
              className="target-size"
            />
            {errors.title && (
              <InlineError
                id={`${formId}-title-err`}
                message={errors.title}
                suggestion={flags.errorSuggestions ? 'Type a short name for your task.' : undefined}
              />
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={`${formId}-desc`}>
              Description <span aria-hidden="true">*</span>
            </Label>
            <Input
              id={`${formId}-desc`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this task about?"
              aria-required="true"
              aria-describedby={errors.description ? `${formId}-desc-err` : undefined}
              aria-invalid={!!errors.description}
              className="target-size"
            />
            {errors.description && (
              <InlineError
                id={`${formId}-desc-err`}
                message={errors.description}
                suggestion={flags.errorSuggestions ? 'Describe the task in one sentence.' : undefined}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor={`${formId}-cat`}>Category</Label>
              <select
                id={`${formId}-cat`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={cn(
                  'target-size flex w-full rounded-lg border border-input bg-background px-3 text-sm',
                  'focus-visible:outline focus-visible:outline-[var(--ring-width)] focus-visible:outline-ring'
                )}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`${formId}-time`}>Est. minutes</Label>
              <Input
                id={`${formId}-time`}
                type="number"
                min={1}
                max={480}
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="target-size"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section aria-labelledby="steps-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="steps-heading" className="text-lg font-semibold">
            {t({ default: 'Steps', simple: 'Steps to follow' })}
          </h2>
          <span className="text-sm text-muted-foreground">{steps.length} step{steps.length !== 1 ? 's' : ''}</span>
        </div>

        <ol className="space-y-4" aria-label="Task steps">
          {steps.map((step, index) => (
            <li key={step.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground">
                  Step {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveStep(index, 'up')}
                    disabled={index === 0}
                    aria-label={`Move step ${index + 1} up`}
                    className="size-8"
                  >
                    <ChevronUpIcon className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveStep(index, 'down')}
                    disabled={index === steps.length - 1}
                    aria-label={`Move step ${index + 1} down`}
                    className="size-8"
                  >
                    <ChevronDownIcon className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(index)}
                    disabled={steps.length <= 1}
                    aria-label={`Remove step ${index + 1}`}
                    className="size-8 text-destructive hover:text-destructive"
                  >
                    <Trash2Icon className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor={`${formId}-step-${index}-title`}>
                    Step title <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id={`${formId}-step-${index}-title`}
                    value={step.title}
                    onChange={(e) => updateStep(index, { title: e.target.value })}
                    placeholder="e.g. Brush your teeth"
                    aria-required="true"
                    aria-describedby={errors[`step-${index}-title`] ? `${formId}-step-${index}-title-err` : undefined}
                    aria-invalid={!!errors[`step-${index}-title`]}
                    className="target-size"
                  />
                  {errors[`step-${index}-title`] && (
                    <InlineError
                      id={`${formId}-step-${index}-title-err`}
                      message={errors[`step-${index}-title`]}
                    />
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor={`${formId}-step-${index}-inst`}>
                    Instructions <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id={`${formId}-step-${index}-inst`}
                    value={step.instruction}
                    onChange={(e) => updateStep(index, { instruction: e.target.value })}
                    placeholder="What should the person do?"
                    aria-required="true"
                    aria-describedby={errors[`step-${index}-instruction`] ? `${formId}-step-${index}-inst-err` : undefined}
                    aria-invalid={!!errors[`step-${index}-instruction`]}
                    className="target-size"
                  />
                  {errors[`step-${index}-instruction`] && (
                    <InlineError
                      id={`${formId}-step-${index}-inst-err`}
                      message={errors[`step-${index}-instruction`]}
                    />
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor={`${formId}-step-${index}-tip`}>
                    Tip <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id={`${formId}-step-${index}-tip`}
                    value={step.tip ?? ''}
                    onChange={(e) => updateStep(index, { tip: e.target.value })}
                    placeholder="A helpful hint for this step"
                    className="target-size"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Button
          type="button"
          variant="outline"
          onClick={addStep}
          className="mt-4 target-size w-full gap-2"
          aria-label="Add another step"
        >
          <PlusIcon className="size-4" aria-hidden="true" />
          {t({ default: 'Add step', simple: 'Add a step' })}
        </Button>
      </section>

      <div className="sticky bottom-0 -mx-4 px-4 py-4 bg-background border-t">
        <Button
          type="submit"
          disabled={saving}
          className="target-size w-full sm:w-auto gap-2"
          aria-label="Save task"
        >
          <SaveIcon className="size-4" aria-hidden="true" />
          {saving
            ? t({ default: 'Saving…', simple: 'Saving…' })
            : t({ default: 'Save task', simple: 'Save' })}
        </Button>
      </div>
    </form>
  )
}
