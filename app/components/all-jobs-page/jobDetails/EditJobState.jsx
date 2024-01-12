'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import HorizontalLine from '../../utils/HorizontalLine'
import { updateProjectTable } from './supabaseTables'
import { insertProjectPlusTable } from '@/context/supabaseTables'
import { DakiyStore } from '@/context/context'
import EditJobModal from './modals/EditJobModal'

function EditJobState({ currentProject, contractPayments, setEditState }) {
    const initialFormData = {
        newFinishDate: '',
        newContractSum: '',
        subsequentPayments: '',
        description: ''
    }

    const containerRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState(initialFormData)

    const { setUpdateFormData } = useContext(DakiyStore)

    const [error, setError] = useState('All fields are empty')

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault() // Prevent the default scrolling behavior
        }

        // Get all number input elements and attach the wheel event listener
        const numberInputs = containerRef.current.querySelectorAll('input[type="number"]')
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

    const validateForm = () => {
        if (!formData.subsequentPayments && !formData.newContractSum && !formData.newFinishDate) {
            setError('Please fill in any of updated fields.')
            return false
        }

        if (formData.newFinishDate !== '' && formData.newFinishDate < currentProject.start_date) {
            setError('The new finish date cannot be less than project start date.')
            return false
        }

        if (formData.description.length < 25) {
            setError('The description of the event should be at least 25 characters.')
            return false
        }

        // If all conditions met, proceed with form submission
        setError('')
        return true

    }

    const handleChange = async (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateForm()
        await updateProjectTable(formData, currentProject)
    }

    const handleSubmit = async (e) => {
        validateForm()
        e.preventDefault()
        // Check conditions and update isValid and error state
        if (validateForm()) {
            setIsLoading(true)
            setUpdateFormData(formData)
            const insertProjectPlusTableResult = await insertProjectPlusTable(formData, currentProject)
            await updateProjectTable(formData, currentProject)
            if (insertProjectPlusTableResult !== true) {
                alert(insertProjectPlusTableResult.message)
                setIsLoading(false)
            } else if (insertProjectPlusTableResult === true) {
                window.project_edit_successful.showModal()
                setIsLoading(false)
                setFormData(initialFormData)
            }
        }
    }

    return (
        <>
            <EditJobModal />
            <div className="mx-auto my-4 flex w-3/4 max-w-fit flex-col rounded-xl border-4 border-base-300 bg-base-200 p-4 font-Roboto" ref={containerRef}>
                <h2 className="mb-1 flex items-center justify-between text-2xl font-semibold">Update Job Details <button onClick={() => setEditState(false)} className='btn btn-square btn-error text-lg'> X</button></h2>
            <HorizontalLine />
                <p className="my-4 w-full rounded-md bg-info p-4 font-medium text-info-content">
                This form serves to capture new data or events related to the project&apos;s progression, rather than modify existing information.
            </p>
                <label className='mb-2 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter new project finish date :
                <input
                    type="date"
                    name="newFinishDate"
                        value={formData.newFinishDate}
                    onChange={handleChange}
                    placeholder="Enter new finish date"
                        className="input input-bordered input-primary mb-6 block w-full"
                />
            </label>

                <label className='mb-2 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter new contract sum:
                <input
                    type="number"
                    name="newContractSum"
                        value={formData.newContractSum}
                    onChange={handleChange}
                    placeholder="Enter new contract sum"
                        className="input input-bordered input-primary mb-6 block w-full"
                        min={0}
                />
            </label>

                <label className='mb-2 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter subsequent payments made by client:
                <input
                    type="number"
                    name="subsequentPayments"
                        value={formData.subsequentPayments}
                    onChange={handleChange}
                    placeholder="Enter subsequent payments"
                        className="input input-bordered input-primary mb-6 block w-full"
                        min={0}
                        max={currentProject.contract_sum - contractPayments}
                />
            </label>

                <label className='mb-2 font-Roboto text-sm font-semibold tracking-widest text-primary-content/40'> Enter appropriate description:
                <textarea
                    name="description"
                        value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter descriptions for variations, payment, and/or changes"
                        className="textarea textarea-info mb-2 block w-full tracking-widest placeholder:font-Roboto"
                ></textarea>
            </label>

            {error && <p className="m-2 text-error">{error}</p>}
            <button
                type="button"
                    className='btn btn-secondary m-2 block w-full '
                onClick={handleSubmit}
                disabled={error !== '' || isLoading}
            >
                {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Submit"}
            </button>
        </div>
        </>
    )
}

export default EditJobState
