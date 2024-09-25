import { DakiyStore } from '@/context/context'
import { useContext, useState } from 'react'
import { registerExpenditure } from './supabaseTables';

const ExpenditureRegistrationForm = () => {
    const { project } = useContext(DakiyStore)
    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        description: '',
        beneficiary: '',
        evidence: null,
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFormData((prev) => ({ ...prev, evidence: file }))
    };

    const validateForm = () => {
        const validationErrors = {}
        const { amount, type, description, beneficiary } = formData;

        if (!amount) validationErrors.amount = 'Amount is required'
        else if (amount <= 0) validationErrors.amount = 'Amount must be greater than zero'
        else if (amount > 10000000) validationErrors.amount = 'Amount must be less than or equal to 10,000,000';

        if (!type) validationErrors.type = 'Type is required'
        if (!description) validationErrors.description = 'Description is required'
        else if (description.length > 50) validationErrors.description = 'Description must be 50 characters or less';

        if (!beneficiary) validationErrors.beneficiary = 'Beneficiary is required'
        else if (beneficiary.length > 25) validationErrors.beneficiary = 'Beneficiary must be 25 characters or less';

        // Uncomment if evidence is required
        // if (!formData.evidence) validationErrors.evidence = 'Evidence is required';

        return validationErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setIsLoading(false)
            return;
        }

        const error = await registerExpenditure(formData, project.id)
        if (error?.message) {
            alert(`${error.message} Try Again!`)
        } else {
            alert('Expenditure successfully added')
            setFormData({
                amount: '',
                type: '',
                description: '',
                beneficiary: '',
                evidence: null,
            })
            document.getElementById('payment_form').close() // Ensure this ID exists in your DOM
        }
        setIsLoading(false)
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    };

    return (
        <form className='font-Roboto' onSubmit={handleSubmit}>
            <div className='mt-6'>
                <label htmlFor="amount" className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40">Amount (₦)</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                />
                {errors.amount && <span className="text-xs font-semibold lowercase text-error">{errors.amount}</span>}
            </div>

            <div className='mt-6'>
                <label htmlFor="type" className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40">Type (CR-Credit / DR-Debit)</label>
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
                {errors.type && <span className="text-xs font-semibold lowercase text-error">{errors.type}</span>}
            </div>

            <div className='mt-6'>
                <label htmlFor="description" className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                />
                {errors.description && <span className="text-xs font-semibold lowercase text-error">{errors.description}</span>}
            </div>

            <div className='mt-6'>
                <label htmlFor="beneficiary" className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40">Beneficiary</label>
                <input
                    type="text"
                    id="beneficiary"
                    name="beneficiary"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    className="input input-bordered input-primary mb-1 block w-full"
                />
                {errors.beneficiary && <span className="text-xs font-semibold lowercase text-error">{errors.beneficiary}</span>}
            </div>

            <div className='mt-6'>
                <label htmlFor="evidence" className="mb-2 text-sm font-semibold tracking-widest text-primary-content/40">Evidence (Image)</label>
                <input
                    type="file"
                    id="evidence"
                    name="evidence"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-primary w-full"
                />
                {errors.evidence && <span className="text-xs font-semibold lowercase text-error">{errors.evidence}</span>}
            </div>

            <button className="btn btn-secondary mt-6 block w-full" disabled={isLoading} type="submit">
                {isLoading ? <span className="loading loading-dots loading-lg"></span> : 'Submit Expenditure'}
            </button>
        </form>
    )
};

export default ExpenditureRegistrationForm
