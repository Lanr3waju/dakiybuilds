import ProjectLogsPage from '../components/project-logs/ProjectLogsPage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function ProjectLogs() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }

  return (
    <div data-testid="project-logs-heading">
      <ProjectLogsPage />
    </div>
  )
}

export default ProjectLogs
