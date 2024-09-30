import { useState, useEffect } from "react"

function BudgetBar({ expenditure, budget }) {
    const [progress, setProgress] = useState(0)
    const [progressText, setProgressText] = useState('')
    const [progressBarColor, setProgressBarColor] = useState('progress-error')
    const [textColor, setTextColor] = useState('text-error')

    useEffect(() => {
        let newProgress = 0
        let newProgressText = ''
        let newProgressBarColor = 'progress-error'
        let newTextColor = 'text-error'

        // Calculate progress
        if (expenditure > budget && budget !== 0) {
            newProgress = 100 // Max out the progress when budget is exceeded
            newProgressText = `You have spent ${Math.round((expenditure / budget) * 100) - 100}% more than your budget`
        } else if (budget === 0) {
            newProgressText = 'No budget set'
            newTextColor = 'text-error'
            newProgress = 0
        } else {
            newProgress = Math.round((expenditure / budget) * 100)
            newProgressText = `You have spent ${newProgress}% of your budget`
        }

        // Determine color based on progress
        if (newProgress >= 1 && newProgress < 30) {
            newProgressBarColor = 'bg-transparent text-success'
            newTextColor = 'text-success'
        } else if (newProgress >= 30 && newProgress <= 70) {
            newProgressBarColor = 'bg-transparent text-warning'
            newTextColor = 'text-warning'
        } else if (newProgress > 70) {
            newProgressBarColor = 'bg-transparent text-error'
            newTextColor = 'text-error'
        }

        // Batch the updates to avoid multiple re-renders
        setProgress(newProgress)
        setProgressText(newProgressText)
        setProgressBarColor(newProgressBarColor)
        setTextColor(newTextColor)
    }, [expenditure, budget])

    return (
        <>
            <h2 className={`ml-auto text-right font-Roboto text-xs ${textColor}`}>
                {progressText}
            </h2>
            <div
                className={`radial-progress font-Roboto ${progressBarColor}`}
                style={{ "--value": progress }}
                role="progressbar">
                {progress}%
            </div>
        </>
    )
}

export default BudgetBar
