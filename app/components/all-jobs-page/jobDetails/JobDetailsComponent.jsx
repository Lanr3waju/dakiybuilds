'use client'
import Image from "next/image"
import { DakiyStore } from "@/context/context"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Progress from "../../utils/Progress"
import Divider from '@mui/material/Divider'
import addCommasToMoney from "../../utils/addCommasToNos"
import numberToWords from "../../utils/numberToWords"
import replaceSpacesWithHyphensAndLowerCase from "../../utils/replaceSpacesWithHyphens"
import HorizontalLine from "../../utils/HorizontalLine"
import LoadJobModal from "./modals/LoadJobModal"
import DeleteJobState from "./DeleteJobState"

function JobDetailsComponent() {
    const pathname = usePathname()
    const { projects } = useContext(DakiyStore)
    const [currentProject, setCurrentProject] = useState({})
    const [deleteState, setDeleteState] = useState(false)

    useEffect(() => {
        const projectID = pathname.replace("/all-jobs/", "")
        const selectedProject = projects?.find(({ id }) => projectID === id)
        selectedProject && setCurrentProject(selectedProject)
    }, [pathname, projects])

    return (
        <>
            <LoadJobModal currentProject={currentProject.id} />
            <header>
                <h2 className="m-4 text-center font-Poppins text-2xl font-bold uppercase text-primary">
                    {currentProject.name}
                    <span className="m-1 text-center font-Raleway text-xl font-bold uppercase text-primary-content/50">({currentProject.location})</span>
                </h2>
            </header>

            <section className="flex flex-col items-start justify-between p-4 font-Raleway font-medium text-primary-content/75 md:flex-row">
                <section className="mb-6 mr-1 w-11/12 rounded-md border-4 border-base-300 p-6 pb-10 shadow-md shadow-base-300" >
                    <Progress progress={currentProject.progress} />
                    <Image className="mt-4 max-h-96 w-full object-cover" priority quality={100} width={800} height={500} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-site-picture/${replaceSpacesWithHyphensAndLowerCase(currentProject.name)}`} alt="Picture of site" />
                    <span className="mb-6 mt-1 text-center text-sm font-medium text-info">(picture of site)</span>
                    <p className="my-3 font-Roboto text-lg uppercase"><span className="m-1 block font-Raleway text-sm text-secondary-content/70">Project Contract Sum:</span>₦{addCommasToMoney(currentProject.contract_sum)} - ({numberToWords(currentProject.contract_sum)} Naira)</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Initial Advance Payment:</span>₦{currentProject.initial_advance_payment} Naira</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Balance Due to Contractor:</span>₦{addCommasToMoney((currentProject.contract_sum - currentProject.initial_advance_payment))}</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Expenditure:</span>₦0 Naira</p>
                </section>
                <section className="ml-1 w-11/12 rounded-md border-4 border-base-300 p-4 pb-5 shadow-md shadow-base-300">
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-center text-sm text-secondary-content/70">Project Type:</span>{currentProject.type}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Start Date:</span>{currentProject.start_date}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Estimated Finish Date:</span>{currentProject.finish_date}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Duration:</span>{currentProject.project_duration}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase md:block"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Duration to Project Completion:</span>{currentProject.time_to_completion}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Lapse Time:</span>{currentProject.project_lapse_time}</p>
                    <Divider sx={{ my: 3 }} />
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-sm text-secondary-content/70">Client Name:</span>{currentProject.client_name}</p>
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-sm text-secondary-content/70">Client Email:</span> {currentProject.client_email}</p>
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-sm text-secondary-content/70">Client Tel:</span> {currentProject.client_phone}</p>
                    <h3 className="mx-auto my-5 max-w-full overflow-auto rounded-md bg-primary/20 p-4 text-lg underline-offset-8"><div className="m-1 text-sm uppercase text-info underline-offset-8">Project Description:</div>{currentProject.project_description}</h3>
                    <HorizontalLine />
                    <button onClick={() => window.load_job_modal.showModal()} className="btn btn-success m-1 block w-full">
                        Load this project onto the app
                    </button>
                    <button className="btn btn-warning m-1 w-full">
                        Edit this project
                    </button>
                    {deleteState ?
                        <DeleteJobState currentProject={currentProject} setDeleteState={setDeleteState} /> :
                        <button onClick={() => setDeleteState(true)} className="btn btn-error m-1 w-full">Delete project</button>
                    }
                </section>
            </section>
        </>
    )
}

export default JobDetailsComponent
