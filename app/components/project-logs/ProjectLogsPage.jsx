'use client'
import { useEffect, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import AddLogs from './AddLogs'
import { getLogs, getProjectId } from './supabaseTables'
import Link from 'next/link'

function ProjectLogsPage() {
  const initialLogData = { logBody: '', logTitle: '' }
  const [addLog, setAddLog] = useState(false)
  const [projects, setProjects] = useState(false)
  const [log, setLog] = useState(initialLogData)
  const [logs, setLogs] = useState([])

  const handleAddLog = () => {
    setAddLog(!addLog)
  }

  async function fetchProjectID() {
    const res = await getProjectId()
    setProjects(res)
  }

  // Updates the logs state in the context state when a new log is added
  async function updateLogs() {
    const logs = await getLogs()
    setLogs(logs)
  }

  useEffect(() => {
    fetchProjectID()
  }, [])

  useEffect(() => {
    updateLogs()
  }, [addLog])


  // TODO Use intersection observer API to render logs on scroll, add filters / sort buttons
  return (
    <>
      {projects ?
        (
          <section section className="p-3 " >
            <button onClick={handleAddLog} className="btn btn-neutral mx-auto mb-4 block w-2/4">
              {addLog ? 'Close form' : 'Add new log'}
            </button>
            {addLog && <AddLogs setAddLog={setAddLog} log={log} setLog={setLog} />}
            <HorizontalLine />
            <section className="my-8">
              <div className=" flex w-full flex-wrap justify-start text-left text-primary-content/60">
                {logs?.map((log) => (
                  <Link href={`project-logs/${log.id}`}
                    className="m-4 w-full rounded-tr-2xl bg-base-200 px-3 py-5 text-left shadow-md shadow-base-300 transition-all duration-300 hover:scale-105 md:max-w-[450px]"
                    key={log.id}
                  >
                    <span className="mb-3 block w-full text-left font-semibold uppercase leading-loose tracking-wider">{log.title}</span>
                    <HorizontalLine />
                    <div className="font-Poppins">{log.created_at}</div>
                  </Link>
                ))}
              </div>
            </section>
          </section>
        )
        :
        <h1 className='m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error'>Add or Select a Project to Access the Project&apos;s Logs</h1>}
    </>
  )
}

export default ProjectLogsPage
