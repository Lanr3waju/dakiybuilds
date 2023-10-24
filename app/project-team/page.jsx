import Team from '../components/project-team/Team'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function ProjectTeam() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }

  return (
    <section data-testid="project-team-heading">
      <Team />
    </section>
  )
}

export default ProjectTeam
