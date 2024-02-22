'use client'
import { useContext, useEffect, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import AddLogs from './AddLogs'
import { getLogs } from './supabaseTables'
import Link from 'next/link'
import { DakiyStore } from '@/context/context'
import extractDate from '../utils/extractDateFromTimestamp'

function ProjectLogsPage() {
  const initialLogData = { logBody: '', logTitle: '' }
  const [addLog, setAddLog] = useState(false)
  const [log, setLog] = useState(initialLogData)
  const [logs, setLogs] = useState([])
  const { project } = useContext(DakiyStore)

  const handleAddLog = () => {
    setAddLog(!addLog)
  }

  // Updates the logs state in the context state when a new log is added
  async function updateLogs() {
    if (project) {
      const logs = await getLogs(project.id)
      setLogs(logs)
    }
  }

  useEffect(() => {
    updateLogs()
  }, [addLog, project])

  // TODO Use intersection observer API to render logs on scroll, add filters / sort buttons
  return (
    <>
      {Object.keys(project).length > 0 ? (
        <section className="p-3 ">
          <button
            onClick={handleAddLog}
            className="btn btn-neutral mx-auto mb-4 block w-2/4"
          >
            {addLog ? 'Close form' : 'Add new log'}
          </button>
          {addLog && (
            <AddLogs setAddLog={setAddLog} log={log} setLog={setLog} />
          )}
          <HorizontalLine />
          <section className="my-8">
            <div className=" flex w-full flex-wrap justify-start text-left text-primary-content/60">
              {logs?.map((log) => (
                <Link
                  href={`project-logs/${log.id}`}
                  className="m-4 w-full rounded-tr-2xl bg-base-200 px-3 py-5 text-left shadow-md shadow-base-300 transition-all duration-300 hover:scale-105 md:max-w-[450px]"
                  key={log.id}
                >
                  <span className="mb-3 block w-full text-left font-semibold uppercase leading-loose tracking-wider">
                    {log.title}
                  </span>
                  <HorizontalLine />
                  <div className="font-Poppins">
                    {extractDate(log.created_at)}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      ) : (
        <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
          Add and Select a Project{' '}
          <Link className="link link-info" href="/all-jobs">
            Here
          </Link>{' '}
          to access the Logs
        </h1>
      )}
    </>
  )
}

export default ProjectLogsPage
