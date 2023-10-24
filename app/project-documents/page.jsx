import DocumentsPage from '../components/project-docs/DocumentsPage'
import { redirect } from 'next/navigation'
import userSession from '../components/utils/userSession'

export const dynamic = 'force-dynamic'

async function ProjectDocuments() {
  const isLoggedIn = await userSession()
  if (!isLoggedIn) {
    redirect('/')
  }
  return (
    <section className="px-4" data-testid="project-documents-heading">
      <DocumentsPage />
    </section>
  )
}

export default ProjectDocuments
