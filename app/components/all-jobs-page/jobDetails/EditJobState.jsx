'use client'
// function EditJobState() {
//     return (
//         <>
//             <h2>Edit Job</h2>
//             <section>
//                 <input type="text" placeholder="Enter new finish date" className="input input-bordered input-primary w-full max-w-md m-2" />
//                 <input type="text" placeholder="Enter new contract sum" className="input input-bordered input-primary w-full max-w-md m-2" />
//                 <input type="text" placeholder="Enter subsequent payments made" className="input input-bordered input-primary w-full max-w-md m-2" />
//                 <textarea className="textarea textarea-info tracking-widest w-full m-2  max-w-md" placeholder="Enter descriptions for variations, payment and/or changes to the finish date and/or contract sum"></textarea>
//                 <button className="btn btn-secondary w-full m-2 max-w-md" type="button">Submit</button>
//                 <button className="btn btn-error w-full max-w-md m-2">Cancel</button>
//             </section>
//             <p className="p-4 bg-info text-info-content font-medium rounded-md m-2 w-full max-w-md">This form exists to register data / events that that takes shape as the project progresses and not to modify any existing information on the project.</p>
//         </>
//     )
// }

// export default EditJobState

import { useState } from 'react'
import HorizontalLine from '../../utils/HorizontalLine'

function EditJobState() {
    const [formData, setFormData] = useState({
        newFinishDate: '',
        newContractSum: '',
        subsequentPayments: '',
        description: ''
    })

    const [error, setError] = useState('')

    const validateForm = () => {
        if (!formData.subsequentPayments && !formData.newContractSum && !formData.newFinishDate) {
            setError('Please fill in any of updated fields.')
            return false
        }

        if (formData.description.length < 50) {
            setError('The description of the event should be at least 50 characters.')
            return false
        }

        // If all conditions met, proceed with form submission
        setError('')
        return true

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Check conditions and update isValid and error state
        if (validateForm())
            console.log(formData)
    }

    return (
        <div className="font-Roboto">
            <h2 className="mb-1 text-2xl font-semibold">Update Job Details</h2>
            <p className='m-2 text-right font-medium text-warning'>Press `esc` to cancel</p>
            <HorizontalLine />
            <p className="mx-2 my-4 w-full max-w-md rounded-md bg-info p-4 font-medium text-info-content">
                This form serves to capture new data or events related to the project&apos;s progression, rather than modify existing information.
            </p>
            <input
                type="date"
                name="newFinishDate"
                value={formData.newFinishDate}
                onChange={handleChange}
                placeholder="Enter new finish date"
                className="input input-bordered input-primary m-2 w-full max-w-md"
            />
            <input
                type="number"
                name="newContractSum"
                value={formData.newContractSum}
                onChange={handleChange}
                placeholder="Enter new contract sum"
                className="input input-bordered input-primary m-2 w-full max-w-md"
            />
            <input
                type="number"
                name="subsequentPayments"
                value={formData.subsequentPayments}
                onChange={handleChange}
                placeholder="Enter subsequent payments made"
                className="input input-bordered input-primary m-2 w-full max-w-md"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter descriptions for variations, payment, and/or changes"
                className="textarea textarea-info m-2 w-full max-w-md  tracking-widest placeholder:font-Roboto"
            ></textarea>
            {error && <p className="m-2 text-error">{error}</p>}
            <button
                type="button"
                className='btn btn-secondary m-2 w-full max-w-md '
                onClick={handleSubmit}
                disabled={!formData.subsequentPayments && !formData.newContractSum && !formData.newFinishDate || formData.description.length < 50}
            >
                Submit
            </button>
        </div>
    )
}

export default EditJobState
