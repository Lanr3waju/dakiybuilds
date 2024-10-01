'use client'
import { useContext, useEffect, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import AddLogs from './AddLogs'
import { getLogs } from './supabaseTables'
import Link from 'next/link'
import { DakiyStore } from '@/context/context'
import ProjectLogByTitles from './ProjectLogByTitles'

function ProjectLogsPage() {
  const initialLogData = { logBody: '', logTitle: '' }
  const [addLog, setAddLog] = useState(false)
  const [log, setLog] = useState(initialLogData)
  const { project, loading, setLogs } = useContext(DakiyStore)

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

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4 text-lg">Fetching your project documents, please hold on...</p>
      </div>
    )
  }

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
          <ProjectLogByTitles />
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
