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
import EditJobModal from "./modals/EditJobModal"
import { getLapseTime, getRemainingTime, getWeeksBetween } from "../../add-job/calculateProjectDuration"
import { addNewLineBeforeHyphen } from "../../utils/formatProjectDescription"
import UpdateNotification from "./UpdateNotification"

function JobDetailsComponent() {
    const pathname = usePathname()
    const { projects, projectSumAndDate, setProjectSumAndDate } = useContext(DakiyStore)
    const [currentProject, setCurrentProject] = useState({})
    const [deleteState, setDeleteState] = useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const projectID = pathname.replace("/all-jobs/", "")
        const selectedProject = projects?.find(({ id }) => projectID === id)
        if (selectedProject) {
            setCurrentProject(selectedProject)

            // make the new contract sum and new finish date the project's finish date and contract sum if it exists
            const { new_contract_sum, new_finish_date } = selectedProject

            if (new_contract_sum && new_finish_date && new_contract_sum !== projectSumAndDate.projectContractSum && new_finish_date !== projectSumAndDate.projectFinishDate) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectContractSum: new_contract_sum,
                    projectFinishDate: new_finish_date,
                }))
            } else if (new_contract_sum && new_contract_sum !== projectSumAndDate.projectContractSum) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectContractSum: new_contract_sum
                }))
            } else if (new_finish_date && new_finish_date !== projectSumAndDate.projectFinishDate) {
                setProjectSumAndDate(prevState => ({
                    ...prevState,
                    projectFinishDate: new_finish_date
                }))
            }
        }
    }, [projects, pathname, setProjectSumAndDate, projectSumAndDate.projectContractSum, projectSumAndDate.projectFinishDate])

    useEffect(() => {
        if (currentProject.new_contract_sum || currentProject.new_finish_date || currentProject.latest_client_payment) {
            setUpdate(true)
        }
    }, [currentProject]);

    return (
        <>
            <LoadJobModal currentProject={currentProject} />
            <EditJobModal currentProject={currentProject} />
            <header>
                <h2 className="m-4 text-center font-Poppins text-2xl font-bold uppercase text-primary">
                    {currentProject.name}
                    <span className="m-1 text-center font-Raleway text-xl font-bold uppercase text-primary-content/50">({currentProject.location})</span>
                </h2>
            </header>

            {update && <UpdateNotification />}
            <section className="flex flex-col items-start justify-between p-4 font-Raleway font-medium text-primary-content/75 md:flex-row">
                <section className="mb-6 mr-1 w-11/12 rounded-md border-4 border-base-300 p-6 pb-10 shadow-md shadow-base-300" >
                    <Progress progress={currentProject.progress} />
                    <Image className="mt-4 max-h-96 w-full object-cover" priority quality={100} width={800} height={500} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-site-picture/${replaceSpacesWithHyphensAndLowerCase(currentProject.name)}`} alt="Picture of site" />
                    <span className="mb-6 mt-1 text-center text-sm font-medium text-info">(picture of site)</span>
                    <p className="my-3 font-Roboto text-lg uppercase"><span className="m-1 block font-Raleway text-sm text-secondary-content/70">Project Contract Sum:</span>₦{addCommasToMoney(projectSumAndDate.projectContractSum)} - ({numberToWords(projectSumAndDate.projectContractSum)} Naira)</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Balance Due to Contractor:</span>₦{addCommasToMoney((projectSumAndDate.projectContractSum - currentProject.initial_advance_payment))}</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Initial Advance Payment:</span>₦{addCommasToMoney(currentProject.initial_advance_payment)} - ({numberToWords(currentProject.initial_advance_payment)} Naira)</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Total contract payments:</span>₦0 Naira</p>
                    <p className="font-Roboto text-lg uppercase"><span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">Expenditure:</span>₦0 Naira</p>
                </section>
                <section className="ml-1 w-11/12 rounded-md border-4 border-base-300 p-4 pb-5 shadow-md shadow-base-300">
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-center text-sm text-secondary-content/70">Project Type:</span>{currentProject.type}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Start Date:</span>{currentProject.start_date}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Estimated Finish Date:</span>{projectSumAndDate.projectFinishDate}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Duration:</span>{getWeeksBetween(currentProject.start_date, projectSumAndDate.projectFinishDate)}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase md:block"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Duration to Project Completion:</span>{getRemainingTime(currentProject.start_date, projectSumAndDate.projectFinishDate)}</p>
                    <p className="mb-3 font-Roboto text-lg uppercase"><span className="m-1 font-Raleway text-sm text-secondary-content/70">Project Lapse Time:</span>{getLapseTime(currentProject.start_date, projectSumAndDate.projectFinishDate)}</p>
                    <Divider sx={{ my: 3 }} />
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-sm text-secondary-content/70">Client Name:</span>{currentProject.client_name}</p>
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-sm text-secondary-content/70">Client Email:</span> {currentProject.client_email}</p>
                    <p className="mb-3 text-lg uppercase"><span className="m-1 text-sm text-secondary-content/70">Client Tel:</span> {currentProject.client_phone}</p>
                    <h3 className="mx-auto my-5 max-w-full overflow-auto rounded-md bg-primary/20 p-4 text-lg underline-offset-8"><div className="m-1 text-sm uppercase text-info underline-offset-8">Project Description:</div>{addNewLineBeforeHyphen(currentProject.project_description)}</h3>
                    <HorizontalLine />
                    <button onClick={() => window.load_job_modal.showModal()} className="btn btn-success m-1 block w-full">
                        Load this project onto the app
                    </button>
                    <button onClick={() => window.edit_job_modal.showModal()} className="btn btn-warning m-1 w-full">
                        Update this project
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
