import AddJobForm from '../components/add-job/AddJobForm'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function AddJobsPage() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return <AddJobForm />
}

export default AddJobsPage
