'use client'
import Image from "next/image"
import { DakiyStore } from "@/context/context"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Progress from "../../utils/Progress"
import addCommasToMoney from "../../utils/addCommasToNos"
import numberToWords from "../../utils/numberToWords"


function JobDetailsComponent() {
    const pathname = usePathname()
    const { projects } = useContext(DakiyStore)
    const [currentProject, setCurrentProject] = useState({})

    useEffect(() => {
        const projectID = pathname.replace("/all-jobs/", "")
        const selectedProject = projects.find(({ id }) => projectID === id)
        selectedProject && setCurrentProject(selectedProject)
    }, [pathname, projects])

    return (
        <section className="p-4">
            <h2 className="text-center uppercase font-bold text-2xl font-Poppins text-primary-content m-1">
                {currentProject.name}
            </h2>
            <Progress progress={currentProject.progress} />
            <Image className="mx-auto" width={200} height={150} src="" alt="Picture of site" />
            <p className="font-Roboto"><span className="font-Poppins font-semibold">Contract Sum:</span>{addCommasToMoney(currentProject?.contract_sum)} - ({numberToWords(currentProject.contract_sum)} naira)</p>

        </section>
    )
}

export default JobDetailsComponent
