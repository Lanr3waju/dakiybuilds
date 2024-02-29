'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import Link from 'next/link'
import SuccessModal from './SuccessModal'
import { validateForm } from './validateForm'
import { projectsTable } from './supabase-tables'
import { DakiyStore } from '@/context/context'
import { handleFileUpload } from './FileUploader'
import { DoneOutline } from '@mui/icons-material'

const AddJobForm = () => {
  const initialJobData = {
    jobName: '',
    jobLocation: '',
    jobType: '',
    clientName: '',
    clientEmail: '',
    clientTelephone: '',
    contractSum: '',
    initialAdvancePayment: '',
    agreedStartDate: '',
    estimatedFinishDate: '',
    projectDescription: '',
  }

  const containerRef = useRef(null)

  const refs = {
    jobName: useRef(null),
    jobLocation: useRef(null),
    jobType: useRef(null),
    clientName: useRef(null),
    clientEmail: useRef(null),
    clientTelephone: useRef(null),
    contractSum: useRef(null),
    initialAdvancePayment: useRef(null),
    agreedStartDate: useRef(null),
    estimatedFinishDate: useRef(null),
    projectDescription: useRef(null),
  }

  const [jobData, setJobData] = useState(initialJobData)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { setProjects, projects, setProjectSumAndDate } = useContext(DakiyStore)
  const [picture, setPicture] = useState(false)

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault() // Prevent the default scrolling behavior
    }

    // Get all number input elements and attach the wheel event listener
    const numberInputs = containerRef.current.querySelectorAll(
      'input[type="number"]'
    )
    numberInputs.forEach((input) => {
      input.addEventListener('wheel', handleWheel)
    })

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('wheel', handleWheel)
      })
    }
  }, []) // Empty dependency array ensures the effect runs once when the component mounts

  const jobTypes = ['construction', 'demolition', 'renovation', 'maintenance']

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setErrors({})
    setJobData({
      ...jobData,
      [name]: value,
    })
  }

  const handleFileChange = async (event) => {
    setIsLoading(true)
    const result = await handleFileUpload(event, jobData.jobName)
    if (result !== '') {
      setIsLoading(false)
    }
    if (result === true) {
      setIsLoading(false)
      setPicture(true)
    }
  }

  const handleSubmission = async (event) => {
    event.preventDefault()
    const newErrors = validateForm(jobData)
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      const error = projectsTable(jobData)
      const errorMessage = (await error)?.message
      if (!errorMessage) {
        setProjects([...projects, jobData])
        setIsLoading(false)
        setProjectSumAndDate((prevState) => ({
          ...prevState,
          projectContractSum: jobData.contractSum,
          projectFinishDate: jobData.estimatedFinishDate,
        }))
        window.job_addition_modal.showModal()
        setPicture(false)
        setJobData(initialJobData)
      } else {
        setIsLoading(false)
        alert(errorMessage)
      }
    } else {
      // Scroll to the first input element with an error
      for (const field in newErrors) {
        if (newErrors[field]) {
          refs[field].current.scrollIntoView({ behavior: 'smooth' })
          break
        }
      }
      setErrors(newErrors)
    }
  }

  return (
    <section className="p-6">
      <SuccessModal />
      <h2 className="text-xl font-bold uppercase text-primary-content/75">
        Add Job
      </h2>
      <HorizontalLine />
      <h2 className="font-bold text-primary">
        Kindly fill the information with great care as it will not be modifiable
        after this step!
      </h2>
      <h3 className="mt-1 text-sm font-medium italic text-error">
        Kindly note that the contract sum is valued in Nigerian Naira! ₦
      </h3>
      <form
        ref={containerRef}
        onSubmit={handleSubmission}
        className="mx-auto mb-10 mt-5 flex w-5/6 flex-col rounded-lg bg-base-200 p-10 shadow-md shadow-base-300"
      >
        <Link
          className="btn btn-error mb-3 ml-auto w-full text-3xl md:max-w-fit"
          href="/dakiyboard"
        >
          X
        </Link>
        {/* File Upload */}
        <section>
          <p className="text-sm font-medium">
            Upload site picture; if available{' '}
            <span className="text-error">
              {' '}
              (900kb maximum image size ) please wait till you get an alert
              &apos;File uploaded successfully&apos; before leaving page.
            </span>
          </p>
          <div className="flex items-center">
            <input
              disabled={!jobData.jobName || !jobData.jobLocation}
              className="file-input file-input-bordered file-input-primary mb-1 w-full max-w-md"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
            {isLoading && (
              <span className="loading loading-spinner loading-md ml-4 text-primary"></span>
            )}
            {picture && <DoneOutline className="ml-4 text-green-500" />}
          </div>
          <p className="m-1 rounded-md bg-error p-2 text-xs text-white">
            Please note that you have to add job name and location below before
            you can upload site picture
          </p>
        </section>

        {Object.keys(refs).map((field) => (
          <React.Fragment key={field}>
            {field
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())}
            {field === 'jobType' ? (
              <select
                ref={refs[field]}
                className="select select-bordered select-primary mb-3 w-full max-w-md font-Roboto capitalize"
                id={field}
                name={field}
                value={jobData[field]}
                onChange={handleInputChange}
              >
                <option disabled selected value="">
                  Select Job Type
                </option>
                {jobTypes.map((type) => (
                  <option className="capitalize" key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : field === 'projectDescription' ? (
              <textarea
                id={field}
                name={field}
                value={jobData[field]}
                onChange={handleInputChange}
                ref={refs[field]}
                className="textarea textarea-primary textarea-lg w-full p-3 text-sm tracking-widest"
                placeholder="Enter project description"
              ></textarea>
            ) : (
              <div className="flex w-full items-start justify-around">
                <input
                  ref={refs[field]}
                  className="input input-bordered input-primary mb-6 w-full font-Roboto"
                  type={
                    field === 'clientEmail'
                      ? 'email'
                      : field === 'clientTelephone'
                      ? 'tel'
                      : field === 'contractSum' ||
                        field === 'initialAdvancePayment'
                      ? 'number'
                      : field === 'agreedStartDate' ||
                        field === 'estimatedFinishDate'
                      ? 'date'
                      : 'text'
                  }
                  id={field}
                  name={field}
                  value={jobData[field]}
                  onChange={handleInputChange}
                />
                <span className="ml-1 mt-2 max-w-fit font-Poppins text-2xl font-bold text-secondary">
                  {field === 'contractSum' || field === 'initialAdvancePayment'
                    ? '₦'
                    : ''}
                </span>
              </div>
            )}
            {errors[field] && (
              <p className="mb-5 font-Roboto text-error">{errors[field]}</p>
            )}
          </React.Fragment>
        ))}
        <button className="btn btn-primary mt-4" disabled={isLoading}>
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : picture ? (
            'Add Job'
          ) : (
            "You've not uploaded site picture, Submit Anyways?"
          )}
        </button>
      </form>
    </section>
  )
}

export default AddJobForm
