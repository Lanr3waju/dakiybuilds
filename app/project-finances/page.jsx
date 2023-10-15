import ProjectFinancePage from '../components/project-finance/ProjectFinancePage'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProjectFinances() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }
  return <ProjectFinancePage />
}

export default ProjectFinances
