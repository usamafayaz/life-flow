'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TASK_TEMPLATES } from '@/lib/task-templates'

export interface TaskStep {
  id: string
  title: string
  simpleTitle: string
  instruction: string
  simpleInstruction: string
  tip?: string
}

export interface TaskTemplate {
  id: string
  title: string
  simpleTitle: string
  description: string
  simpleDescription: string
  category: string
  estimatedMinutes: number
  steps: TaskStep[]
  isCustom?: boolean
}

export interface InProgressTask {
  taskId: string
  currentStepIndex: number
  startedAt: number
}

export interface CompletedTask {
  taskId: string
  taskTitle: string
  completedAt: number
  stepsCompleted: number
}

interface TaskState {
  customTasks: TaskTemplate[]
  inProgress: InProgressTask | null
  completionHistory: CompletedTask[]
  addCustomTask: (task: TaskTemplate) => void
  updateCustomTask: (id: string, task: Partial<TaskTemplate>) => void
  deleteCustomTask: (id: string) => void
  startTask: (taskId: string) => void
  goToStep: (index: number) => void
  completeTask: (title: string, stepsCount: number) => void
  abandonTask: () => void
  getAllTasks: () => TaskTemplate[]
  getTaskById: (id: string) => TaskTemplate | undefined
  clearHistory: () => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      customTasks: [],
      inProgress: null,
      completionHistory: [],

      addCustomTask: (task) =>
        set((s) => ({ customTasks: [...s.customTasks, task] })),

      updateCustomTask: (id, partial) =>
        set((s) => ({
          customTasks: s.customTasks.map((t) =>
            t.id === id ? { ...t, ...partial } : t
          ),
        })),

      deleteCustomTask: (id) =>
        set((s) => ({
          customTasks: s.customTasks.filter((t) => t.id !== id),
        })),

      startTask: (taskId) =>
        set({ inProgress: { taskId, currentStepIndex: 0, startedAt: Date.now() } }),

      goToStep: (index) =>
        set((s) => ({
          inProgress: s.inProgress ? { ...s.inProgress, currentStepIndex: index } : null,
        })),

      completeTask: (title, stepsCount) =>
        set((s) => ({
          inProgress: null,
          completionHistory: [
            ...s.completionHistory,
            {
              taskId: s.inProgress?.taskId ?? '',
              taskTitle: title,
              completedAt: Date.now(),
              stepsCompleted: stepsCount,
            },
          ],
        })),

      abandonTask: () => set({ inProgress: null }),

      getAllTasks: () => {
        const { customTasks } = get()
        return [...TASK_TEMPLATES, ...customTasks]
      },

      getTaskById: (id) => {
        const { customTasks } = get()
        return [...TASK_TEMPLATES, ...customTasks].find((t) => t.id === id)
      },

      clearHistory: () => set({ completionHistory: [] }),
    }),
    {
      name: 'lifeflow-tasks',
      partialize: (s) => ({
        customTasks: s.customTasks,
        completionHistory: s.completionHistory,
      }),
    }
  )
)
