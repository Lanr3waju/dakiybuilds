import { useEffect, useState, useContext } from 'react'
import { DakiyStore } from '@/context/context'
import addCommasToMoney from '../utils/addCommasToNos'
import extractDate from '../utils/extractDateFromTimestamp'

function Payments() {
  const { expenditures } = useContext(DakiyStore)
  const [localExpenditures, setLocalExpenditures] = useState([])

  useEffect(() => {
    expenditures && setLocalExpenditures(expenditures)
  }, [expenditures])

  return (
    <section className="mt-5">
      <div className="overflow-x-auto font-Roboto">
        <table className="table table-zebra table-xs border-4 border-secondary/50 py-2 md:table-sm">
          <thead className="bg-primary font-Poppins text-sm text-primary-content/75">
            <tr>
              <th>Amount (₦)</th>
              <th>Category</th>
              <th>Description</th>
              <th>Beneficiary</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {localExpenditures?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No current expenditures.</td>
              </tr>
            ) : (
                localExpenditures?.map(({ id, amount, category, description, beneficiary, created_at }) => (
                <tr className="transition-all hover:translate-y-1" key={id}>
                  <td>{addCommasToMoney(amount)}</td>
                  <td>{category}</td>
                  <td>{description}</td>
                  <td className="capitalize">{beneficiary}</td>
                  <td>{extractDate(created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Payments
