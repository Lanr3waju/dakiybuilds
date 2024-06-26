'use client'
import { useContext, useEffect, useState } from 'react'
import AddButon from '../utils/AddButon'
import Link from 'next/link'
import HorizontalLine from '../utils/HorizontalLine'
import Progress from '../utils/Progress'
import { DakiyStore } from '@/context/context'

function AllJobs() {
  const { projects } = useContext(DakiyStore)
  const [allProjects, setAllProjects] = useState(projects)

  useEffect(() => {
    setAllProjects(projects)
  }, [projects])

  return (
    <>
      {allProjects ? (
        <section className="p-4 font-Poppins">
          <h1 className="font-medium uppercase text-primary md:text-lg">
            Jobs
          </h1>
          <HorizontalLine />
          <AddButon addText="Add Job" route="add-job" />
          <ul>
            {projects.map(({ id, name, progress, start_date, client_name }) => (
              <li
                className="mb-1 flex w-full flex-wrap items-center justify-between p-4 shadow-lg shadow-base-300"
                key={id}
              >
                <section className="w-5/6">
                  <h2 className="font-semibold uppercase text-primary-content md:mr-4">
                    {name}
                  </h2>
                  <p>Start Date: {start_date} </p>
                  <p>Client: {client_name}</p>
                  <Progress progress={progress} />
                </section>
                <Link
                  href={`/all-jobs/${id}`}
                  className="btn btn-neutral mt-3 font-Poppins text-neutral-content md:m-0"
                >
                  open project
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
          Add or Select a Project to Access the Project&apos;s Logs
        </h1>
      )}
    </>
  )
}

export default AllJobs
