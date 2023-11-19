'use client'
import React, { useRef, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import Link from 'next/link'
import SuccessModal from './SuccessModal'
import { validateForm } from './validateForm'
import { projectsTable } from './supabase-tables'

const AddJobForm = () => {
  const initialJobData = {
    jobName: '',
    jobLocation: '',
    jobType: '',
    sitePicture: '',
    clientName: '',
    clientEmail: '',
    clientTelephone: '',
    contractSum: '',
    agreedStartDate: '',
    estimatedFinishDate: '',
    projectDescription: '',
  }

  const [jobData, setJobData] = useState(initialJobData)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const refs = {
    jobName: useRef(null),
    jobLocation: useRef(null),
    jobType: useRef(null),
    sitePicture: useRef(null),
    clientName: useRef(null),
    clientEmail: useRef(null),
    clientTelephone: useRef(null),
    contractSum: useRef(null),
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
        setIsLoading(false)
        window.job_addition_modal.showModal()
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
      <h3 className='text-warning font-medium text-sm italic mt-5'>Kindly note that the contract sum is valued in naira!</h3>
      <form onSubmit={handleSubmission} className="mx-auto mb-10 mt-5 flex w-5/6 flex-col rounded-lg bg-base-200 p-10 shadow-md shadow-base-300">
        <Link
          className="btn btn-error w-full mb-3"
          href="/all-jobs"
        >
          Close Form
        </Link>

        {Object.keys(refs).map((field) => (
          <React.Fragment key={field}>
            {field === 'sitePicture'
              ? 'Site Picture (If available)'
              : field
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
            ) : (
              <input
                ref={refs[field]}
                  className={` mb-2 font-Roboto ${field === 'sitePicture'
                    ? 'file-input file-input-bordered file-input-primary w-full max-w-md'
                    : 'input input-bordered input-primary'
                    }`}
                type={
                  field === 'clientEmail'
                    ? 'email'
                    : field === 'clientTelephone'
                      ? 'tel'
                      : field === 'contractSum'
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
                {...(field === 'sitePicture' ? { type: 'file' } : null)} // Set type to 'file' for sitePicture
              />
            )}
            {errors[field] && (
              <p className="mb-5 text-error">{errors[field]}</p>
            )}
          </React.Fragment>
        ))}

        <button
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Add Job"}
        </button>
      </form>
    </section>
  )
}

export default AddJobForm
