import { useState, useEffect } from "react"

function BudgetBar({ expenditure, budget }) {
    const [progress, setProgress] = useState(0)
    const [progressText, setProgressText] = useState('')
    const [progressBarColor, setProgressBarColor] = useState('progress-error')

    useEffect(() => {
        let newProgress = 0
        let newProgressText = ''
        let newProgressBarColor = 'progress-error'

        // Calculate progress
        if (expenditure > budget && budget !== 0) {
            newProgressText = 'You have exceeded your budget'
            newProgress = 100 // Max out the progress when budget is exceeded
        } else if (budget === 0) {
            newProgressText = 'No budget set'
            newProgress = 0
        } else {
            newProgress = Math.round((expenditure / budget) * 100)
            newProgressText = `You have spent ${newProgress}% of your budget`
        }

        // Determine color based on progress
        if (newProgress >= 0 && newProgress < 30) {
            newProgressBarColor = 'progress-success'
        } else if (newProgress >= 30 && newProgress <= 70) {
            newProgressBarColor = 'progress-warning'
        } else if (newProgress > 70 && newProgress <= 100) {
            newProgressBarColor = 'progress-error'
        }

        // Batch the updates to avoid multiple re-renders
        setProgress(newProgress)
        setProgressText(newProgressText)
        setProgressBarColor(newProgressBarColor)
    }, [expenditure, budget])

    return (
        <>
            <h2 className="mt-2 font-Poppins font-medium">
                {progressText}
            </h2>
            <progress
                className={`progress ${progressBarColor} h-3 w-full`}
                value={progress}
                max="100"
            ></progress>
        </>
    )
}

export default BudgetBar
