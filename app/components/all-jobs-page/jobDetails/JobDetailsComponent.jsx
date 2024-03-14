'use client'
import Image from 'next/image'
import { DakiyStore } from '@/context/context'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import Progress from '../../utils/Progress'
import Divider from '@mui/material/Divider'
import addCommasToMoney from '../../utils/addCommasToNos'
import numberToWords from '../../utils/numberToWords'
import replaceSpacesWithHyphensAndLowerCase from '../../utils/replaceSpacesWithHyphens'
import HorizontalLine from '../../utils/HorizontalLine'
import LoadJobModal from './modals/LoadJobModal'
import DeleteJobState from './DeleteJobState'
import {
  getLapseTime,
  getRemainingTime,
  getWeeksBetween,
} from '../../add-job/calculateProjectDuration'
import { addNewLineBeforeHyphen } from '../../utils/formatProjectDescription'
import UpdateNotification from './jobUpdates/UpdateNotification'
import { getProjectsPlus } from './supabaseTables'
import EditJobState from './EditJobState'

function JobDetailsComponent() {
  const pathname = usePathname()
  const { projects, projectSumAndDate, setCurrentProjectId, project } =
    useContext(DakiyStore)
  const [currentProject, setCurrentProject] = useState({})
  const [deleteState, setDeleteState] = useState(false)
  const [editState, setEditState] = useState(false)
  const [update, setUpdate] = useState(false)
  const [contractPayments, setContractPayments] = useState(0)
  const [pictureSrc, setPictureSrc] = useState('')

  const getProjectUpdates = async (id, initial_advance_payment) => {
    const results = await getProjectsPlus(id)
    let totalContractPayments = 0
    if (results) {
      results.forEach(({ subsequent_payments }) => {
        if (subsequent_payments) {
          totalContractPayments += Number(subsequent_payments)
        }
      })
      setContractPayments(
        Number(totalContractPayments) + Number(initial_advance_payment)
      )
    }
  }

  useEffect(() => {
    // Create the URL based on the currentProject name
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/project-site-picture/${replaceSpacesWithHyphensAndLowerCase(
        currentProject.name
      )}`

    // Fetch the image to see if it exists
    fetch(url)
      .then((response) => {
        if (response.ok) {
          setPictureSrc(url) // Set the image URL if it exists
        } else {
          // Set a fallback image if it doesn't exist
          setPictureSrc('/logo.png') // Update with your actual fallback image path
        }
      })
      .catch(() => {
        // Set a fallback image in case of an error
        setPictureSrc('/logo.png') // Update with your actual fallback image path
      })
  }, [currentProject.name])

  useEffect(() => {
    const projectID = pathname.replace('/all-jobs/', '')
    setCurrentProjectId(projectID)
    const selectedProject = projects?.find(({ id }) => projectID === id)
    if (selectedProject) {
      setCurrentProject(selectedProject)
      getProjectUpdates(
        selectedProject.id,
        selectedProject.initial_advance_payment
      )
    }
  }, [pathname, projects, setCurrentProjectId, project])

  useEffect(() => {
    if (
      currentProject.new_contract_sum ||
      currentProject.new_finish_date ||
      currentProject.latest_client_payment
    ) {
      setUpdate(true)
    }
  }, [currentProject])

  return (
    <>
      <LoadJobModal currentProject={currentProject} />
      {editState ? (
        <EditJobState
          currentProject={currentProject}
          contractPayments={contractPayments}
          setEditState={setEditState}
        />
      ) : (
        <>
          <header>
            <h2 className="m-4 mt-6 text-center font-Poppins text-2xl font-bold uppercase text-primary">
              {currentProject.name}
              <span className="m-1 text-center font-Raleway text-xl font-bold uppercase text-primary-content/50">
                ({currentProject.location})
              </span>
            </h2>
          </header>

          {update && <UpdateNotification projectID={currentProject.id} />}
          <section className="flex flex-col items-start justify-between p-4 font-Raleway font-medium text-primary-content/75 md:flex-row">
            <section className="mb-6 mr-1 w-11/12 rounded-md border-4 border-base-300 p-6 pb-10 shadow-md shadow-base-300">
              <Progress progress={currentProject.progress} />
              <Image
                className="mt-4 h-auto w-full object-cover"
                priority
                quality={100}
                width={800}
                height={500}
                src={pictureSrc ? pictureSrc : '/logo.png'}
                alt="Picture of site"
              />
              <span className="mb-6 mt-1 text-center text-sm font-medium text-info">
                (picture of site)
              </span>
              <p className="my-3 font-Roboto text-lg uppercase">
                <span className="m-1 block font-Raleway text-sm text-secondary-content/70">
                  Project Contract Sum:
                </span>
                ₦{addCommasToMoney(projectSumAndDate.projectContractSum)} - (
                {numberToWords(projectSumAndDate.projectContractSum)} Naira)
              </p>
              <p className="font-Roboto text-lg uppercase">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Balance Due to Contractor:
                </span>
                ₦
                {addCommasToMoney(
                  projectSumAndDate.projectContractSum - contractPayments
                )}
              </p>
              <p className="font-Roboto text-lg uppercase">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Initial Advance Payment:
                </span>
                ₦{addCommasToMoney(currentProject.initial_advance_payment)}
              </p>
              <p className="font-Roboto text-lg uppercase">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Total contract payments:
                </span>
                ₦ {addCommasToMoney(contractPayments)} Naira
              </p>
              <p className="font-Roboto text-lg uppercase">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Expenditure:
                </span>
                ₦0 Naira
              </p>
            </section>
            <section className="ml-1 w-11/12 rounded-md border-4 border-base-300 p-4 pb-5 shadow-md shadow-base-300">
              <p className="mb-3 text-lg uppercase">
                <span className="m-1 text-center font-Roboto text-sm text-secondary-content/70">
                  Project Type:
                </span>
                {currentProject.type}
              </p>
              <p className="mb-3 font-Roboto text-lg uppercase">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                  Project Start Date:
                </span>
                {currentProject.start_date}
              </p>
              <p className="mb-3 font-Roboto text-lg uppercase">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                  Project Estimated Finish Date:
                </span>
                {projectSumAndDate.projectFinishDate}
              </p>
              <p className="mb-3 font-Roboto text-lg uppercase">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                  Project Duration:
                </span>
                {getWeeksBetween(
                  currentProject.start_date,
                  projectSumAndDate.projectFinishDate
                )}
              </p>
              <p className="mb-3 font-Roboto text-lg uppercase md:block">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                  Duration to Project Completion:
                </span>
                {getRemainingTime(
                  currentProject.start_date,
                  projectSumAndDate.projectFinishDate
                )}
              </p>
              <p className="mb-3 font-Roboto text-lg uppercase">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                  Project Lapse Time:
                </span>
                {getLapseTime(
                  currentProject.start_date,
                  projectSumAndDate.projectFinishDate
                )}
              </p>
              <Divider sx={{ my: 3 }} />
              <p className="mb-3 font-Roboto text-lg font-bold uppercase tracking-wider">
                <span className="m-1 text-sm text-secondary-content/70">
                  Client Name:
                </span>
                {currentProject.client_name}
              </p>
              <p className="mb-3 font-Roboto text-lg font-semibold uppercase">
                <span className="m-1 text-sm text-secondary-content/70">
                  Client Email:
                </span>{' '}
                {currentProject.client_email}
              </p>
              <p className="mb-3 font-Roboto text-lg font-semibold uppercase">
                <span className="m-1 text-sm text-secondary-content/70">
                  Client Tel:
                </span>{' '}
                {currentProject.client_phone}
              </p>
              <h3 className="mx-auto my-5 max-w-full overflow-auto rounded-md bg-primary/20 p-4 text-lg underline-offset-8">
                <div className="m-1 text-sm uppercase text-info underline-offset-8">
                  Project Description:
                </div>
                {addNewLineBeforeHyphen(currentProject.project_description)}
              </h3>
              <HorizontalLine />
              <button
                onClick={() => window.load_job_modal.showModal()}
                className="btn btn-success m-1 block w-full"
              >
                Load this project onto the app
              </button>
              <button
                onClick={() => setEditState(true)}
                className="btn btn-warning m-1 w-full"
              >
                Update this project
              </button>
              {deleteState ? (
                <DeleteJobState
                  currentProject={currentProject}
                  setDeleteState={setDeleteState}
                />
              ) : (
                <button
                  onClick={() => setDeleteState(true)}
                      className="btn btn-error m-1 w-full cursor-not-allowed"
                      disabled
                >
                  Delete project
                </button>
              )}
            </section>
          </section>
        </>
      )}
    </>
  )
}

export default JobDetailsComponent
