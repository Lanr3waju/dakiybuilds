import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getUser from '../../utils/getUser'
import { getGreeting } from './getTime'

async function Greeting() {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  let { data: profiles } = await supabase
    .from('profiles')
    .select("full_name")
    // Filters
    .eq('id', user.id)


  const fullName = profiles[0].full_name

  return (
    <h2 className="mt-4 text-xl font-semibold">
      Hello {fullName}, {getGreeting()}.
    </h2>
  )
}

export default Greeting
