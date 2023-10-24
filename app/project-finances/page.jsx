import ProjectFinancePage from '../components/project-finance/ProjectFinancePage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function ProjectFinances() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return <ProjectFinancePage />
}

export default ProjectFinances
