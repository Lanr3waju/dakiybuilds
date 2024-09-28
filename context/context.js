'use client'
import { createContext, useEffect, useState } from 'react'
import { fetchCurrentProjectId, getAppTheme, getProjects } from './supabaseTables'
import { getExpendituresByProjectId } from '@/app/components/project-finance/supabaseTables'

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

  const [expenditures, setExpenditures] = useState([])

  const [projectSumAndDate, setProjectSumAndDate] = useState({
    projectFinishDate: '',
    projectContractSum: '',
  })

  const [workingProjectSumAndDate, setWorkingProjectSumAndDate] = useState({
    workingProjectFinishDate: '',
    workingProjectContractSum: '',
  })

  const [expendituresTrigger, setExpendituresTrigger] = useState({})

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

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const data = await getExpendituresByProjectId(currentProjectId)
        // Sort the data by `created_at` (assuming it's a valid timestamp format)
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        // Set the sorted data
        setExpenditures(sortedData)
      } catch (error) {
        console.error('Error fetching expenditures:', error)
      }
    }
    currentProjectId && fetchExpenditures()
  }, [currentProjectId])

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const data = await getExpendituresByProjectId(currentProjectId)
        // Sort the data by `created_at` (assuming it's a valid timestamp format)
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        // Set the sorted data
        setExpenditures(sortedData)
      } catch (error) {
        console.error('Error fetching expenditures:', error)
      }
    }

    currentProjectId && fetchExpenditures()
  }, [expendituresTrigger])

  useEffect(() => {
    const loadCurrentProject = async () => {
      const currentProjectId = await fetchCurrentProjectId()
      if (currentProjectId) {
        // Fetch all projects
        const projects = await getProjects()
        // Find the project that matches the currentProjectId
        const currentProject = projects.find(({ id }) => id === currentProjectId)
        if (currentProject) {
          setProject(currentProject) // Set the project with the correct data
          setCurrentProjectId(currentProjectId) // Set the current project ID
        }
      }
    }
    loadCurrentProject()
  }, []);

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
        expenditures,
        setExpendituresTrigger
      }}
    >
      {children}
    </DakiyStore.Provider>
  )
}

export default Context
