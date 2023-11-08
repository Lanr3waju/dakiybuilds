import CreateProfileForm from '../components/create-profile/CreateProfileForm'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'

export const dynamic = 'force-dynamic'

async function CreateAccount() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userData.phone) {
    redirect('/dakiyboard')
  }
  return <CreateProfileForm />
}

export default CreateAccount
