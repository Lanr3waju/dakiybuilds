import FinanceBar from '../utils/FinanceBar'
import HorizontalLine from '../utils/HorizontalLine'
import Progress from '../utils/Progress'
import calculatePercentage from '../utils/calculatePercentage'
import Payments from './Payments'

function ProjectFinancePage() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold uppercase text-primary-focus">
        Finances
      </h2>
      <HorizontalLine />
      <section className="mx-auto my-8 rounded-lg border-2 border-accent-focus bg-accent/10 p-4">
        <Progress progress={55} />
        <div className="flex w-full justify-between font-Poppins text-sm font-semibold text-primary-content/70">
          <div
            className="tooltip tooltip-info tooltip-bottom z-50 cursor-pointer before:w-[5rem] before:content-[attr(data-tip)]"
            data-tip="Expended Costs"
          >
            11, 000, 000.00
          </div>
          <div
            className="tooltip tooltip-info tooltip-bottom z-50 cursor-pointer before:w-[5rem] before:content-[attr(data-tip)]"
            data-tip="Total Prime Cost"
          >
            25, 000, 000.00
          </div>
        </div>
        <FinanceBar
          progress={55}
          finance={calculatePercentage(11000000, 25000000)}
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
  )
}

export default ProjectFinancePage
