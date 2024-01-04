'use server'
import getUser from "@/app/components/utils/getUser"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient({ cookies })
let projectData


export const getProjects = async () => {

    const user = await getUser()

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
