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

export const getLogs = async () => {
    let { data: logs } = await supabase
        .from('logs')
        .select("*")
        // Filters
        .eq('project_id', projectData ? projectData[0].id : "")
    return logs
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

export const getLoggerName = async (currentLogId) => {
    // Get user_id for the user that created the current log
    let { data: logs } = await supabase
        .from('logs')
        .select("user_id")
        // Filters
        .eq('id', currentLogId)
    const logUserId = logs[0].user_id

    // Get the full name of the user that created the log
    let { data: profiles } = await supabase
        .from('profiles')
        .select("full_name")
        // Filters
        .eq('id', logUserId)
    return profiles[0].full_name
}

export const updateLog = async (currentLogID, updatedLog) => {
    const { error } = await supabase
        .from('logs')
        .update({ note: updatedLog })
        .eq('id', currentLogID)
        .select()
    if (error) return error.message
}
