'use client'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import HorizontalLine from "../../utils/HorizontalLine"
import { getLoggerName, getLogs } from "../supabaseTables"
import EditIcon from '@mui/icons-material/Edit'
import UpdateLogForm from "./UpdateLogForm"

function ProjectLog() {
    const [log, setLog] = useState({})
    const [updateLog, setUpdateLog] = useState(false)
    const [newLog, setNewLog] = useState('')
    const [loggerName, setLoggerName] = useState('')
    const currentLogID = usePathname().replace("/project-logs/", "")

    async function loadLog() {
        const logs = await getLogs()
        const log = logs?.find((log) => log.id === currentLogID)

        if (log) {
            setLog(log)
            const loggerName = await getLoggerName(currentLogID)
            setLoggerName(loggerName)
        } else {
            console.error(`Log with ID ${currentLogID} not found`)
        }
    }

    function editLog() {
        setUpdateLog(true)
        setNewLog(log.note)
    }

    useEffect(() => {
        loadLog()
    }, [])

    return (
        <section className="m-6 rounded-tr-2xl bg-slate-50 p-4 shadow-md shadow-base-300">
            <header className="flex justify-between">
                <h2 className="w-full font-Poppins text-lg font-semibold uppercase text-primary">{log?.title}</h2>
                <button disabled={updateLog} onClick={editLog} className="btn-primary btn-xs mb-1 p-1 duration-200 active:translate-y-[2px] disabled:translate-y-0 disabled:cursor-not-allowed"><EditIcon className="text-primary-content" /></button>
            </header>
            <HorizontalLine />
            {updateLog ? <UpdateLogForm setNewLog={setNewLog} setUpdateLog={setUpdateLog} newLog={newLog} currentLogID={currentLogID} log={log} setLog={setLog} /> :
                <p className="mb-2 mt-3 leading-9 tracking-wide underline underline-offset-4">{log?.note}</p>
            }
            <p className="mt-5 font-Poppins text-base leading-5 tracking-wide text-primary-content">{log?.created_at}</p>
            <p className="text-right font-bold text-primary">Log by: <span className="font-semibold text-primary-content/75">{loggerName}</span></p>
        </section >
    )
}

export default ProjectLog
