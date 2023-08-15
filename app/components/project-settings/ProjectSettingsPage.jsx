import HorizontalLine from "../utils/HorizontalLine"
import EditableProjectForm from "./UpdateProjectInfo"

function ProjectSettingsPage() {
    return (
        <>
            <h1 className='font-medium uppercase text-primary md:text-lg'>Project Settings</h1>
            <HorizontalLine />
            <section className='bg-base-200/70 rounded-lg p-4 my-8'>
                <h2 className="font-semibold uppercase text-primary-content/75">Update Project Information</h2>
                <EditableProjectForm />
            </section>
            <HorizontalLine />
            <section className="mt-8">
                <h2 className="font-semibold uppercase text-primary-content/75">Advanced</h2>
                <section className="bg-warning/10 rounded-lg p-4 my-3 border-warning border-2 text-center">
                    <h3 className="font-semibold text-warning-content my-3">This button logs you out of all your projects.</h3>
                    <button className="btn btn-warning block w-full md:w-2/5 mb-3 mx-auto">Logout</button>
                </section>

                <section className="bg-error/10 rounded-lg p-4 my-3 border-error border-2 text-center">
                    <h3 className="font-semibold text-warning-content my-3">This button deletes the project and all the contained data from the database <span className="font-bold text-2xl text-error">‼</span></h3>
                    <button className="btn btn-error block w-full md:w-2/5 mb-3 mx-auto">Delete this project</button>
                </section>
            </section>
        </>
    )
}

export default ProjectSettingsPage
