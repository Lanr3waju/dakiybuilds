'use client'
import { useContext } from 'react'
import Link from 'next/link'
import FinanceBar from '../utils/FinanceBar'
import HorizontalLine from '../utils/HorizontalLine'
import Progress from '../utils/Progress'
import calculatePercentage from '../utils/calculatePercentage'
import Payments from './Payments'
import { DakiyStore } from '@/context/context'
import addCommasToMoney from '../utils/addCommasToNos'

function ProjectFinancePage() {
  const { project, workingProjectSumAndDate } = useContext(DakiyStore)
  return (
    Object.keys(project).length > 0 ? (
      <div className="p-4">
        <h2 className="text-lg font-semibold uppercase text-primary">
          Finances
        </h2>
        <HorizontalLine />
        <section className="mx-auto my-8 rounded-lg border-2 border-accent bg-accent/10 p-4">
          <Progress progress={0} />
          <div className="flex w-full justify-between font-Poppins text-sm font-semibold text-primary-content/70">
            <div
              className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer before:w-[5rem] before:content-[attr(data-tip)]"
              data-tip="Expended Costs"
            >
              ₦ 0
            </div>
            <div
              className="tooltip tooltip-bottom tooltip-info z-50 cursor-pointer before:w-[5rem] before:content-[attr(data-tip)]"
              data-tip="Total Contract Sum"
            >
              ₦{addCommasToMoney(workingProjectSumAndDate?.workingProjectContractSum)}
            </div>
          </div>
          <FinanceBar
            progress={0}
            finance={calculatePercentage(0, workingProjectSumAndDate?.workingProjectContractSum)}
          />
          {/* TODO: The form should contain input for Proof of Payment & selection for payment type Cr or Dr */}
          <button className="btn btn-secondary mt-5 w-full md:w-1/4">
            register payment
          </button>
        </section>
        <HorizontalLine />
        <section className="my-8">
          <h2 className="font-semibold uppercase text-primary-content/75">
            Payments Sheet
          </h2>
          <Payments />
        </section>
      </div>
    ) : (
      <h1 className="m-7 rounded-lg border-2 border-error bg-error-content p-2 text-center text-lg font-bold uppercase text-error">
        Add and Select a Project <Link className="link link-info" href='/all-jobs'>Here</Link> to access the Project&apos;s Finances
      </h1>
    )
  )
}

export default ProjectFinancePage
