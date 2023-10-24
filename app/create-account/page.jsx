import CreateAccountForm from '../components/create-account/CreateAccountForm'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function CreateAccount() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return <CreateAccountForm />
}

export default CreateAccount
