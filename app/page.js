import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import HomeComponent from './components/homepage/HomePage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dakiyboard')
  }

  return (
    <div className="bg-[url('/yct-logo.png')] bg-right-bottom bg-no-repeat">
      <HomeComponent />
    </div>
  )
}
export default HomePage
