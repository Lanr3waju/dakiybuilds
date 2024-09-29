'use client'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { getAppTheme, getProjects } from '@/context/supabaseTables.js'
// import Progress from '../utils/Progress.jsx'
import Greeting from './greeting/Greeting.jsx'
import Weather from './getCurrentWeather/Weather.jsx'
import GetDate from './greeting/GetDate.jsx'
import Overview from './Overview/Overview.jsx'
import Milestone from './Overview/Milestone.jsx'
import { useContext, useEffect } from 'react'
import { DakiyStore } from '@/context/context.js'
import { usePathname } from 'next/navigation.js'

export default function DashboardComponent() {
  const { project, setProjects, setSelectedTheme, loading } = useContext(DakiyStore)
  const pathname = usePathname()

  useEffect(() => {
    const appTheme = async () => {
      const savedAppTheme = await getAppTheme()
      if (savedAppTheme) {
        setSelectedTheme(savedAppTheme)
      }
    }
    appTheme()
  }, [])

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
    <Container className="my-8" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Progress Bar */}
      {/* <Progress progress={project.progress} /> */}
      <Grid container spacing={3}>
        {/* Greeting */}
        <Grid item xs={12} md={8} lg={8}>
          <section className="mb-2 flex rounded-b-md bg-base-200/35 md:px-4 py-2 px-1 shadow-md md:flex-row md:items-center">
            <Greeting />
            <div className="mx-3 bg-primary md:h-7 md:w-1"></div>
            <Weather />
          </section>
          {/* Overview */}
          <Overview />
        </Grid>
        {/* Date and Milestone */}
        <Grid item xs={12} md={4} lg={4}>
          <section className="rounded-lg bg-base-100 p-4 shadow-md">
            <GetDate />
            <Milestone />
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
