'use client'
import { createContext, useEffect, useState } from 'react'
import { getAppTheme, getProjects } from './supabaseTables'

export const DakiyStore = createContext()

function Context({ children }) {
  const [project, setProject] = useState({})
  const [projects, setProjects] = useState([])
  const [currentProjectId, setCurrentProjectId] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('corporate')

  const [updateFormData, setUpdateFormData] = useState({
    newFinishDate: '',
    newContractSum: '',
    subsequentPayments: '',
    description: '',
  })

  const [projectSumAndDate, setProjectSumAndDate] = useState({
    projectFinishDate: '',
    projectContractSum: '',
  })

  const [workingProjectSumAndDate, setWorkingProjectSumAndDate] = useState({
    workingProjectFinishDate: '',
    workingProjectContractSum: '',
  })

  useEffect(() => {
    if (projects?.length === 1) {
      setProject(projects[0])
    }
  }, [projects])

  useEffect(() => {
    const getProjectID = async () => {
      const res = await getProjects()
      setProjects(res)
    }
    getProjectID()
  }, [updateFormData])

  useEffect(() => {
    // Get selected theme from DB
    const element = document.getElementById('app')
    const appTheme = async () => {
      const savedAppTheme = await getAppTheme()
      if (!savedAppTheme) {
        element.setAttribute('data-theme', selectedTheme)
      } else {
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
        setProjectSumAndDate((prevState) => ({
          ...prevState,
          projectContractSum: new_contract_sum,
        }))
      }

      if (new_finish_date) {
        setProjectSumAndDate((prevState) => ({
          ...prevState,
          projectFinishDate: new_finish_date,
        }))
      }

      if (!new_contract_sum) {
        setProjectSumAndDate((prevState) => ({
          ...prevState,
          projectContractSum: currentProject.contract_sum,
        }))
      }

      if (!new_finish_date) {
        setProjectSumAndDate((prevState) => ({
          ...prevState,
          projectFinishDate: currentProject.finish_date,
        }))
      }
    }
  }, [currentProjectId, projects])

  useEffect(() => {
    const workingProject = projects?.find(({ id }) => project.id === id)
    if (workingProject) {
      // make the new contract sum and new finish date the project's finish date and contract sum if it exists
      const { new_contract_sum, new_finish_date } = workingProject

      if (new_contract_sum) {
        setWorkingProjectSumAndDate((prevState) => ({
          ...prevState,
          workingProjectContractSum: new_contract_sum,
        }))
      }

      if (new_finish_date) {
        setWorkingProjectSumAndDate((prevState) => ({
          ...prevState,
          workingProjectFinishDate: new_finish_date,
        }))
      }

      if (!new_contract_sum) {
        setWorkingProjectSumAndDate((prevState) => ({
          ...prevState,
          workingProjectContractSum: project.contract_sum,
        }))
      }

      if (!new_finish_date) {
        setWorkingProjectSumAndDate((prevState) => ({
          ...prevState,
          workingProjectFinishDate: project.finish_date,
        }))
      }
    }
  }, [project.contract_sum, project.finish_date, project.id, projects])

  return (
    <DakiyStore.Provider
      value={{
        project,
        setProject,
        setProjects,
        projects,
        setUpdateFormData,
        projectSumAndDate,
        setProjectSumAndDate,
        setCurrentProjectId,
        setSelectedTheme,
        workingProjectSumAndDate,
        setWorkingProjectSumAndDate,
      }}
    >
      {children}
    </DakiyStore.Provider>
  )
}

export default Context
