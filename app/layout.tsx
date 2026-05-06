import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeBootstrap } from '@/components/persona/ThemeBootstrap'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LifeFlow: Do tasks, one step at a time',
  description:
    'An accessible task execution assistant that guides you through everyday tasks step by step.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lexend.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=JSON.parse(localStorage.getItem('lifeflow-persona')||'{}');var fc=s.state&&s.state.fontScale;if(fc)document.documentElement.style.setProperty('--font-scale',fc/100);var hc=s.state&&s.state.highContrast;if(hc)document.documentElement.setAttribute('data-high-contrast','true');var rm=s.state&&s.state.reducedMotion;if(rm)document.documentElement.setAttribute('data-reduce-motion','true');}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeBootstrap />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
        <Toaster
          position="top-right"
          expand
          richColors
          closeButton
        />
      </body>
    </html>
  )
}
