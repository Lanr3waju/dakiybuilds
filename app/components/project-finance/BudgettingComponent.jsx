'use client'
import { useState, useEffect } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import addCommasToMoney from '../utils/addCommasToNos'

function BudgetingComponent({ workingProjectSumAndDate }) {
    const [budgets, setBudgets] = useState({})
    const [modifiedBudgets, setModifiedBudgets] = useState({}) // Track only modified fields
    const [totalBudget, setTotalBudget] = useState(0)
    const [showBudgetForm, setShowBudgetForm] = useState(false)
    const categories = ['Labor', 'Materials', 'Equipment', 'Subcontractors', 'Others/Miscellaneous']

    // Handle input change and track modified fields
    const handleBudgetChange = (category, value) => {
        setModifiedBudgets(prev => ({ ...prev, [category]: value }))
    }

    // Calculate total budget dynamically as user changes input
    useEffect(() => {
        const total = Object.values({ ...budgets, ...modifiedBudgets }).reduce((sum, budget) => sum + (budget || 0), 0)
        setTotalBudget(total)
    }, [modifiedBudgets, budgets])

    // Update budgets state only for modified fields on submit
    const handleSubmitBudgets = async (e) => {
        e.preventDefault()
        setBudgets(prev => ({ ...prev, ...modifiedBudgets })) // Update budgets only for modified fields
        setModifiedBudgets({}) // Reset modified fields after submit
    }

    // Check if any field contains a positive number to enable the submit button
    const isSubmitEnabled = () => {
        return Object.values(modifiedBudgets).some(value => value > 0)
    }

    return (
        <section className="my-8">
            <h3 className="mt-4 font-semibold text-primary">Set Budgets</h3>
            <button
                className="btn btn-secondary mb-4"
                onClick={() => setShowBudgetForm(prev => !prev)}
            >
                {showBudgetForm ? 'Hide Budget Form' : 'Set Budget'}
            </button>

            {showBudgetForm && (
                <form onSubmit={handleSubmitBudgets}>
                    {categories.map((category) => (
                        <div key={category} className="flex justify-between my-2">
                            <label className="mr-2">{category}:</label>
                            <input
                                type="number"
                                placeholder="Budget Amount"
                                className="input input-bordered w-full max-w-xs font-Roboto"
                                onChange={(e) => handleBudgetChange(category, parseFloat(e.target.value))}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                        disabled={!isSubmitEnabled()} // Enable if at least one field is positive
                    >
                        Submit Budgets
                    </button>
                </form>
            )}

            {totalBudget > workingProjectSumAndDate?.workingProjectContractSum && (
                <div className="alert alert-error mt-4 font-Roboto">
                    Total budget exceeds the contract sum by ₦{addCommasToMoney(totalBudget - workingProjectSumAndDate?.workingProjectContractSum)}!
                </div>
            )}

            <h3 className="mt-4 font-semibold text-primary">Current Budgets</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category} className="flex justify-between">
                        <span>{category}:</span>
                        <span className='font-Roboto'>₦{addCommasToMoney(budgets[category] || 0)}</span>
                    </li>
                ))}
                <HorizontalLine />
                <h3 className='flex justify-between mt-4 font-semibold text-primary'>
                    <span>Total:</span>
                    <span className='font-Roboto'>₦{addCommasToMoney(totalBudget)}</span>
                </h3>
            </ul>
        </section>
    )
}

export default BudgetingComponent
