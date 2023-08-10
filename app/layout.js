'use client'
import { usePathname } from 'next/navigation'
import Header from './components/layout/Header'
import './styles/globals.css'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  if (pathname !== "/")
  return (
    <html className='bg-base-100' lang="en">
      <body className='font-Raleway'>
        <Header />
        {children}
      </body>
    </html>
  )
  else {
    return (
      <html className='bg-base-100' lang="en">
        <body className='font-Raleway'>
          {children}
        </body>
      </html>
    )
  }
}
