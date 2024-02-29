'use server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import getUser from '../../utils/getUser'

export default async function getUserName() {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  let { data: profiles } = await supabase
    .from('profiles')
    .select('full_name')
    // Filters
    .eq('id', user.id)
  if (profiles?.length > 0) {
    return profiles[0].full_name
  } else {
    return ''
  }
}
