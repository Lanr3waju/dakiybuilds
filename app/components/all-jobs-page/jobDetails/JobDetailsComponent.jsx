'use client'
import Image from "next/image"
import { DakiyStore } from "@/context/context"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Progress from "../../utils/Progress"
import addCommasToMoney from "../../utils/addCommasToNos"
import numberToWords from "../../utils/numberToWords"
import replaceSpacesWithHyphensAndLowerCase from "../../utils/replaceSpacesWithHyphens"
import HorizontalLine from "../../utils/HorizontalLine"


function JobDetailsComponent() {
    const pathname = usePathname()
    const { projects } = useContext(DakiyStore)
    const [currentProject, setCurrentProject] = useState({})
    const pictureName = replaceSpacesWithHyphensAndLowerCase(currentProject.name)
    console.log(pictureName)
    useEffect(() => {
        const projectID = pathname.replace("/all-jobs/", "")
        const selectedProject = projects?.find(({ id }) => projectID === id)
        selectedProject && setCurrentProject(selectedProject)
    }, [pathname, projects])

    return (
        <>
            <header>
                <h2 className="m-4 text-center font-Raleway text-2xl font-bold uppercase text-primary-focus">
                    {currentProject.name}
                    <span className="m-1 text-center font-Raleway text-xl font-bold uppercase text-primary-content/50">({currentProject.location})</span>
                </h2>
            </header>

            <section className="flex flex-col items-start justify-evenly p-4 font-Roboto font-medium text-primary-content/75 md:flex-row">
                <section className="mb-6 w-full rounded-md border-4 border-base-300 bg-base-200 p-6 pb-10 shadow-md shadow-base-300 duration-700 ease-in-out hover:translate-y-2 md:min-h-[70vh]">
                    <Progress progress={currentProject.progress} />
                    <Image className="mt-4 w-full bg-contain" quality={100} width={800} height={500} src={`https://okbmlqqydzhugibpwghq.supabase.co/storage/v1/object/public/project-site-picture/${replaceSpacesWithHyphensAndLowerCase(currentProject.name)}`} alt="Picture of site" />
                    <span className="mb-6 mt-1 text-center font-Raleway text-sm font-medium text-info">(picture of site at project commencement)</span>
                    <p className="mt-3 font-Roboto text-lg uppercase"><div className="m-1 font-Raleway text-sm font-bold uppercase text-primary-focus">Project Contract Sum:</div>₦{addCommasToMoney(currentProject?.contract_sum)} - ({numberToWords(currentProject.contract_sum)} Naira)</p>
                </section>
                <section className="mx-3 mt-10 w-full rounded-md border-4 border-base-300 bg-base-200 p-4 pb-5 shadow-md shadow-base-300 duration-700 ease-in-out hover:translate-y-2">
                    <p className="text-lg uppercase"><span className="m-1 text-center font-Raleway text-sm font-bold uppercase text-primary-focus">Project Type:</span>{currentProject.type}</p>
                    <p className="text-lg uppercase"><span className="m-1 font-Raleway text-sm font-bold uppercase text-primary-focus">Project Start Date:</span>{currentProject.start_date}</p>
                    <p className="text-lg uppercase"><span className="m-1 font-Raleway text-sm font-bold uppercase text-primary-focus">Project Estimated Finish Date:</span>{currentProject.finish_date}</p>
                    <h3 className="mx-3 mt-6 font-Raleway text-lg font-bold uppercase text-info">Client Credentials:</h3>
                    <p className="text-lg uppercase"><span className="m-1 text-center font-Raleway text-sm font-bold uppercase text-primary-focus">Client Name:</span>{currentProject.client_name}</p>
                    <p className="text-lg uppercase"><span className="m-1 text-center font-Raleway text-sm font-bold uppercase text-primary-focus">Client Email:</span> {currentProject.client_email}</p>
                    <p className="text-lg uppercase"><span className="m-1 text-center font-Raleway text-sm font-bold uppercase text-primary-focus">Client Tel:</span> {currentProject.client_phone}</p>
                    <h3 className="mx-auto my-5 max-w-full overflow-auto rounded-md bg-primary/20 p-4 text-lg underline-offset-8"><div className="m-1 font-Raleway text-sm font-bold uppercase text-info underline-offset-8">Project Description:</div>{currentProject.project_description}</h3>
                    <HorizontalLine />
                    <button className="btn btn-success m-1 block w-full">
                        Load this project onto the app
                    </button>
                    <button className="btn btn-warning m-1 w-full">
                        Edit this project
                    </button>
                    <button className="btn btn-error m-1 w-full">
                        Delete project
                    </button>
                </section>
            </section>
        </>
    )
}

export default JobDetailsComponent
