import AddJobForm from '../components/add-job/AddJobForm'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserProfile from '../components/utils/getUserProfile'
export const dynamic = 'force-dynamic'

async function AddJobsPage() {
  const userProfile = await getUserProfile()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userProfile !== true) {
    redirect('/create-profile')
  }
  return <AddJobForm />
}

export default AddJobsPage
