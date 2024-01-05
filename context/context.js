'use client'
import { createContext, useEffect, useState } from "react"
import { getAppTheme, getProjects } from "./supabaseTables"

export const DakiyStore = createContext()

function Context({ children }) {
    const [project, setProject] = useState({})
    const [projects, setProjects] = useState([])
    const [currentProjectId, setCurrentProjectId] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')

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

    useEffect(() => {
        const getProjectID = async () => {
            const res = await getProjects()
            setProjects(res)
        }
        getProjectID()
    }, [project, updateFormData])

    useEffect(() => {
        // Get selected theme from DB
        const appTheme = async () => {
            const savedAppTheme = await getAppTheme()
            if (savedAppTheme !== '') {
                const element = document.getElementById('app')
                element.setAttribute('data-theme', savedAppTheme)
            }
        }
        appTheme()
    }, [selectedTheme])

    useEffect(() => {
        const currentProject = projects?.find(({ id }) => currentProjectId === id)
        if (currentProject) {
            // make the new contract sum and new finish date the project's finish date and contract sum if it exists
            const { new_contract_sum, new_finish_date } = currentProject

            if (new_contract_sum) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectContractSum: new_contract_sum
                }))
            }

            if (new_finish_date) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectFinishDate: new_finish_date
                }))
            }

            if (!new_contract_sum) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectContractSum: currentProject.contract_sum
                }))
            }

            if (!new_finish_date) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectFinishDate: currentProject.finish_date
                }))
            }
        }
    }, [currentProjectId, projects, projectSumAndDate.projectContractSum, projectSumAndDate.projectFinishDate])

    return (
        <DakiyStore.Provider
            value={
                {
                    project, setProject,
                    setProjects, projects,
                    updateFormData, setUpdateFormData,
                    projectSumAndDate, setProjectSumAndDate,
                    setCurrentProjectId,
                    setSelectedTheme,
                }}>
            {children}
        </DakiyStore.Provider>
    )
}

export default Context
