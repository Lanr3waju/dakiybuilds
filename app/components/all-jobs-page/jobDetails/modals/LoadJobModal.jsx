'use client'

import { DakiyStore } from '@/context/context'
import { updateCurrentProject } from '@/context/supabaseTables'
import { useContext } from 'react'

// Load Job Modal
export default function LoadJobModal({ currentProject }) {
  const { setProject } = useContext(DakiyStore)

  const handleLoadProject = async () => {
    // Update the current project in the database
    const updateError = await updateCurrentProject(currentProject.id)
    if (updateError) {
      console.error('Error updating current project to the DB:', updateError)
      // return // Optionally handle the error (e.g., show a notification)
    }

  // Set the project in state and show the modal
    setProject(currentProject)
    document.getElementById('project_load_successful').showModal()
  };

  return (
    <>
      <dialog id="project_load_successful" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold text-success">
            Project Load Successful ✅
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        id="load_job_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold text-success">
            Are you sure you want to load this project onto the app ?
          </h3>
          <div className="flex w-full items-center justify-center">
            <button
              onClick={handleLoadProject}
              className="btn btn-success btn-lg m-2"
            >
              Yes
            </button>
            <button className="btn btn-error btn-lg m-2">No</button>
          </div>
        </form>
      </dialog>
    </>
  )
}
