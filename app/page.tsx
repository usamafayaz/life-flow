'use client'

import Link from 'next/link'
import { ArrowRightIcon, CheckCircleIcon, ActivityIcon, ZapIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/layout/AppShell'
import { PersonaCard } from '@/components/persona/PersonaCard'
import { useText } from '@/hooks/use-text'
import type { Persona } from '@/lib/personas'

const PERSONAS: Persona[] = ['noor', 'daniel', 'aisha', 'leo']

export default function HomePage() {
  const t = useText()

  return (
    <AppShell>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 space-y-12 sm:space-y-20">
        {/* Hero */}
        <section className="text-center max-w-2xl mx-auto" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight"
          >
            {t({
              default: 'Do tasks, one step at a time.',
              simple: 'Do tasks step by step.',
            })}
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            {t({
              default:
                'LifeFlow guides you through everyday tasks with clear, structured steps. Designed for focus, not management. Pick up where you left off, at your own pace.',
              simple: 'LifeFlow helps you do tasks step by step. Go at your own speed.',
            })}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-persona">
            <Button
              render={<Link href="/tasks/morning-routine" />}
              className="target-size gap-2 w-full sm:w-auto justify-center"
              size="lg"
            >
              <ZapIcon className="size-4" aria-hidden="true" />
              {t({ default: 'Try a sample task', simple: 'Try a task' })}
            </Button>
            <Button
              render={<Link href="/tasks" />}
              variant="outline"
              className="target-size gap-2 w-full sm:w-auto justify-center"
              size="lg"
            >
              {t({ default: 'Browse all tasks', simple: 'See all tasks' })}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </section>

        {/* Persona selector */}
        <section aria-labelledby="persona-heading">
          <div className="text-center mb-8">
            <h2 id="persona-heading" className="text-2xl font-bold text-foreground">
              {t({
                default: 'Choose your accessibility profile',
                simple: 'Pick your profile',
              })}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t({
                default:
                  'Select a persona below. The entire app adapts in real time to match their accessibility needs.',
                simple: 'Pick a profile. The app will change to help that person.',
              })}
            </p>
          </div>

          <div
            role="group"
            aria-label="Accessibility personas"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {PERSONAS.map((id) => (
              <PersonaCard key={id} id={id} />
            ))}
          </div>
        </section>

        {/* Why different
        <section aria-labelledby="why-heading" className="max-w-2xl mx-auto">
          <h2 id="why-heading" className="text-2xl font-bold text-foreground mb-8 text-center">
            {t({
              default: 'Why this is different',
              simple: 'What makes LifeFlow different',
            })}
          </h2>

          <ul className="space-y-6" role="list">
            {[
              {
                icon: CheckCircleIcon,
                title: t({ default: 'Execution, not management', simple: 'Do tasks, not track them' }),
                body: t({
                  default:
                    'Most apps track your to-do list. LifeFlow walks you through each task one step at a time, so nothing feels overwhelming.',
                  simple: 'LifeFlow helps you DO tasks. Not just write them down.',
                }),
              },
              {
                icon: ActivityIcon,
                title: t({ default: 'Adapts to your needs', simple: 'Built for you' }),
                body: t({
                  default:
                    'Switch between four accessibility personas and the whole app transforms instantly. Fonts, sizes, feedback, and behavior all change.',
                  simple: 'Pick your profile and the app changes to help you.',
                }),
              },
              {
                icon: ZapIcon,
                title: t({ default: 'No account required', simple: 'No sign-up needed' }),
                body: t({
                  default:
                    'Everything is saved in your browser. No account, no sign-up, no data sent anywhere.',
                  simple: 'Everything is saved on your device. No sign-up.',
                }),
              },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section> */}
      </div>
    </AppShell>
  )
}
