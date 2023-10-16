/* eslint-disable react/no-children-prop */
'use client'
import { usePathname } from 'next/navigation'
import Header from './components/layout/Header'
import './styles/globals.css'
import removeForwardSlash from './components/utils/removeForwardSlash'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  let title = removeForwardSlash(pathname)
  let bodyClass = "font-Raleway bg-base-100"


  if (pathname === '/') {
    title = 'Login'
  } else if (pathname === '/project-schedule/gantt-chart') {
    title = 'gantt-chart'
    bodyClass = "font-Raleway bg-white"
  }

  return (
    <html className={bodyClass} lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body className="bg-base-100 font-Raleway">
        {pathname !== '/project-schedule/gantt-chart' && pathname !== '/' && pathname !== 'create-account' && pathname !== '/add-job' ?
          (<Header children={children} />) :
          (children)
        }
      </body>
    </html>
  )
}
