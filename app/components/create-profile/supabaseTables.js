'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getUser from '../utils/getUser'

const supabase = createServerComponentClient({ cookies })

export const organizationTable = async (name, email, tel, staffs) => {
  const user = await getUser()

  // insert user profile data into profiles table on DB
  const { error } = await supabase
    .from('organizations')
    .insert([
      {
        name: name,
        email: email,
        phone: tel,
        number_of_staffs: staffs,
        user_id: user.id,
      },
    ])
    .select()
  if (error) return error
}

export const profileTable = async (firstName, lastName, profession, tel) => {
  const user = await getUser()
  const fullName = `${firstName} ${lastName}`

  // Get user organization id
  let { data: organizations } = await supabase
    .from('organizations')
    .select('id')
    // Filters
    .eq('user_id', user.id)
  const organizationId = organizations[0].id

  // insert user profile data into profiles table on DB
  const { error } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id,
        full_name: fullName,
        profession: profession,
        tel: tel,
        organization_id: organizationId,
      },
    ])
    .select()
  if (error) return error
}
