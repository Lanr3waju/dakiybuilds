import AddJobForm from '../components/add-job/AddJobForm'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'

export const dynamic = 'force-dynamic'

async function AddJobsPage() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (!userData.phone) {
    redirect('/create-profile')
  }
  return <AddJobForm />
}

export default AddJobsPage
