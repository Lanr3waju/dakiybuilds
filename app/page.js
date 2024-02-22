import HomeComponent from './components/homepage/HomePage'
import { redirect } from 'next/navigation'
import userSession from './components/utils/userSession'

export const dynamic = 'force-dynamic'

async function HomePage() {
  const isLoggedIn = await userSession()
  if (isLoggedIn) {
    redirect('/dakiyboard')
  }

  return (
    <div className='!scroll-smooth' style={{ scrollBehavior: 'smooth' }}>
      <HomeComponent />
    </div>
  )
}
export default HomePage
