import DashboardComponent from '../components/dashboard/DashboardComponent'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'
export const dynamic = 'force-dynamic'

async function DakiyBoard() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (!userData.phone) {
    redirect('/create-profile')
  }

  return <DashboardComponent />
}

export default DakiyBoard
