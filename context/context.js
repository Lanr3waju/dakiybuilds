'use client'

import { createContext, useEffect, useState } from 'react'
import { fetchCurrentProjectId, getAppTheme, getProjects } from './supabaseTables'
import { getExpendituresByProjectId } from '@/app/components/project-finance/supabaseTables'

// Create a context for managing and sharing state across components
export const DakiyStore = createContext()

function Context({ children }) {
  const [project, setProject] = useState({}) // Current selected project
  const [projects, setProjects] = useState([]) // List of all projects
  const [currentProjectId, setCurrentProjectId] = useState('') // Current selected project ID
  const [selectedTheme, setSelectedTheme] = useState('corporate') // Theme setting

  const [setUpdateFormData] = useState({
    newFinishDate: '',
    newContractSum: '',
    subsequentPayments: '',
    description: '',
  })

  const [expenditures, setExpenditures] = useState([]) // List of expenditures for the selected project
  const [projectSumAndDate, setProjectSumAndDate] = useState({
    projectFinishDate: '',
    projectContractSum: '',
  })
  const [workingProjectSumAndDate, setWorkingProjectSumAndDate] = useState({
    workingProjectFinishDate: '',
    workingProjectContractSum: '',
  })

  const [expendituresTrigger, setExpendituresTrigger] = useState({}) // Trigger for fetching expenditures

  // Load the theme from the database or fallback to the default theme
  useEffect(() => {
    const loadTheme = async () => {
      const element = document.getElementById('app')
      const savedAppTheme = await getAppTheme()
      element.setAttribute('data-theme', savedAppTheme || selectedTheme)
    }
    loadTheme()
  }, [selectedTheme])

  // Fetch all projects and set the current project when the app loads
  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await getProjects()
      setProjects(fetchedProjects)

      // Auto-select the first project if only one exists
      if (fetchedProjects.length === 1) {
        setProject(fetchedProjects[0])
        setCurrentProjectId(fetchedProjects[0].id)
      }
    }
    loadProjects()
  }, [])

  // Load the current project and set its details
  useEffect(() => {
    const loadCurrentProject = async () => {
      const fetchedCurrentProjectId = await fetchCurrentProjectId()
      if (fetchedCurrentProjectId) {
        setCurrentProjectId(fetchedCurrentProjectId) // Set current project ID
        const matchedProject = projects.find(({ id }) => id === fetchedCurrentProjectId)
        if (matchedProject) setProject(matchedProject) // Set the project if found
      }
    }
    loadCurrentProject()
  }, [projects])

  // Update project sum and date when the current project changes
  useEffect(() => {
    const updateProjectDetails = (projectData) => {
      const { new_contract_sum, new_finish_date, contract_sum, finish_date } = projectData
      setProjectSumAndDate({
        projectContractSum: new_contract_sum || contract_sum,
        projectFinishDate: new_finish_date || finish_date,
      })
    }

    const currentProject = projects.find(({ id }) => id === currentProjectId)
    if (currentProject) updateProjectDetails(currentProject)
  }, [currentProjectId, projects])

  // Update the working project sum and date based on the selected project
  useEffect(() => {
    const updateWorkingProjectDetails = (projectData) => {
      const { new_contract_sum, new_finish_date, contract_sum, finish_date } = projectData
      setWorkingProjectSumAndDate({
        workingProjectContractSum: new_contract_sum || contract_sum,
        workingProjectFinishDate: new_finish_date || finish_date,
      })
    }

    const workingProject = projects.find(({ id }) => id === project.id)
    if (workingProject) updateWorkingProjectDetails(workingProject)
  }, [project, projects])

  // Fetch and sort expenditures when the current project or the expenditures trigger changes
  useEffect(() => {
    const fetchExpenditures = async () => {
      if (currentProjectId) {
        try {
          const data = await getExpendituresByProjectId(currentProjectId)
          const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setExpenditures(sortedData)
        } catch (error) {
          console.error('Error fetching expenditures:', error)
        }
      }
    }
    fetchExpenditures()
  }, [currentProjectId, expendituresTrigger])

  return (
    <DakiyStore.Provider
      value={{
        project,
        setProject,
        projects,
        setProjects,
        setUpdateFormData,
        projectSumAndDate,
        setProjectSumAndDate,
        setCurrentProjectId,
        setSelectedTheme,
        workingProjectSumAndDate,
        setWorkingProjectSumAndDate,
        expenditures,
        setExpendituresTrigger,
      }}
    >
      {children}
    </DakiyStore.Provider>
  )
}

export default Context
