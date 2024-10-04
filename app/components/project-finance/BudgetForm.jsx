import { useState, useContext } from 'react'
import { DakiyStore } from '@/context/context'
import { setBudget } from './supabaseTables' // Adjust the import path as necessary

const categories = ['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others']

function BudgetForm() {
    const { setBudgets, project } = useContext(DakiyStore)
    const [modifiedBudgets, setModifiedBudgets] = useState({})
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleBudgetChange = (category, value) => {
        // Convert category to lowercase for the modifiedBudgets state
        const lowerCaseCategory = category.toLowerCase()
        setModifiedBudgets(prev => ({ ...prev, [lowerCaseCategory]: value }))
    }

    const validateForm = () => {
        const validationErrors = {}
        const { Labor, Material, Equipment, Subcontractor, Others } = modifiedBudgets

        // Check if all fields are filled and valid
        if (Labor == null || Labor < 0) validationErrors.Labor = 'Labor budget must be greater than or equal to zero'
        if (Material == null || Material < 0) validationErrors.Material = 'Material budget must be greater than or equal to zero'
        if (Equipment == null || Equipment < 0) validationErrors.Equipment = 'Equipment budget must be greater than or equal to zero'
        if (Subcontractor == null || Subcontractor < 0) validationErrors.Subcontractor = 'Subcontractor budget must be greater than or equal to zero'
        if (Others == null || Others < 0) validationErrors.Others = 'Others budget must be greater than or equal to zero'

        // Ensure all fields are filled
        if (!Labor && Labor !== 0) validationErrors.Labor = 'Labor budget is required'
        if (!Material && Material !== 0) validationErrors.Material = 'Material budget is required'
        if (!Equipment && Equipment !== 0) validationErrors.Equipment = 'Equipment budget is required'
        if (!Subcontractor && Subcontractor !== 0) validationErrors.Subcontractor = 'Subcontractor budget is required'
        if (!Others && Others !== 0) validationErrors.Others = 'Others budget is required'

        return validationErrors
    }

    const handleSubmitBudgets = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const validationErrors = validateForm()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setIsLoading(false)
            return
        }

        const error = await setBudget(modifiedBudgets, project.id)
        if (error) {
            alert(`${error.message} Try Again!`)
        } else {
            setBudgets(prev => ({ ...prev, ...modifiedBudgets }))
            alert('Budgets successfully added')
            setModifiedBudgets({})
        }
        setIsLoading(false)
    }

    const isSubmitEnabled = () => {
        return Object.values(modifiedBudgets).every(value => value >= 0) // Ensure all fields are filled
    }

    return (
        <form onSubmit={handleSubmitBudgets}>
            {categories.map((category) => (
                <div key={category} className="my-2">
                    <label className="mr-2 block">{category}:
                        <input
                            name={category}
                            type="number"
                            placeholder="Budget Amount"
                            className="input input-bordered my-2 w-full font-Roboto"
                            onChange={(e) => handleBudgetChange(category, parseFloat(e.target.value))}
                        />
                    </label>
                    {errors[category] && <div className="text-xs font-semibold capitalize text-error">{errors[category]}</div>}
                </div>
            ))}
            <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={!isSubmitEnabled() || isLoading}
            >
                {isLoading ? <span className="loading loading-dots loading-lg"></span> : 'Submit Budgets'}
            </button>
        </form>
    )
}

export default BudgetForm
