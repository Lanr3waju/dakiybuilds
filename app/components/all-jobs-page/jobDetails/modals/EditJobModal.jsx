'use client'

import { DakiyStore } from "@/context/context"
import { useContext } from "react"

// Edit Job Modal
export default function EditJobModal({ currentProject }) {
    const { setProject } = useContext(DakiyStore)

    const handleLoadProject = () => {
        setProject(currentProject)
        document.getElementById('project_edit_successful').showModal()
    }

    return (
        <>
            <dialog id="project_edit_successful" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="text-lg font-bold text-success">Project Deleted Successfully</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="edit_job_modal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="text-lg font-bold text-success">
                        Are you sure you want to edit this project?
                    </h3>
                    <div className="flex w-full items-center justify-center">
                        <button onClick={handleLoadProject} className="btn btn-error btn-lg m-2" >Yes</button>
                        <button className="btn btn-success btn-lg m-2">No</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}
