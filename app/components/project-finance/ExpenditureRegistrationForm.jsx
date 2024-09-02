import { useState } from 'react'

const ExpenditureRegistrationForm = () => {
    const [initialFormData] = useState({
        amount: '',
        type: '',
        description: '',
        beneficiary: '',
        evidence: null,
    })

    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        description: '',
        beneficiary: '',
        evidence: null,
    })
    const [errors, setErrors] = useState({})

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFormData((prevFormData) => ({
            ...prevFormData,
            evidence: file,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}

        if (!formData.amount) {
            validationErrors.amount = 'Amount is required'
        } else if (formData.amount <= 0) {
            validationErrors.amount = 'Amount must be greater than zero'
        } else if (formData.amount > 10000000) {
            validationErrors.amount = 'Amount must be less than or equal to 10,000,000'
        }

        if (!formData.type) {
            validationErrors.type = 'Type is required'
        }

        if (!formData.description) {
            validationErrors.description = 'Description is required'
        } else if (formData.description.length > 50) {
            validationErrors.description = 'Description must be 50 characters or less'
        }

        if (!formData.beneficiary) {
            validationErrors.beneficiary = 'Beneficiary is required'
        } else if (formData.beneficiary.length > 25) {
            validationErrors.beneficiary = 'Beneficiary must be 25 characters or less'
        }

        // Not yet implemented
        // if (!formData.evidence) {
        //     validationErrors.evidence = 'Evidence is required'
        // }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        alert(JSON.stringify(formData))
        setFormData(initialFormData)
        document.getElementById('payment_form').close()

        // Proceed with form submission if all validations pass
        // Submit the form data to the server or perform any other necessary actions
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    return (
        <form className='font-Roboto'>
            <div className='mt-6'>
                <label className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40" htmlFor="amount">Amount (₦)</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                />
                {errors.amount && <span className="text-error text-xs font-semibold lowercase ">{errors.amount}</span>}
            </div>

            <div className='mt-6'>
                <label className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40" htmlFor="type">Type (CR-Credit / DR-Debit)</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                >
                    <option value="">Select Type</option>
                    <option value="CR">CR</option>
                    <option value="DR">DR</option>
                </select>
                {errors.type && <span className="text-error text-xs font-semibold lowercase ">{errors.type}</span>}
            </div>

            <div className='mt-6'>
                <label className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40" htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                />
                {errors.description && <span className="text-error text-xs font-semibold lowercase ">{errors.description}</span>}
            </div>

            <div className='mt-6'>
                <label className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40" htmlFor="beneficiary">Beneficiary</label>
                <input
                    type="text"
                    id="beneficiary"
                    name="beneficiary"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                />
                {errors.beneficiary && <span className="text-error text-xs font-semibold lowercase ">{errors.beneficiary}</span>}
            </div>
            <div className='mt-6'>
                <label className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40" htmlFor="evidence">Evidence (Image)
                    <input
                        type="file"
                        id="evidence"
                        name="evidence"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full file-input-primary"
                    />
                    {errors.evidence && <span className="text-error text-xs font-semibold lowercase ">{errors.evidence}</span>}
                </label>
            </div>

            <button className="btn btn-secondary block w-full mt-6" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default ExpenditureRegistrationForm
