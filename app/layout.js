'use client'
import { usePathname } from 'next/navigation'
import Header from './components/Header'
import './styles/globals.css'

export const metadata = {
  title: 'dakiybuilds',
  description: 'A web-based construction management system',
  keywords: 'web development, web-based, construction management, construction management system, project management, construction industry, supabase, next.js, html, css'
}

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
