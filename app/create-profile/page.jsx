import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserProfile from '../components/utils/getUserProfile'
import CreateProfileForm from '../components/create-profile/CreateProfileForm'

export const dynamic = 'force-dynamic'

async function CreateAccount() {
  const userProfile = await getUserProfile()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userProfile === true) {
    redirect('/dakiyboard')
  }
  return <CreateProfileForm />
}

export default CreateAccount
