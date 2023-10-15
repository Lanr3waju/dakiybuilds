import AllJobs from '../components/all-jobs-page/AllJobs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function AllProjects() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <section data-testid="all-projects-heading">
      <AllJobs />
    </section>
  )
}

export default AllProjects
