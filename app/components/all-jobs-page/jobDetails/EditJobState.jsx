'use client'

import { useContext, useState } from 'react'
import HorizontalLine from '../../utils/HorizontalLine'
import { insertProjectPlusTable } from './supabaseTables'
import { DakiyStore } from '@/context/context'

function EditJobState({ currentProject }) {
    const initialFormData = {
        newFinishDate: '',
        newContractSum: '',
        subsequentPayments: '',
        description: ''
    }

    const [isLoading, setIsLoading] = useState(false)

    const { updateFormData, setUpdateFormData } = useContext(DakiyStore)

    const [error, setError] = useState('All fields are empty')

    const validateForm = () => {
        if (!updateFormData.subsequentPayments && !updateFormData.newContractSum && !updateFormData.newFinishDate) {
            setError('Please fill in any of updated fields.')
            return false
        }

        if (updateFormData.newFinishDate !== '' && updateFormData.newFinishDate < currentProject.start_date) {
            setError('The new finish date cannot be less than project start date.')
            return false
        }

        if (updateFormData.description.length < 40) {
            setError('The description of the event should be at least 40 characters.')
            return false
        }

        // If all conditions met, proceed with form submission
        setError('')
        return true

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateForm()
    }

    const handleSubmit = async (e) => {
        validateForm()
        e.preventDefault()
        // Check conditions and update isValid and error state
        if (validateForm()) {
            setIsLoading(true)
            const error = await insertProjectPlusTable(updateFormData, currentProject)
            if (error) {
                alert(error.message)
                setIsLoading(false)
            } else {
                window.project_edit_successful.showModal()
                setIsLoading(false)
                setUpdateFormData(initialFormData)
            }
        }
    }

    return (
        <div className="font-Roboto">
            <h2 className="mb-1 flex items-center justify-between text-2xl font-semibold">Update Job Details <span className='text-sm font-medium text-warning'> Press `esc` to cancel</span></h2>
            <HorizontalLine />
            <p className=" mx-auto my-4 w-full max-w-md rounded-md bg-info p-4 font-medium text-info-content">
                This form serves to capture new data or events related to the project&apos;s progression, rather than modify existing information.
            </p>
            <label className='mb-4 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter new project finish date :
                <input
                    type="date"
                    name="newFinishDate"
                    value={updateFormData.newFinishDate}
                    onChange={handleChange}
                    placeholder="Enter new finish date"
                    className="input input-bordered input-primary mb-6 w-full max-w-md"
                />
            </label>

            <label className='mb-4 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter new contract sum:
                <input
                    type="number"
                    name="newContractSum"
                    value={updateFormData.newContractSum}
                    onChange={handleChange}
                    placeholder="Enter new contract sum"
                    className="input input-bordered input-primary mb-6 w-full max-w-md"
                />
            </label>

            <label className='mb-4 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter subsequent payments made by client:
                <input
                    type="number"
                    name="subsequentPayments"
                    value={updateFormData.subsequentPayments}
                    onChange={handleChange}
                    placeholder="Enter subsequent payments"
                    className="input input-bordered input-primary mb-6 w-full max-w-md"
                />
            </label>

            <label className='mb-4 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter appropriate description:
                <textarea
                    name="description"
                    value={updateFormData.description}
                    onChange={handleChange}
                    placeholder="Enter descriptions for variations, payment, and/or changes"
                    className="textarea textarea-info mb-4 w-full  max-w-md tracking-widest placeholder:font-Roboto"
                ></textarea>
            </label>

            {error && <p className="m-2 text-error">{error}</p>}
            <button
                type="button"
                className='btn btn-secondary m-2 w-full max-w-md '
                onClick={handleSubmit}
                disabled={error !== '' || isLoading}
            >
                {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Submit"}
            </button>
        </div>
    )
}

export default EditJobState
