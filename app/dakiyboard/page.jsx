import DashboardComponent from '../components/dashboard/DashboardComponent'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserProfile from '../components/utils/getUserProfile'
export const dynamic = 'force-dynamic'

async function DakiyBoard() {
  const userProfile = await getUserProfile()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userProfile !== true) {
    redirect('/create-profile')
  }

  return (
    < DashboardComponent />
  )
}

export default DakiyBoard
