// Edit Job Modal
export default function EditJobModal() {
  return (
    <dialog id="project_edit_successful" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="text-lg font-bold text-success">
          Project Updated Successfully
        </h3>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
