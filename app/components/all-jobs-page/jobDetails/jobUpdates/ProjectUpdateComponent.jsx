'use client'

import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { getProjectsPlus } from "../supabaseTables"
import { DakiyStore } from "@/context/context"
import addCommasToMoney from "@/app/components/utils/addCommasToNos"
import numberToWords from "@/app/components/utils/numberToWords"
import extractDate from "@/app/components/utils/extractDateFromTimestamp"

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
            if (results) {
                setProjectUpdates(results)
            }

        }
        getProjectUpdates()
    }, [pathname])

    return (
        <section className="p-6">
            <div className="mb-4 flex w-full flex-col lg:flex-row">
                <div className="card grid h-32 grow rounded-box bg-base-300 p-2 font-Poppins font-bold uppercase text-info">Latest Contract Sum: <span className="font-Poppins text-xl font-bold uppercase tracking-wider text-black md:text-3xl">₦{addCommasToMoney(projectContractSum)} - ({numberToWords(projectContractSum)} Naira)</span></div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="card grid h-32 grow rounded-box bg-base-300 p-2 font-Poppins font-bold uppercase text-info">Latest Finish Date: (yyyy-mm-dd)<span className="font-Poppins text-xl font-bold uppercase tracking-wider text-black md:text-3xl">{projectFinishDate}</span></div>
            </div>
            <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
                {
                    projectUpates && projectUpates.map(({ id, subsequent_payments, description, new_contract_sum, new_finish_date, created_at }, index) => (
                        <li key={id}>
                            {index !== 0 && <hr />}
                            <div className='timeline-middle'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                            </div >
                            <div className={index === 0 || index % 2 === 0 ? "timeline-start mb-10 md:text-end" : "timeline-end mb-10"}>
                                <time className="font-Roboto font-bold">{extractDate(created_at)}</time>
                                {subsequent_payments && subsequent_payments !== '0' && <div className="mb-3 font-Poppins text-xl font-bold tracking-wider text-black"><span className="block text-base font-semibold uppercase text-info">Payment made by the client to the contractor:</span>₦{addCommasToMoney(subsequent_payments)} - {numberToWords(subsequent_payments)} Naira</div>}
                                {new_contract_sum && new_contract_sum !== '0' && <div className="mb-3 font-Poppins text-xl font-bold tracking-wider text-black"><span className="block text-base font-semibold uppercase text-info">New contract sum agreed:</span>₦{addCommasToMoney(new_contract_sum)} - {numberToWords(new_contract_sum)} Naira</div>}
                                {new_finish_date && <div className="mb-3 font-Poppins text-xl font-bold tracking-wider text-black"><span className="block text-base font-semibold uppercase text-info">New finish date agreed:  </span>{new_finish_date}</div>}
                                {description}
                            </div>
                            <hr />
                        </li >
                    ))
                }
            </ul >
        </section >
    )
}
export default ProjectUpdateComponent
