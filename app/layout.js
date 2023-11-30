/* eslint-disable react/no-children-prop */
'use client'
import { usePathname } from 'next/navigation'
import Header from './components/layout/Header'
import './styles/globals.css'
import removeForwardSlash from './components/utils/removeForwardSlash'
import Context from '@/context/context'

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  let title = removeForwardSlash(pathname)
  let bodyClass;


  if (pathname === '/') {
    title = 'Login'
    bodyClass = "bg-base-100"
  } else if (pathname === '/project-schedule/gantt-chart') {
    title = 'gantt-chart'
    bodyClass = "bg-white"
  } else {
    bodyClass = "bg-base-100"
  }

  return (
    <html lang="en" className={bodyClass}>
      <head>
        <title>{title}</title>
      </head>
      <body className='font-Raleway'>
        <Context>
        {pathname !== '/project-schedule/gantt-chart' && pathname !== '/' && pathname !== 'create-profile' && pathname !== '/add-job' ?
          (<Header children={children} />) :
          (children)
        }
        </Context>
      </body>
    </html>
  )
}
