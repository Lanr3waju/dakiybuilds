import AllJobs from '../components/all-jobs-page/AllJobs'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'

export const dynamic = 'force-dynamic'

async function AllProjects() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (!userData.phone) {
    redirect('/create-profile')
  }

  return (
    <section data-testid="all-projects-heading">
      <AllJobs />
    </section>
  )
}

export default AllProjects
