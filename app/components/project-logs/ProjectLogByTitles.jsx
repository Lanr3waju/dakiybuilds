import React, { useContext } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import extractDate from '../utils/extractDateFromTimestamp'
import Link from 'next/link'
import { DakiyStore } from '@/context/context'

function ProjectLogByTitles() {
    const { logs } = useContext(DakiyStore)
    return (
        <section className="my-8">
            <h2 className='font-bold text-primary-content/80'>Project Logs</h2>
            <div className=" flex w-full flex-wrap justify-start text-left text-primary-content/60">
                {logs?.map((log) => (
                    <Link
                        href={`project-logs/${log.id}`}
                        className="m-2 w-full rounded-tr-lg bg-base-200 px-1 py-2 text-left shadow-sm shadow-base-300 transition-all duration-300 hover:scale-105 md:max-w-[450px]"
                        key={log.id}
                    >
                        <span className="mb-3 block w-full text-left text-sm font-medium capitalize">
                            {log.title}
                        </span>
                        <HorizontalLine />
                        <div className="font-Roboto text-xs">
                            {extractDate(log.created_at)}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ProjectLogByTitles
