'use client'
import Image from 'next/image'
import { DakiyStore } from '@/context/context'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
// import Progress from '../../utils/Progress'
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
  const { projects, projectSumAndDate, setCurrentProjectId, project, totalBudget, totalExpenditure } =
    useContext(DakiyStore)
  const [currentProject, setCurrentProject] = useState({})
  const [deleteState, setDeleteState] = useState(false)
  const [editState, setEditState] = useState(false)
  const [update, setUpdate] = useState(false)
  const [contractPayments, setContractPayments] = useState(0)
  const [pictureSrc, setPictureSrc] = useState('')
  const [loading, setLoading] = useState(true)

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
    if (currentProject.name) {
      const formattedName = replaceSpacesWithHyphensAndLowerCase(currentProject.name)
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-site-picture/${formattedName}`

      // Fetch image or use fallback
      fetch(url)
        .then((response) => {
          if (response.ok && response.headers.get('content-type').includes('image')) {
            setPictureSrc(url)
          } else {
            setPictureSrc("https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png")
          }
        })
        .catch(() => {
          setPictureSrc("https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png")
        })
    } else {
      setPictureSrc("https://res.cloudinary.com/dbzorthz8/image/upload/v1710414091/logo_qbxief.png") // Use fallback if the project name is missing
    }
  }, [currentProject.name])


  useEffect(() => {
    const projectID = pathname.replace('/all-jobs/', '')
    setCurrentProjectId(projectID)
    const selectedProject = projects?.find(({ id }) => projectID === id)
    if (selectedProject) {
      setCurrentProject(selectedProject)
      setLoading(false)
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

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4 text-lg">Fetching your project documents, please hold on...</p>
      </div>
    )
  }

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
            <section className="flex flex-col items-start justify-between p-4 font-Raleway text-primary-content/75 md:flex-row">
              <section className="mb-2 mr-1 w-11/12 rounded-md p-4 shadow-lg shadow-base-300">
                {/* <Progress progress={currentProject.progress} /> */}
              <Image
                  className="h-auto w-full object-contain"
                  priority
                  quality={100}
                  width={800}
                  height={500}
                  src={pictureSrc}
                  alt="Picture of site"
                />
                <span className="mb-6 mt-1 text-center text-xs font-medium text-info">
                (picture of site)
              </span>
                <p className="my-3 font-Roboto">
                <span className="m-1 block font-Raleway text-sm text-secondary-content/70">
                  Project Contract Sum:
                </span>
                ₦{addCommasToMoney(projectSumAndDate.projectContractSum)} - (
                {numberToWords(projectSumAndDate.projectContractSum)} Naira)
              </p>
                <p className="font-Roboto">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Balance Due to Contractor:
                </span>
                ₦
                {addCommasToMoney(
                  projectSumAndDate.projectContractSum - contractPayments
                )}
              </p>
                <p className="font-Roboto">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Initial Advance Payment:
                </span>
                ₦{addCommasToMoney(currentProject.initial_advance_payment)}
              </p>
                <p className="font-Roboto">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                  Total contract payments:
                </span>
                ₦ {addCommasToMoney(contractPayments)} Naira
              </p>
                <p className="font-Roboto">
                <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                    Budget:
                  </span>
                  ₦ {addCommasToMoney(totalBudget)} Naira
                </p>
                <p className="font-Roboto">
                  <span className="m-1 mt-4 block font-Raleway text-sm text-secondary-content/70">
                    Expenditure:
                  </span>
                  ₦ {addCommasToMoney(totalExpenditure)} Naira
                </p>

            </section>
              <section className="ml-1 w-11/12 rounded-md p-2 shadow-lg shadow-base-300">
                <p className="mb-3 font-Roboto capitalize">
                  <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Project type:
                </span>
                {currentProject.type}
              </p>
                <p className="mb-3 font-Roboto">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Project start date:
                </span>
                {currentProject.start_date}
              </p>
                <p className="mb-3 font-Roboto">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Project estimated finish date:
                </span>
                {projectSumAndDate.projectFinishDate}
              </p>
                <p className="mb-3 font-Roboto">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Project duration:
                </span>
                {getWeeksBetween(
                  currentProject.start_date,
                  projectSumAndDate.projectFinishDate
                )}
              </p>
                <p className="mb-3 font-Roboto md:block">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Duration to project completion:
                </span>
                {getRemainingTime(
                  currentProject.start_date,
                  projectSumAndDate.projectFinishDate
                )}
              </p>
                <p className="mb-3 font-Roboto">
                <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Project lapse time:
                </span>
                  {getLapseTime(
                  projectSumAndDate.projectFinishDate
                )}
              </p>
              <Divider sx={{ my: 3 }} />
                <p className="mb-3 font-Roboto capitalize">
                  <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Client name:
                </span>
                {currentProject.client_name}
              </p>
                <p className="mb-3 font-Roboto capitalize">
                  <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Client email:
                </span>{' '}
                {currentProject.client_email}
              </p>
                <p className="mb-3 font-Roboto">
                  <span className="m-1 font-Raleway text-sm text-secondary-content/70">
                    Client tel:
                </span>{' '}
                {currentProject.client_phone}
              </p>
                <h3 className="mx-auto my-2 max-w-full overflow-auto rounded-md bg-primary/20 p-2 underline-offset-8">
                <div className="m-1 text-sm uppercase text-info underline-offset-8">
                    Project description:
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
                      className="btn btn-error m-1 w-full"
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
