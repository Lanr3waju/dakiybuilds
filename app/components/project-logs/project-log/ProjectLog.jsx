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
    const pathname = usePathname()

    async function loadLog() {
        const logs = await getLogs()
        const currentLogID = pathname.replace("/project-logs/", "")
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
                <h2 className="w-full font-Poppins text-lg font-semibold text-primary uppercase">{log?.title}</h2>
                <button disabled={updateLog} onClick={editLog} className="p-1 mb-1 btn-primary btn-xs active:translate-y-[2px] duration-200 disabled:translate-y-0 disabled:cursor-not-allowed"><EditIcon className="text-primary-content" /></button>
            </header>
            <HorizontalLine />
            {updateLog ? <UpdateLogForm setNewLog={setNewLog} setUpdateLog={setUpdateLog} newLog={newLog} /> :
                <p className="mt-3 leading-9 tracking-wide underline underline-offset-4 mb-2">{log?.note}</p>
            }
            <p className="mt-5 font-Poppins text-base leading-5 tracking-wide text-primary-content">{log?.created_at}</p>
            <p className="text-primary font-bold text-right">Log by: <span className="text-primary-content/75 font-semibold">{loggerName}</span></p>
        </section >
    )
}

export default ProjectLog
