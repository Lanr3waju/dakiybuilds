'use client'
import HorizontalLine from '../utils/HorizontalLine'
import EditableProjectForm from './UpdateProjectInfo'

function ProjectSettingsPage() {

  return (
    <>
      <h1 className="font-medium uppercase text-primary md:text-lg">
        Project Settings
      </h1>
      <HorizontalLine />
      <section className="my-8 rounded-lg bg-base-200/70 p-4">
        <h2 className="font-semibold uppercase text-primary-content/75">
          Update Project Information
        </h2>
        <EditableProjectForm />
      </section>
      <HorizontalLine />
      <section className="mt-8">
        <h2 className="font-semibold uppercase text-primary-content/75">
          Advanced
        </h2>
        <section className="my-3 rounded-lg border-2 border-warning bg-warning/10 p-4 text-center">
          <h3 className="my-3 font-semibold text-warning-content">
            This button logs you out of your organization.
          </h3>
          <form className="flex flex-col text-left" action="/auth/logout" method="post">
            <button className="btn btn-warning mx-auto mb-3 block w-full md:w-2/5">Sign Out</button>
          </form>
        </section>

        <section className="my-3 rounded-lg border-2 border-error bg-error/10 p-4 text-center">
          <h3 className="my-3 font-semibold text-warning-content">
            This button deletes the project and all the contained data from the
            database <span className="text-2xl font-bold text-error">‼</span>
          </h3>
          <button className="btn btn-error mx-auto mb-3 block w-full md:w-2/5">
            Delete this project
          </button>
        </section>
      </section>
    </>
  )
}

export default ProjectSettingsPage
