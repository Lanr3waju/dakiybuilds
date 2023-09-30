function FinanceBar({ finance, progress }) {
  let FinanceBarColor = 'progress-error'

  if (finance < progress) {
    FinanceBarColor = 'progress-success'
  } else if (finance === progress) {
    FinanceBarColor = 'progress-warning'
  }

  return (
    <>
      <h2 className="mt-2 font-Poppins font-medium">
        You have spent {finance}% of the cost sum
      </h2>
      <progress
        className={`progress ${FinanceBarColor} h-3 w-full`}
        value={finance}
        max="100"
      ></progress>
    </>
  )
}

export default FinanceBar
