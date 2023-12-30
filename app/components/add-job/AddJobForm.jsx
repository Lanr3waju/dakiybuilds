'use client'
import React, { useContext, useRef, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import Link from 'next/link'
import SuccessModal from './SuccessModal'
import { validateForm } from './validateForm'
import { projectsTable } from './supabase-tables'
import { DakiyStore } from '@/context/context'
import { handleFileUpload } from './FileUploader'

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

  const [jobData, setJobData] = useState(initialJobData)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { setProjects, projects } = useContext(DakiyStore)


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

  const jobTypes = ['construction', 'demolition', 'renovation', 'maintenance']

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setErrors({})
    setJobData({
      ...jobData,
      [name]: value,
    })
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
        setJobData(initialJobData)
        window.job_addition_modal.showModal()
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
      <h2 className="text-primary-warning font-bold">
        Kindly fill the information with great care as it will not be modifiable after this step!
      </h2>
      <h3 className='mt-1 text-sm font-medium italic text-warning'>Kindly note that the contract sum is valued in Nigerian Naira! ₦</h3>
      <form onSubmit={handleSubmission} className="mx-auto mb-10 mt-5 flex w-5/6 flex-col rounded-lg bg-base-200 p-10 shadow-md shadow-base-300">
        <Link
          className="btn btn-error mb-3 ml-auto w-full text-3xl md:max-w-fit"
          href="/dakiyboard"
        >
          X
        </Link>
        {/* File Upload */}
        <section>
          <p className='text-sm font-medium'>Upload site picture; if available <span className='text-warning'> (900kb maximum image size ) please wait till you get an alert &apos;File uploaded successfully&apos; before leaving page.</span></p>
          <input disabled={!jobData.jobName || !jobData.jobLocation} className='file-input file-input-bordered file-input-primary mb-1 w-full max-w-md' type="file" onChange={async (event) => await handleFileUpload(event, jobData.jobName)} />
          <p className='m-1 rounded-md bg-error p-2 text-xs text-error-content'>Please note that you have to add job name and location below before you can upload site picture</p>
        </section>

        {Object.keys(refs).map((field) => (
          <React.Fragment key={field}>
            {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
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
            ) :
              field === 'projectDescription' ? (
                <textarea
                  id={field}
                  name={field}
                  value={jobData[field]}
                  onChange={handleInputChange}
                  ref={refs[field]}
                  className="textarea textarea-primary textarea-lg w-full p-1 text-sm tracking-widest"
                  placeholder="Enter project description">
                </textarea>)
                :
                (
                  <input
                    ref={refs[field]}
                    className='input input-bordered input-primary my-2 font-Roboto'
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
                )}
            {errors[field] && (
              <p className="mb-5 text-error">{errors[field]}</p>
            )}
          </React.Fragment>
        ))}
        <button
          className="btn btn-primary mt-4"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Add Job"}
        </button>
      </form>
    </section>
  )
}

export default AddJobForm
