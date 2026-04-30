'use client'

import { usePersona } from '@/hooks/use-persona'

interface TextOptions {
  default: string
  simple: string
}

export function useText(): (options: TextOptions) => string {
  const { flags } = usePersona()
  return (options: TextOptions) =>
    flags.simplifiedLanguage ? options.simple : options.default
}
