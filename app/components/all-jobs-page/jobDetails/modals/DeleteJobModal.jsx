'use client'
import { useRouter } from 'next/navigation'
import { deleteProject } from '../supabaseTables'
import { useContext } from 'react'
import { DakiyStore } from '@/context/context'

// Delete Job Modal
export default function DeleteJobModal({ currentProject, setDeleteState }) {
  const { setProjects, projects } = useContext(DakiyStore)
  const router = useRouter()

  const handleDeleteProject = async () => {
    const isDeleted = await deleteProject(currentProject)

    if (isDeleted) {
      // setDeleteState(false)
      // Create a new array by spreading the projects and excluding the object with the matching ID
      const updatedProjects = projects.filter(
        (project) => project.id !== currentProject.id
      )
      // Update the projects context state using the spread operator
      setProjects([...updatedProjects])
      document.getElementById('project_delete_successful').showModal()
      router.push('/all-jobs')
    }
  }

  return (
    <>
      <dialog id="project_delete_successful" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold text-success">
            Project Deleted Successfully
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        id="delete_job_modal"
        className="modal modal-bottom bg-error-content/70 sm:modal-middle"
      >
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold text-error">
            Are you sure you want to delete this project?
          </h3>
          <div className="flex w-full items-center justify-center">
            <button
              onClick={handleDeleteProject}
              className="btn btn-outline btn-error m-2 px-6"
            >
              Yes
            </button>
            <button
              className="btn btn-outline btn-success m-2 px-6"
              onClick={() => setDeleteState(false)}
            >
              No
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
