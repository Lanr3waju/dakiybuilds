import AllJobs from '../components/all-jobs-page/AllJobs'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function AllProjects() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }

  return (
    <section data-testid="all-projects-heading">
      <AllJobs />
    </section>
  )
}

export default AllProjects
