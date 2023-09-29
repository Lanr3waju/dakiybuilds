/* eslint-disable react/no-children-prop */
'use client'
import { usePathname } from 'next/navigation'
import Header from './components/layout/Header'
import './styles/globals.css'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  if (
    pathname !== '/' &&
    pathname !== '/create-account' &&
    pathname !== '/add-job' &&
    pathname !== '/project-schedule/gantt-chart'
  )
    return (
      <html className="bg-base-100" lang="en">
        <body className="font-Raleway">
          <Header children={children} />
        </body>
      </html>
    )
  else {
    return (
      <html className="bg-base-100" lang="en">
        <body className="font-Raleway">{children}</body>
      </html>
    )
  }
}
