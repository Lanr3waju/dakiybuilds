'use client'
import Container from '@mui/material/Container'
import Link from 'next/link'
import { getAppTheme, getProjects } from '@/context/supabaseTables.js'
import Greeting from './greeting/Greeting.jsx'
import Weather from './getCurrentWeather/Weather.jsx'
import GetDate from './greeting/GetDate.jsx'
import Overview from './Overview/Overview.jsx'
import { useContext, useEffect } from 'react'
import { DakiyStore } from '@/context/context.js'
import { usePathname } from 'next/navigation.js'
import addCommasToMoney from '../utils/addCommasToNos.js'
import BudgetExpenditureChart from '../project-finance/BudgetExpenditureChart.jsx.jsx'
import ProjectLogByTitles from '../project-logs/ProjectLogByTitles.jsx'
import HorizontalLine from '../utils/HorizontalLine.jsx'
import Alert from '../utils/Alert.jsx'
import Grid from '@mui/material/Grid2';

export default function DashboardComponent() {
  const { project, setProjects, setSelectedTheme, loading, workingProjectSumAndDate, totalExpenditure, totalBudget } = useContext(DakiyStore)
  const pathname = usePathname()

  useEffect(() => {
    const appTheme = async () => {
      const savedAppTheme = await getAppTheme()
      if (savedAppTheme) {
        setSelectedTheme(savedAppTheme)
      }
    }
    appTheme()
  }, [project])

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects()
      if (projects) setProjects(projects)
    }
    fetchProjects()
  }, [pathname, setProjects])

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4 text-lg">Fetching your project data, please hold on...</p>
      </div>
    )
  }

  return Object.keys(project).length > 0 ? (
    <Container className="my-4" maxWidth="lg" sx={{ mb: 4 }}>
      {totalBudget > workingProjectSumAndDate?.workingProjectContractSum && (
        <Alert message={`Your budget exceeds the contract sum by ₦${addCommasToMoney(totalBudget - workingProjectSumAndDate?.workingProjectContractSum)} naira.`} />
      )}
      {totalExpenditure > workingProjectSumAndDate?.workingProjectContractSum && (
        <Alert message={`Your expenditure exceeds the contract sum by ₦${addCommasToMoney(totalExpenditure - workingProjectSumAndDate?.workingProjectContractSum)} naira.`} />
      )}
      <Grid container spacing={3}>
        {/* Greeting */}
        <Grid size={{ xs: 12, md: 8, lg: 8 }}>
          <section className="mb-2 flex rounded-b-md bg-base-200/35 px-1 py-2 shadow-md md:flex-row md:items-center md:px-4">
            <Greeting />
            <div className="mx-3 bg-primary md:h-7 md:w-1"></div>
            <Weather />
          </section>
          {/* Overview */}
          <h2 className='font-bold text-primary-content/80'>Overview</h2>
          <HorizontalLine />
          <BudgetExpenditureChart />
          <Overview />
        </Grid>
        {/* Date and Project Logs */}
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <section className="rounded-lg bg-base-100 p-4 shadow-md">
            <GetDate />
            <ProjectLogByTitles />
          </section>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
      Add and Select a Project{' '}
      <Link className="link link-info" href="/all-jobs">
        Here
      </Link>{' '}
      to access the Dashboard
    </h1>
  )
}
