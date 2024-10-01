import { LineChart } from "@mui/x-charts/LineChart"

export default function BudgetExpenditureChart({ budgets, expenditures }) {
    // Extract expenditure by category (sum of all expenditures per category)
    const expenditureByCategory = expenditures.reduce((acc, exp) => {
        const category = exp.category
        const amount = parseFloat(exp.amount || 0)

        if (!acc[category]) {
            acc[category] = 0
        }
        acc[category] += amount

        return acc
    }, {})

    // Extract budget by category
    const budgetByCategory = {
        Labor: parseFloat(budgets.Labor || 0),
        Material: parseFloat(budgets.Material || 0),
        Equipment: parseFloat(budgets.Equipment || 0),
        Subcontractor: parseFloat(budgets.Subcontractor || 0),
        Others: parseFloat(budgets.Others || 0),
    }

    // Set up the x-axis categories
    const categories = ['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others']

    // Prepare data for the chart
    const expenditureData = categories.map((category) => expenditureByCategory[category] || 0)
    const budgetData = categories.map((category) => budgetByCategory[category])

    return (
        <section className='my-2 rounded-lg bg-base-100 p-2 shadow-md'>
            <h2 className='font-Roboto text-sm font-medium text-primary-content'>Expenditure / Budget</h2>
            <LineChart className='h-60 w-full md:h-80'
                series={[
                    { data: expenditureData, label: 'Expenditure' },
                    { data: budgetData, label: 'Budget' },
                ]}
                xAxis={[{ scaleType: 'point', data: categories }]} // Categories as labels
            />
        </section>
    )
}
