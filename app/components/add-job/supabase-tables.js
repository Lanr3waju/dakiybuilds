'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getUser from '../utils/getUser'

const supabase = createServerComponentClient({ cookies })

export const projectsTable = async (jobData) => {
  const user = await getUser()
  // Get user organization id
  let { data: organizations } = await supabase
    .from('organizations')
    .select('id')
    // Filters
    .eq('user_id', user.id)
  const organizationId = organizations[0].id

  const {
    jobName,
    jobLocation,
    jobType,
    clientName,
    clientEmail,
    clientTelephone,
    contractSum,
    agreedStartDate,
    estimatedFinishDate,
    projectDescription,
    initialAdvancePayment,
  } = jobData
  // insert project data into projects table on DB
  const { error } = await supabase
    .from('projects')
    .insert([
      {
        name: jobName,
        location: jobLocation,
        type: jobType,
        contract_sum: contractSum,
        start_date: agreedStartDate,
        finish_date: estimatedFinishDate,
        client_name: clientName,
        client_phone: clientTelephone,
        client_email: clientEmail,
        project_description: projectDescription,
        user_id: user.id,
        organization_id: organizationId,
        initial_advance_payment: initialAdvancePayment,
        progress: 0,
      },
    ])
    .select()
  if (error) return error
}
