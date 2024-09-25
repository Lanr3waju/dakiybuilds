'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getUser from '../utils/getUser'

const supabase = createServerComponentClient({ cookies })

export const registerExpenditure = async ({ amount, type, description, beneficiary }, projectId) => {
    const user = await getUser()

    const { error } = await supabase
        .from('expenditures')
        .insert([
            {
                amount,
                type,
                description,
                beneficiary,
                user_id: user.id,
                project_id: projectId,
            },
        ])

    if (error) {
        console.error('Error registering expenditure:', error)
        return error
    }

    return true // Return true if the operation was successful
}

export const getExpendituresByProjectId = async (projectId) => {
    const { data: expenditures, error } = await supabase
        .from('expenditures')
        .select('*')
        .eq('project_id', projectId)

    if (error) {
        console.error('Error fetching expenditures:', error)
        return []
    }
    return expenditures // Return the expenditures data
}
