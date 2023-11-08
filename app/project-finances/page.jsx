import ProjectFinancePage from '../components/project-finance/ProjectFinancePage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'

export const dynamic = 'force-dynamic'

async function ProjectFinances() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (!userData.phone) {
    redirect('/create-profile')
  }

  return <ProjectFinancePage />
}

export default ProjectFinances
