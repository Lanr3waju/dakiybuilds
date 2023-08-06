function Progress() {
    return (
        <>
            <h2 className='font-Poppins text-lg font-medium'>Project is at 80% completion</h2>
            <progress className="progress progress-primary h-5 w-full" value="80" max="100"></progress>
        </>
    )
}

export default Progress
