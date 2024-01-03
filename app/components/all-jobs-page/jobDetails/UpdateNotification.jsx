function UpdateNotification() {
    return (
        <section className="p-4 border-4 border-warning flex md:flex-row flex-col md:justify-evenly md:items-center rounded-lg m-3">
            <p className="text-error bg-info/60 p-3 font-semibold font-Roboto rounded-md w-full md:w-3/4 animate-pulse">
                Updates has been made on this project, please click the button to view the updates
            </p>
            <button className="btn btn-success mt-2 md:m-0">Open Update Sheet</button>
        </section>

    )
}

export default UpdateNotification
