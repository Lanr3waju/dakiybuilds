import { useState, useEffect, useContext } from 'react'
import { DakiyStore } from '@/context/context'

const categories = ['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others']
function BudgetForm() {
    const { budgets, setTotalBudget, setBudgets } = useContext(DakiyStore)
    const [modifiedBudgets, setModifiedBudgets] = useState({})

    const handleBudgetChange = (category, value) => {
        setModifiedBudgets(prev => ({ ...prev, [category]: value }))
    }

    useEffect(() => {
        const total = Object.values({ ...budgets, ...modifiedBudgets }).reduce((sum, budget) => sum + (budget || 0), 0)
        setTotalBudget(total)
    }, [modifiedBudgets, budgets])

    const handleSubmitBudgets = (e) => {
        e.preventDefault()
        setBudgets(prev => ({ ...prev, ...modifiedBudgets }))
        setModifiedBudgets({})
    }

    const isSubmitEnabled = () => {
        return Object.values(modifiedBudgets).some(value => value > 0)
    }

    return (
        <form onSubmit={handleSubmitBudgets}>
            {categories.map((category) => (
                <div key={category} className="my-2 flex justify-between">
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
                disabled={!isSubmitEnabled()}
            >
                Submit Budgets
            </button>
        </form>
    )
}

export default BudgetForm
