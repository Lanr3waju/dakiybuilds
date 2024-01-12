'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getUser from "../utils/getUser"

const supabase = createServerComponentClient({ cookies })

export const getLogs = async (projectId) => {
    let { data: logs, error } = await supabase
        .from('logs')
        .select("*")
        // Filters
        .eq('project_id', projectId)

    if (error) console.error(error)
    return logs
}


export const logsTable = async (log, projectId) => {
    const user = await getUser()
    const currentDate = new Date().toLocaleDateString()
    const { logBody, logTitle } = log
    // insert logs into logs table on DB
    const { error } = await supabase
        .from('logs')
        .insert([
            { created_at: currentDate, title: logTitle, note: logBody, project_id: projectId, user_id: user.id },
        ])
        .select()
    if (error) return error
}

const getLoggerId = async (currentLogId) => {
    // Get user_id for the user that created the current log
    let { data: logs } = await supabase
        .from('logs')
        .select("user_id")
        // Filters
        .eq('id', currentLogId)
    const loggerId = logs[0].user_id
    return loggerId
}

export const getLoggerName = async (currentLogId) => {
    const loggerId = await getLoggerId(currentLogId)

    // Get the full name of the user that created the log
    let { data: profiles } = await supabase
        .from('profiles')
        .select("full_name")
        // Filters
        .eq('id', loggerId)
    return profiles[0].full_name
}

export const updateLog = async (currentLogID, updatedLog) => {
    const loggerId = await getLoggerId(currentLogID)
    const { error } = await supabase
        .from('logs')
        .update({ note: updatedLog })
        .eq('id', currentLogID)
        .eq('user_id', loggerId)
        .select()
    if (error) return error.message
}
