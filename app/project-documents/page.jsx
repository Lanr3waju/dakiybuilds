import DocumentsPage from '../components/project-docs/DocumentsPage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'
import getUserData from '../components/utils/getUserData'

export const dynamic = 'force-dynamic'

async function ProjectDocuments() {
  const userData = await getUserData()
  const isLoggedIn = await userSession()

  if (!isLoggedIn) {
    redirect('/')
  } else if (!userData.phone) {
    redirect('/create-profile')
  }

  return (
    <section className="px-4" data-testid="project-documents-heading">
      <DocumentsPage />
    </section>
  )
}

export default ProjectDocuments
