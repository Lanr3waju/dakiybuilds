import addCommasToMoney from '../utils/addCommasToNos'
import { DakiyStore } from '@/context/context'
import BudgetBar from './BudgetBar'
import HorizontalLine from '../utils/HorizontalLine'
import { useContext } from 'react'

const categories = ['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others']
function BudgetComponent() {
    const { totalBudget, localExpenditures, budgets } = useContext(DakiyStore)
    return (
        <div className='p-2'>
            <h3 className="my-4 font-semibold capitalize text-primary">Current Budgets</h3>
            <ul className='flex flex-col place-items-end md:flex-row md:flex-wrap'>
                {categories.map((category) => (
                    <li className='m-1 mr-auto text-sm md:w-5/12' key={category}>
                        <span className='text-sm font-medium text-secondary-content/65'>Budget for {category}:</span>
                        <span className='font-Roboto font-medium text-secondary-content/70'>  ₦{addCommasToMoney(budgets[category] || 0)}</span>
                        <BudgetBar expenditure={localExpenditures[category] || 0} budget={budgets[category] || 0} />
                        <div className='ml-auto text-right font-Roboto text-sm text-secondary-content/70'>{category} Expenditure: ₦{addCommasToMoney(localExpenditures[category] || 0)}</div>
                        <div><HorizontalLine /></div>
                    </li>
                ))}
                <h3 className='mx-auto text-center font-medium text-primary-content/70 md:mb-5 md:text-lg'>
                    <span>Total Budget:  </span>
                    <span className='font-Roboto'>₦{addCommasToMoney(totalBudget)}</span>
                </h3>
            </ul>
        </div>
    )
}

export default BudgetComponent
