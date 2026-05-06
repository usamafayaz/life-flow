'use client'

interface TextOptions {
  default: string
  simple: string
}

export function useText(): (options: TextOptions) => string {
  return (options: TextOptions) => options.default
}
