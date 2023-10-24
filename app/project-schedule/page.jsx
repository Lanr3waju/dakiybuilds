import ProjectSchedulePage from '../components/project-schedule/ProjectSchedulePage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function ProjectSchedule() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return (
    <div data-testid="project-schedule-heading">
      <ProjectSchedulePage />
    </div>
  )
}

export default ProjectSchedule
