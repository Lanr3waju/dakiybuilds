import DocumentsPage from '../components/project-docs/DocumentsPage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserProfile from '../components/utils/getUserProfile'

export const dynamic = 'force-dynamic'

async function ProjectDocuments() {
  const userProfile = await getUserProfile()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (userProfile !== true) {
    redirect('/create-profile')
  }

  return (
    <section className="px-4">
      <DocumentsPage />
    </section>
  )
}

export default ProjectDocuments
