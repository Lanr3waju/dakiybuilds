import ProjectLogsPage from '../components/project-logs/ProjectLogsPage'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProjectLogs() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div data-testid="project-logs-heading">
      <ProjectLogsPage />
    </div>
  )
}

export default ProjectLogs
