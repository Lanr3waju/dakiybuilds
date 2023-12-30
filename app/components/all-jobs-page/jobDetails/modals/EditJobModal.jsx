'use client'

// import { DakiyStore } from "@/context/context"
// import { useContext } from "react"
import EditJobState from "../EditJobState"

// Edit Job Modal
export default function EditJobModal({ currentProject }) {

    // const handleLoadProject = () => {
    //     setProject(currentProject)
    //     document.getElementById('project_edit_successful').showModal()
    // }

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
                    <EditJobState currentProject={currentProject} />
                </form>
            </dialog>
        </>
    )
}
