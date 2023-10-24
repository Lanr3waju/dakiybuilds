import ProjectSettingsPage from '../components/project-settings/ProjectSettingsPage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function ProjectSettings() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return (
    <main className="p-4" data-testid="project-settings-heading">
      <ProjectSettingsPage />
    </main>
  )
}

export default ProjectSettings
