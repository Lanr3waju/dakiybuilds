'use client'

import { createContext, useEffect, useState } from 'react'
import { fetchCurrentProjectId, getAppTheme, getProjects } from './supabaseTables'
import { getBudgetsByProjectId, getExpendituresByProjectId } from '@/app/components/project-finance/supabaseTables'
import { getLogs } from '@/app/components/project-logs/supabaseTables'

// Create a context for managing and sharing state across components
export const DakiyStore = createContext()

function Context({ children }) {
  const [project, setProject] = useState({}) // Current selected project
  const [projects, setProjects] = useState([]) // List of all projects
  const [currentProjectId, setCurrentProjectId] = useState('') // Current selected project ID
  const [selectedTheme, setSelectedTheme] = useState('corporate') // Theme setting
  const [loading, setLoading] = useState(true) // Loading state
  const [expenditures, setExpenditures] = useState([]) // List of expenditures for the selected project
  const [totalBudget, setTotalBudget] = useState(0) // Total budget for the selected project
  const [totalExpenditure, setTotalExpenditure] = useState(0) // Total expenditure for the selected project
  const [logs, setLogs] = useState([]) // List of logs for the selected project
  const [localExpenditures, setLocalExpenditures] = useState({
    Labor: 0,
    Material: 0,
    Equipment: 0,
    Subcontractor: 0,
    Others: 0,
  })
  const [budgets, setBudgets] = useState({})

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

  // Load the theme from the database or fallback to the default theme
  useEffect(() => {
    const loadTheme = async () => {
      const element = document.getElementById('app')
      const savedAppTheme = await getAppTheme()
      element.setAttribute('data-theme', savedAppTheme || selectedTheme)
    }
    loadTheme()
  }, [selectedTheme])

  useEffect(() => {
    const tempExpenditures = {
      Labor: 0,
      Material: 0,
      Equipment: 0,
      Subcontractor: 0,
      Others: 0,
    }

    expenditures.forEach(expenditure => {
      const { category, amount } = expenditure
      const parsedAmount = parseFloat(amount) || 0

      if (tempExpenditures[category] !== undefined) {
        tempExpenditures[category] += parsedAmount
      }
    })

    setLocalExpenditures(tempExpenditures)
  }, [expenditures])

  // Fetch all projects and set the current project when the app loads
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true) // Start loading
      const fetchedProjects = await getProjects()
      setProjects(fetchedProjects);

      // Auto-select the first project if only one exists
      if (fetchedProjects.length === 1) {
        setProject(fetchedProjects[0])
        setCurrentProjectId(fetchedProjects[0].id);
      }

      // Fetch current project ID and set project details
      const fetchedCurrentProjectId = await fetchCurrentProjectId();
      if (fetchedCurrentProjectId) {
        setCurrentProjectId(fetchedCurrentProjectId)
        const matchedProject = fetchedProjects.find(({ id }) => id === fetchedCurrentProjectId)
        if (matchedProject) setProject(matchedProject);
      }
      setLoading(false) // End loading
    }
    loadProjects()
  }, [])

  // Update project sum and date when the current project changes
  useEffect(() => {
    const currentProject = projects.find(({ id }) => id === currentProjectId)
    if (currentProject) {
      const { new_contract_sum, new_finish_date, contract_sum, finish_date } = currentProject;
      setProjectSumAndDate({
        projectContractSum: new_contract_sum || contract_sum,
        projectFinishDate: new_finish_date || finish_date,
      });
      setWorkingProjectSumAndDate({
        workingProjectContractSum: new_contract_sum || contract_sum,
        workingProjectFinishDate: new_finish_date || finish_date,
      });
    }
  }, [currentProjectId, projects]);

  // Fetch and sort expenditures when the current project changes
  useEffect(() => {
    const fetchExpenditures = async () => {
      if (currentProjectId) {
        try {
          const data = await getExpendituresByProjectId(currentProjectId)

          // Sort data by the created_at date
          const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setExpenditures(sortedData);

          // Calculate total expenditure by summing the amount values
          const totalExpenditure = sortedData.reduce((total, expenditure) => {
            return total + parseFloat(expenditure.amount || 0) // Convert string to number
          }, 0)

          setTotalExpenditure(totalExpenditure) // Set the total expenditure
        } catch (error) {
          console.error('Error fetching expenditures:', error);
        }
      }
    }

    fetchExpenditures()
  }, [currentProjectId])


  useEffect(() => {
    const fetchBudgets = async () => {
      if (currentProjectId) {
        try {
          const data = await getBudgetsByProjectId(currentProjectId)

          if (data && data.length > 0) {
            const budget = data[0]
            setBudgets(budget)

            // Calculate the total budget by summing the values of Labor, Material, Equipment, Subcontractor, Others
            const totalBudget = Object.keys(budget).reduce((total, key) => {
              if (['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others'].includes(key)) {
                return total + parseFloat(budget[key] || 0) // Convert string to number
              }
              return total
            }, 0)

            setTotalBudget(totalBudget) // Set the total budget
          }
        } catch (error) {
          console.error('Error fetching budgets:', error)
        }
      }
    }

    fetchBudgets()
  }, [currentProjectId]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (project) {
        const logs = await getLogs(currentProjectId)
        setLogs(logs)
      }
    }
    fetchLogs()
  }, [currentProjectId, project])


  return (
    <DakiyStore.Provider
      value={{
        budgets,
        setBudgets,
        project,
        setProject,
        setSelectedTheme,
        projects,
        setProjects,
        updateFormData,
        setUpdateFormData,
        projectSumAndDate,
        workingProjectSumAndDate,
        expenditures,
        setCurrentProjectId,
        loading, // Provide loading state
        totalBudget, // Provide total budget
        localExpenditures, // Provide local expenditures
        totalExpenditure, // Provide total expenditure
        logs,
        setLogs,
      }}
    >
      {children}
    </DakiyStore.Provider>
  )
}

export default Context
