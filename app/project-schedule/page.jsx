import ProjectSchedulePage from '../components/project-schedule/ProjectSchedulePage'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProjectSchedule() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div data-testid="project-schedule-heading">
      <ProjectSchedulePage />
    </div>
  )
}

export default ProjectSchedule
