'use client'
import { useContext } from 'react'
import Link from 'next/link'
import FinanceBar from '../utils/FinanceBar'
import HorizontalLine from '../utils/HorizontalLine'
import Payments from './Payments'
import { DakiyStore } from '@/context/context'
import addCommasToMoney from '../utils/addCommasToNos'
import ExpenditureRegistrationModal from './ExpenditureRegistrationModal'
import BudgetRegistrationModal from './BudgettingRegistrationModal'
import BudgetComponent from './BudgetComponent'

function ProjectFinancePage() {
  const { loading, project, workingProjectSumAndDate, totalBudget, totalExpenditure } = useContext(DakiyStore)

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4 text-lg">Fetching your project documents, please hold on...</p>
      </div>
    )
  }

  return Object.keys(project).length > 0 ? (
    <div className="p-4">
      {totalBudget > workingProjectSumAndDate?.workingProjectContractSum && (
        <div className="alert alert-warning m-2 font-Roboto text-xs">
          Warning! Your budget exceeds the contract sum by ₦{addCommasToMoney(totalBudget - workingProjectSumAndDate?.workingProjectContractSum)} naira.
        </div>
      )}
      {totalExpenditure > workingProjectSumAndDate?.workingProjectContractSum && (
        <div className="alert alert-warning m-2 font-Roboto text-xs">
          Warning! Your expenditure exceeds the contract sum by ₦{addCommasToMoney(totalExpenditure - workingProjectSumAndDate?.workingProjectContractSum)} naira.
        </div>
      )}
      <h2 className="font-semibold capitalize text-primary">Finances</h2>
      <HorizontalLine />
      <section className="mx-auto my-8 rounded-lg border-2 border-accent bg-accent/10 p-4">
        <ExpenditureRegistrationModal />
        <BudgetRegistrationModal />
        <FinanceBar
          expenditure={totalExpenditure}
          contractSum={workingProjectSumAndDate?.workingProjectContractSum}
        />
        <div className="flex w-full justify-between font-Poppins text-sm font-semibold text-primary-content/70">
          <div
            className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer before:w-[5rem] before:content-[attr(data-tip)]"
            data-tip="Expended Costs"
          >
            ₦{addCommasToMoney(totalExpenditure)}
          </div>
          <div
            className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer before:w-[5rem] before:content-[attr(data-tip)]"
            data-tip="Total Contract Sum"
          >
            ₦
            {addCommasToMoney(
              workingProjectSumAndDate?.workingProjectContractSum
            )}
          </div>
        </div>
        <div className='flex justify-between'>
          <button className="btn btn-primary btn-sm mt-4 text-xs" onClick={() => document.getElementById('payment_form').showModal()}>Register Expenditure</button>
          <button className="btn btn-success btn-sm mt-4 text-xs" disabled={totalBudget > 1} onClick={() => document.getElementById('budget_form').showModal()}>Set Budget</button>
        </div>
      </section>
      <HorizontalLine />

      {/* Import and use the BudgetingComponent */}
      <BudgetComponent workingProjectSumAndDate={workingProjectSumAndDate} />

      <section className="my-8">
        <h2 className="font-semibold capitalize text-primary-content/75">
          Expenditure Sheet
        </h2>
        <Payments />
      </section>
    </div>
  ) : (
    <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
      Add and Select a Project{' '}
      <Link className="link link-info" href="/all-jobs">
        Here
      </Link>{' '}
      to access the Project&apos;s Finances
    </h1>
  )
}

export default ProjectFinancePage
