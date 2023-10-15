import DocumentsPage from '../components/project-docs/DocumentsPage'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProjectDocuments() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }
  return (
    <section className="px-4" data-testid="project-documents-heading">
      <DocumentsPage />
    </section>
  )
}

export default ProjectDocuments
