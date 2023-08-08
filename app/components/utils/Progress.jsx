function Progress({ progress }) {
    let progressBarColor = 'progress-success'

    if (progress >= 0 && progress < 30) {
        progressBarColor = 'progress-error'
    } else if (progress >= 30 && progress <= 55) {
        progressBarColor = 'progress-warning'
    }

    return (
        <>
            <h2 className='mt-2 font-Poppins font-medium'>Project is at {progress}% completion</h2>
            <progress className={`progress ${progressBarColor} h-3 w-full`} value={progress} max="100"></progress>
        </>
    )
}

export default Progress
