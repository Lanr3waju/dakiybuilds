'use client'

import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { getProjectsPlus } from "../supabaseTables"
import { DakiyStore } from "@/context/context"
import addCommasToMoney from "@/app/components/utils/addCommasToNos"
import numberToWords from "@/app/components/utils/numberToWords"

function ProjectUpdateComponent() {
    const pathname = usePathname()
    const [projectUpates, setProjectUpdates] = useState([])
    const { projectSumAndDate: { projectContractSum, projectFinishDate }, setCurrentProjectId
    } = useContext(DakiyStore)


    useEffect(() => {
        const getProjectUpdates = async () => {
            const parts = pathname.split("/")
            const projectId = parts[parts.length - 2]
            setCurrentProjectId(projectId)
            const results = await getProjectsPlus(projectId)
            if (results) setProjectUpdates(results)
        }
        getProjectUpdates()
    }, [pathname])

    return (
        <section className="p-6">
            <h2 className="text-center text-lg font-medium">
                Hello Progress
            </h2>
            <h3>Latest Contract Sum: <span className="font-Roboto tracking-wider">{addCommasToMoney(projectContractSum)} - ({numberToWords(projectContractSum)} </span> Naira)</h3>
            <h3>Latest Finish Date: <span className="font-Roboto tracking-wider">{projectFinishDate}</span></h3>
            <ul>
                {
                    projectUpates && projectUpates.map((update) => (
                        <li key={update.id}>
                            Hello Update
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default ProjectUpdateComponent

