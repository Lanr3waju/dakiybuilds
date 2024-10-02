import { useState, useEffect } from "react";

function FinanceBar({ expenditure = 0, contractSum = 0 }) {
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')
  const [progressBarColor, setProgressBarColor] = useState('progress-error')
  const [textColor, setTextColor] = useState('text-error');

  useEffect(() => {
    let newProgress = 0
    let newProgressText = ''
    let newProgressBarColor = 'progress-error'
    let newTextColor = 'text-error'

    // Ensure expenditure and contractSum are numbers
    const validExpenditure = parseFloat(expenditure) || 0
    const validContractSum = parseFloat(contractSum) || 0;

    // Calculate progress
    if (validExpenditure > validContractSum && validContractSum !== 0) {
      newProgress = 100 // Max out the progress when contractSum is exceeded
      newProgressText = `You have spent ${Math.round((validExpenditure / validContractSum) * 100) - 100}% more than your contract sum`
    } else if (validContractSum === 0) {
      newProgressText = 'No contract sum set'
      newTextColor = 'text-error'
      newProgress = 0;
    } else {
      newProgress = Math.round((validExpenditure / validContractSum) * 100)
      newProgressText = `You have spent ${newProgress}% of your contract sum`;
    }

    // Determine color based on progress
    if (newProgress >= 0 && newProgress < 30) {
      newProgressBarColor = 'progress-success'
      newTextColor = 'text-success';
    } else if (newProgress >= 30 && newProgress <= 70) {
      newProgressBarColor = 'progress-warning'
      newTextColor = 'text-warning';
    } else if (newProgress > 70) {
      newProgressBarColor = 'progress-error'
      newTextColor = 'text-error';
    }

    // Batch the updates to avoid multiple re-renders
    setProgress(newProgress)
    setProgressText(newProgressText)
    setProgressBarColor(newProgressBarColor)
    setTextColor(newTextColor)
  }, [expenditure, contractSum]);

  return (
    <>
      <h2 className={`ml-auto text-right font-Roboto text-xs ${textColor}`}>
        {progressText}
      </h2>
      <progress
        className={`progress font-Roboto ${progressBarColor} h-2 w-full`}
        value={progress}
        max="100"
      ></progress>
    </>
  )
}

export default FinanceBar
