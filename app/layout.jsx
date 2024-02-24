/* eslint-disable react/no-children-prop */
'use client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { usePathname } from 'next/navigation'
import Header from './components/layout/Header'
import './styles/globals.css'
import removeForwardSlash from './components/utils/removeForwardSlash'
import Context from '@/context/context'

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  let title = removeForwardSlash(pathname)
  let bodyClass

  if (pathname === '/') {
    title = 'Homepage'
    bodyClass = 'bg-base-100'
  } else if (pathname === '/project-schedule/gantt-chart') {
    title = 'gantt-chart'
    bodyClass = 'bg-white'
  } else {
    bodyClass = 'bg-base-100'
  }

  return (
    <html data-theme="corporate" id="app" lang="en" className={bodyClass}>
      <head>
        <title>{title}</title>
      </head>
      <Context>
        <body
          className={
            pathname === '/'
              ? '!scroll-smooth font-Raleway'
              : 'mt-4 !scroll-smooth font-Raleway'
          }
        >
          {pathname !== '/project-schedule/gantt-chart' &&
            pathname !== '/' &&
            pathname !== 'create-profile' &&
            pathname !== '/add-job' &&
            pathname !== '/create-profile' ? (
            <Header children={children} />
          ) : (
            children
          )}
          <Analytics />
          <SpeedInsights />
        </body>
      </Context>
    </html>
  )
}
