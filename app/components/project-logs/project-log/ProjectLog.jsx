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
    }, [logs])

    return (
        <section className="p-4 m-6 bg-slate-50 rounded-tr-2xl shadow-md shadow-base-300">
            <h2 className="uppercase w-full font-Poppins font-bold text-lg">{log?.title}</h2>
            <HorizontalLine />
            <p className="leading-5 tracking-wide underline underline-offset-4 mt-3">{log?.note}</p>
            <p className="leading-5 tracking-wide mt-5 font-Poppins text-base text-primary-content">{log?.created_at}</p>
        </section>
    )
}

export default ProjectLog
