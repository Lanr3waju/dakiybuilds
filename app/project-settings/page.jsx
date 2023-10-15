import ProjectSettingsPage from '../components/project-settings/ProjectSettingsPage'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProjectSettings() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <main className="p-4" data-testid="project-settings-heading">
      <ProjectSettingsPage />
    </main>
  )
}

export default ProjectSettings
