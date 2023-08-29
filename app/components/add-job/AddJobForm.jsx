'use client'
import React, { useRef, useState } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import Link from 'next/link'
import SuccessModal from './SuccessModal'
import { validateForm } from './validateForm'

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
        projectDescription: ''
    }

    const [jobData, setJobData] = useState(initialJobData)
    const [errors, setErrors] = useState({})
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
    };

    const jobTypes = ['construction', 'demolition', 'renovation', 'maintenance']

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setErrors({})
        setJobData({
            ...jobData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = validateForm(jobData)
        if (Object.keys(newErrors).length === 0) {
            console.log('Job data submitted:', jobData)
            window.job_addition_modal.showModal()
            setJobData(initialJobData)
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
        <section className='p-6'>
            <SuccessModal />
            <h2 className="text-xl font-bold uppercase text-primary-content/75">Add Job</h2>
            <HorizontalLine />
            <form className='mx-auto my-10 flex w-5/6 flex-col rounded-lg bg-base-200 p-10 shadow-md shadow-base-300'>
                <Link className='btn btn-error ml-auto w-1/5 text-lg font-semibold uppercase' href="/all-jobs">Close Form</Link>

                {Object.keys(refs).map(field => (
                    <React.Fragment key={field}>
                        {field === 'sitePicture' ? 'Site Picture (If available)' : field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        {field === 'jobType' ? (
                            <select
                                ref={refs[field]}
                                className='select select-bordered select-primary mb-3 w-full max-w-md font-Roboto'
                                id={field}
                                name={field}
                                value={jobData[field]}
                                onChange={handleInputChange}
                            >
                                <option disabled selected value="">Select Job Type</option>
                                {jobTypes.map(type => (
                                    <option className='capitalize' key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                    ref={refs[field]}
                                    className={` mb-2 font-Roboto ${field === 'sitePicture' ? 'file-input file-input-bordered file-input-primary w-full max-w-md' : 'input input-bordered input-primary'}`}
                                    type={field === 'clientEmail' ? 'email' : field === 'clientTelephone' ? 'tel' : field === 'contractSum' ? 'number' : field === 'agreedStartDate' || field === 'estimatedFinishDate' ? 'date' : 'text'}
                                    id={field}
                                    name={field}
                                    value={jobData[field]}
                                    onChange={handleInputChange}
                                    {...(field === 'sitePicture' ? { type: 'file' } : null)} // Set type to 'file' for sitePicture
                                />
                        )}
                        {errors[field] && <p className="mb-5 text-error">{errors[field]}</p>}
                    </React.Fragment>
                ))}

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Add Job
                </button>
            </form>
        </section>
    )

}

export default AddJobForm
