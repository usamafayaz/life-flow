'use client'

import { TaskCard } from '@/components/task/TaskCard'
import type { TaskTemplate } from '@/store/task-store'

interface TaskListProps {
  tasks: TaskTemplate[]
  emptyMessage?: string
}

export function TaskList({ tasks, emptyMessage = 'No tasks found.' }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border p-10 text-center">
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
}
