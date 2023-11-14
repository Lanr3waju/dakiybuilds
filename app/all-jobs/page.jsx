import AllJobs from '../components/all-jobs-page/AllJobs'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserProfile from '../components/utils/getUserProfile'

export const dynamic = 'force-dynamic'

async function AllProjects() {
  const userProfile = await getUserProfile()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userProfile !== true) {
    redirect('/create-profile')
  }

  return <AllJobs />
}

export default AllProjects
