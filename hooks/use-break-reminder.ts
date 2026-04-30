'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { usePersona } from '@/hooks/use-persona'

const BREAK_INTERVAL_MS = 15 * 60 * 1000

export function useBreakReminder(startedAt: number | null) {
  const { flags } = usePersona()
  const hasReminded = useRef(false)

  useEffect(() => {
    if (!flags.breakReminders || !startedAt) return
    hasReminded.current = false

    const elapsed = Date.now() - startedAt
    const remaining = BREAK_INTERVAL_MS - elapsed

    if (remaining <= 0) {
      if (!hasReminded.current) {
        hasReminded.current = true
        toast('Time for a short break', {
          description: 'You have been going for 15 minutes. A quick pause helps you stay focused.',
          duration: 10000,
        })
      }
      return
    }

    const timer = setTimeout(() => {
      if (!hasReminded.current) {
        hasReminded.current = true
        toast('Time for a short break', {
          description: 'You have been going for 15 minutes. A quick pause helps you stay focused.',
          duration: 10000,
        })
      }
    }, remaining)

    return () => clearTimeout(timer)
  }, [flags.breakReminders, startedAt])
}
