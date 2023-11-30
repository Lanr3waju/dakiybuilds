'use client'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import HorizontalLine from "../../utils/HorizontalLine"
import { getLogs } from "../supabaseTables"

function ProjectLog() {
    const [log, setLog] = useState({})
    const [logs, setLogs] = useState([])
    const pathname = usePathname()

    async function updateLogs() {
        const logs = await getLogs()
        setLogs(logs)
    }

    useEffect(() => {
        updateLogs()
        const currentLogID = pathname.replace("/project-logs/", "")
        const log = logs?.find((log) => log.id === currentLogID)
        setLog(log)
    }, [logs, pathname])

    return (
        <section className="m-6 rounded-tr-2xl bg-slate-50 p-4 shadow-md shadow-base-300">
            <h2 className="w-full font-Poppins text-lg font-semibold text-primary uppercase">{log?.title}</h2>
            <HorizontalLine />
            <p className="mt-3 leading-9 tracking-wide underline underline-offset-4 mb-2">{log?.note}</p>
            <p className="mt-5 font-Poppins text-base leading-5 tracking-wide text-primary-content">{log?.created_at}</p>
        </section>
    )
}

export default ProjectLog
