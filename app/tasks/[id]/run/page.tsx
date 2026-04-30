'use client'

import { use, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { StepRunner } from '@/components/task/StepRunner'
import { useTaskStore } from '@/store/task-store'
import { TASK_TEMPLATES } from '@/lib/task-templates'

interface RunPageProps {
  params: Promise<{ id: string }>
}

export default function RunPage({ params }: RunPageProps) {
  const { id } = use(params)
  const customTasks = useTaskStore((s) => s.customTasks)
  const task = useMemo(
    () => [...TASK_TEMPLATES, ...customTasks].find((t) => t.id === id),
    [id, customTasks]
  )

  if (!task) notFound()

  return <StepRunner task={task} />
}
