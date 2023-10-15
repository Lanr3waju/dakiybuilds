import Team from '../components/project-team/Team'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProjectTeam() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <section data-testid="project-team-heading">
      <Team />
    </section>
  )
}

export default ProjectTeam
