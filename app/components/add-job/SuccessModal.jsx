'use client'

function SuccessModal() {
  return (
    <>
      <dialog
        id="job_addition_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold text-success">
            Job Added Successfully! 🎊
          </h3>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default SuccessModal
