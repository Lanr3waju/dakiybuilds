'use client'
import { createContext, useEffect, useState } from "react"
import { getProjects } from "./supabaseTables"

export const DakiyStore = createContext()

function Context({ children }) {
    const [project, setProject] = useState({})
    const [projects, setProjects] = useState([])

    async function fetchProjectID() {
        const res = await getProjects()
        setProjects(res)
    }

    useEffect(() => {
        fetchProjectID()
    }, [])

    return (
        <DakiyStore.Provider value={{ project, setProject, setProjects, projects }}>
            {children}
        </DakiyStore.Provider>
    )
}

export default Context
