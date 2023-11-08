import Team from '../components/project-team/Team'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'

export const dynamic = 'force-dynamic'

async function ProjectTeam() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (!userData.phone) {
    redirect('/create-profile')
  }

  return <Team />
}

export default ProjectTeam
