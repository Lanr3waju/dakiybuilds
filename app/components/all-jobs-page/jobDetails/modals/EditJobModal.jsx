'use client'
import EditJobState from "../EditJobState"

// Edit Job Modal
export default function EditJobModal({ currentProject }) {

    return (
        <>
            <dialog id="project_edit_successful" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="text-lg font-bold text-success">Project Updated Successfully</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <button>Close</button>
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
