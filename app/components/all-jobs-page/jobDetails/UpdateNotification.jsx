function UpdateNotification() {
    return (
        <section className="p-4 border-4 border-warning flex md:flex-row flex-col md:justify-evenly md:items-center rounded-lg m-3 cursor-pointer">
            <div role="alert" className="alert shadow-lg alert-warning text-warning-content animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">Progress Updates!</h3>
                    <div className="text-xs">Progress updates have been recorded on this project, please click ME to view the updates</div>
                </div>
            </div>
        </section>

    )
}

export default UpdateNotification
