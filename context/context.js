'use client'
import { createContext, useEffect, useState } from "react"
import { getProjects } from "./supabaseTables"

export const DakiyStore = createContext()

function Context({ children }) {
    const [project, setProject] = useState({})
    const [projects, setProjects] = useState([])

    const [updateFormData, setUpdateFormData] = useState({
        newFinishDate: '',
        newContractSum: '',
        subsequentPayments: '',
        description: ''
    })

    const [projectSumAndDate, setProjectSumAndDate] = useState({
        projectFinishDate: '',
        projectContractSum: ''
    })

    async function fetchProjectID() {
        const res = await getProjects()
        setProjects(res)
    }

    useEffect(() => {
        fetchProjectID()
    }, [projects, project, updateFormData])

    return (
        <DakiyStore.Provider
            value={
                {
                    project, setProject,
                    setProjects, projects,
                    updateFormData, setUpdateFormData,
                    projectSumAndDate, setProjectSumAndDate
                }}>
            {children}
        </DakiyStore.Provider>
    )
}

export default Context
