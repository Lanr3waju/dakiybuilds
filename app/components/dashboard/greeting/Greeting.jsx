import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getUser from '../../utils/getUser'
import { getGreeting } from './getTime'

function Greeting() {
  let fullName = ''

  const fetchUser = async () => {
    const supabase = createServerComponentClient({ cookies })
    const user = await getUser()
    let { data: profiles } = await supabase
      .from('profiles')
      .select("full_name")
      // Filters
      .eq('id', user.id)
    fullName = profiles[0].full_name
  }
  fetchUser()


  return (
    <h2 className="mt-4 text-xl font-semibold">
      Hello {fullName}, {getGreeting()}.
    </h2>
  )
}

export default Greeting
