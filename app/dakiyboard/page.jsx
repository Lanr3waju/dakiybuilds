import DashboardComponent from '../components/dashboard/DashboardComponent'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function DakiyBoard() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return <DashboardComponent />
}

export default DakiyBoard
