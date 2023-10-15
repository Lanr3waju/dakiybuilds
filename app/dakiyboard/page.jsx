import DashboardComponent from '../components/dashboard/DashboardComponent'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function DakiyBoard() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }
  return <DashboardComponent />
}

export default DakiyBoard
