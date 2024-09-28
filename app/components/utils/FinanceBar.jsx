function FinanceBar({ finance, progress }) {
  let FinanceBarColor = 'progress-error'

  const validFinance = isNaN(finance) ? 0 : finance;

  if (finance < progress) {
    FinanceBarColor = 'progress-success'
  } else if (finance === progress) {
    FinanceBarColor = 'progress-warning'
  }



  return (
    <>
      <h2 className="mt-4 font-Poppins font-medium">
        You have spent {validFinance}% of the cost sum
      </h2>
      <progress
        className={`progress ${FinanceBarColor} h-3 w-full`}
        value={validFinance}
        max="100"
      ></progress>
    </>
  )
}

export default FinanceBar
