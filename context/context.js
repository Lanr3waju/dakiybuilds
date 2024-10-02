'use client';

import { createContext, useEffect, useState } from 'react'
import { fetchCurrentProjectId, getAppTheme, getProjects } from './supabaseTables'
import { getBudgetsByProjectId, getExpendituresByProjectId } from '@/app/components/project-finance/supabaseTables'
import { getLogs } from '@/app/components/project-logs/supabaseTables';

// Create a context for managing and sharing state across components
export const DakiyStore = createContext();

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
  });
  const [budgets, setBudgets] = useState({});

  const [updateFormData, setUpdateFormData] = useState({
    newFinishDate: '',
    newContractSum: '',
    subsequentPayments: '',
    description: '',
  });

  const [projectSumAndDate, setProjectSumAndDate] = useState({
    projectFinishDate: '',
    projectContractSum: '',
  });

  const [workingProjectSumAndDate, setWorkingProjectSumAndDate] = useState({
    workingProjectFinishDate: '',
    workingProjectContractSum: '',
  });

  // Load the theme from the database or fallback to the default theme
  useEffect(() => {
    const loadTheme = async () => {
      const element = document.getElementById('app')
      const savedAppTheme = await getAppTheme()
      element.setAttribute('data-theme', savedAppTheme || selectedTheme)
    };
    loadTheme();
  }, [selectedTheme]);

  // Update local expenditures based on fetched expenditures
  useEffect(() => {
    const tempExpenditures = {
      Labor: 0,
      Material: 0,
      Equipment: 0,
      Subcontractor: 0,
      Others: 0,
    };

    expenditures.forEach(({ category, amount }) => {
      const parsedAmount = parseFloat(amount) || 0;
      if (tempExpenditures[category] !== undefined) {
        tempExpenditures[category] += parsedAmount;
      }
    });

    setLocalExpenditures(tempExpenditures);
  }, [expenditures]);

  // Fetch all projects and set the current project when the app loads
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const fetchedProjects = await getProjects();

        // Check if fetchedProjects is an array and not undefined
        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);

          // Auto-select the first project if only one exists
          if (fetchedProjects.length === 1) {
            setProject(fetchedProjects[0])
            setCurrentProjectId(fetchedProjects[0].id)
          }

          // Fetch current project ID and set project details
          const fetchedCurrentProjectId = await fetchCurrentProjectId()
          if (fetchedCurrentProjectId) {
            setCurrentProjectId(fetchedCurrentProjectId)

            const matchedProject = fetchedProjects.find(({ id }) => id === fetchedCurrentProjectId)
            if (matchedProject) {
              setProject(matchedProject)
            }
          }
        } else {
          console.warn('Fetched projects is not an array or is undefined');
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);


  // Update project sum and date when the current project changes
  useEffect(() => {
    const currentProject = Array.isArray(projects) ? projects.find(({ id }) => id === currentProjectId) : null;
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
      if (currentProjectId && currentProjectId.trim() !== '') {
        try {
          const data = await getExpendituresByProjectId(currentProjectId);
          const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setExpenditures(sortedData);

          const totalExpenditure = sortedData.reduce(
            (total, { amount }) => total + parseFloat(amount || 0),
            0
          );
          setTotalExpenditure(totalExpenditure);
        } catch (error) {
          console.error('Error fetching expenditures:', error);
        }
      }
    };
    fetchExpenditures();
  }, [currentProjectId]);

  // Fetch budgets when the current project changes
  useEffect(() => {
    const fetchBudgets = async () => {
      if (currentProjectId && currentProjectId.trim() !== '') {
        try {
          const data = await getBudgetsByProjectId(currentProjectId);
          if (data && Array.isArray(data) && data.length > 0) {
            const budget = data[0];
            setBudgets(budget);

            const totalBudget = Object.keys(budget).reduce((total, key) => {
              if (['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others'].includes(key)) {
                return total + parseFloat(budget[key] || 0);
              }
              return total;
            }, 0);

            setTotalBudget(totalBudget);
          }
        } catch (error) {
          console.error('Error fetching budgets:', error);
        }
      }
    };
    fetchBudgets();
  }, [currentProjectId]);

  // Fetch logs when the current project changes
  useEffect(() => {
    const fetchLogs = async () => {
      if (currentProjectId) {
        try {
          const logs = await getLogs(currentProjectId);
          setLogs(logs);
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      }
    };
    fetchLogs();
  }, [currentProjectId]);

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
        loading,
        totalBudget,
        localExpenditures,
        totalExpenditure,
        logs,
        setLogs,
      }}
    >
      {children}
    </DakiyStore.Provider>
  )
}

export default Context
