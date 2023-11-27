'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getUser from "../utils/getUser"

const supabase = createServerComponentClient({ cookies })
let projectData

export const getProjectId = async () => {
    const user = await getUser()
    let { data: projects } = await supabase
        .from('projects')
        .select("id")
        // Filters
        .eq('user_id', user.id)
    projectData = projects

    if (!projectData[0].id) {
        return false
    } else {
        return projectData[0].id
    }
}


export const logsTable = async (log) => {
    const user = await getUser()
    const currentDate = new Date().toLocaleDateString()
    const { logBody, logTitle } = log
    // insert logs into logs table on DB
    const { error } = await supabase
        .from('logs')
        .insert([
            { created_at: currentDate, title: logTitle, note: logBody, project_id: projectData ? projectData[0].id : "", user_id: user.id },
        ])
        .select()
    if (error) return error
}
