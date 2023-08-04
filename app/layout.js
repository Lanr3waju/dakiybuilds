import './styles/globals.css'

export const metadata = {
  title: 'dakiybuilds',
  description: 'A web-based construction management system',
}

export default function RootLayout({ children }) {
  return (
    <html className='bg-base-100' lang="en">
      <body className='font-Raleway'>{children}</body>
    </html>
  )
}
