'use client'
import { useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import Progress from '../utils/Progress'
import NewResourceForm from './NewResource'
import Resources from './Resources'

function ProjectSchedulePage() {
  const [openGantt, setOpenGantt] = useState(false)

  const handleGantt = () => {
    setOpenGantt(true)
  }

  return (
    <>
      {openGantt && <div className='flex h-full w-full items-center justify-center'><progress className="progress progress-success mx-auto my-9 h-4 w-4/5"></progress></div>}

      <main className={`${openGantt ? "hidden" : "p-4"}`} >
      <section className="mx-auto my-8 rounded-lg border-2 border-accent-focus bg-accent/10 p-4">
        <Progress progress={55} />
        <div className="flex w-full justify-between font-Poppins text-sm font-semibold text-primary-content/70">
          <div>23rd November, 2023</div>
          <div>30th December, 2024</div>
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
  )
}

export default ProjectSchedulePage
