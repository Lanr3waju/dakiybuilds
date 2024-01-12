'use server'
import getUser from "@/app/components/utils/getUser"
import getUserProfile from "@/app/components/utils/getUserProfile"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient({ cookies })
let projectData

export const updateAppTheme = async (selectedTheme) => {
    const userProfile = await getUserProfile()
    if (userProfile) {
        const user = await getUser()

        const { error } = await supabase
            .from('organizations')
            .update({ theme: selectedTheme })
            .eq('user_id', user.id)
            .select()

        if (error) return error
    }
}

export const getAppTheme = async () => {
    const userProfile = await getUserProfile()
    if (userProfile === true) {
        const user = await getUser()

        let { data: organizations } = await supabase
            .from('organizations')
            .select("theme")
            // Filters
            .eq('user_id', user.id)

        if (organizations) {
            return organizations[0].theme
        }
    }
}

export const getProjects = async () => {

    const user = await getUser()
    const userProfile = await getUserProfile()

    if (userProfile === true) {
        // Get user organization id
        let { data: organizations } = await supabase
            .from('organizations')
            .select("id")
            // Filters
            .eq('user_id', user.id)
        const organizationId = organizations[0].id

        // fetch projects with user's organization id
        let { data: projects } = await supabase
            .from('projects')
            .select("*")
            // Filters
            .eq('organization_id', organizationId)

        projectData = projects

        if (!projectData) {
            return []
        } else {
            return projectData
        }
    }
}

export const insertProjectPlusTable = async ({ newFinishDate, newContractSum, subsequentPayments, description }, { id }) => {
    const { error } = await supabase
        .from('projects_plus')
        .insert([
            {
                project_id: id,
                new_finish_date: newFinishDate,
                new_contract_sum: newContractSum,
                subsequent_payments: subsequentPayments,
                description: description
            }
        ]).select()

    if (error) {
        return error
    } else {
        return true
    }

}
