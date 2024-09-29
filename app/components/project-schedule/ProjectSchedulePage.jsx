'use client'
import { useContext, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import Progress from '../utils/Progress'
import NewResourceForm from './NewResource'
import Resources from './Resources'
import { DakiyStore } from '@/context/context'
import Link from 'next/link'
import extractDate from '../utils/extractDateFromTimestamp'

function ProjectSchedulePage() {
  const [openGantt, setOpenGantt] = useState(false)
  const { loading, project, workingProjectSumAndDate } = useContext(DakiyStore)

  const handleGantt = () => {
    setOpenGantt(true)
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-transparent">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4 text-lg">Fetching your project documents, please hold on...</p>
      </div>
    )
  }

  return Object.keys(project).length > 0 ? (
    <>
      {openGantt && (
        <div className="flex h-full w-full items-center justify-center">
          <progress className="progress progress-success mx-auto my-9 h-4 w-4/5"></progress>
        </div>
      )}

      <main className={`${openGantt ? 'hidden' : 'p-4'}`}>
        <section className="mx-auto my-8 rounded-lg border-2 border-accent bg-accent/10 p-4">
          <Progress progress={project.progress} />
          <div className="flex w-full justify-between font-Poppins text-sm font-semibold text-primary-content/70">
            <div>{extractDate(project.start_date)}</div>
            <div>
              {extractDate(workingProjectSumAndDate.workingProjectFinishDate)}
            </div>
          </div>
          <a
            onClick={handleGantt}
            href="/project-schedule/gantt-chart"
            className="btn btn-secondary mt-5 w-full md:w-1/4"
          >
            open gantt chart
          </a>
        </section>
        <HorizontalLine />
        <section className="mt-8">
          <h2 className="font-semibold uppercase text-primary-content/75">
            Resource Sheet
          </h2>
          <NewResourceForm />
          <Resources />
        </section>
      </main>
    </>
  ) : (
    <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
      Add and Select a Project{' '}
      <Link className="link link-info" href="/all-jobs">
        Here
      </Link>{' '}
      to access the Schedules
    </h1>
  )
}

export default ProjectSchedulePage
