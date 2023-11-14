import ProjectSettingsPage from '../components/project-settings/ProjectSettingsPage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserProfile from '../components/utils/getUserProfile'


export const dynamic = 'force-dynamic'

async function ProjectSettings() {
  const userProfile = await getUserProfile()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userProfile !== true) {
    redirect('/create-profile')
  }
  return <ProjectSettingsPage />
}

export default ProjectSettings
