import React from 'react'
import RequestDemoForm from './RequestDemoForm'

function RequestDemoModal() {
  return (
    <dialog
      id="request_demo_modal"
      className="modal modal-bottom rounded-lg bg-base-300/20 sm:modal-middle"
    >
      <div className="modal-box">
        <RequestDemoForm />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default RequestDemoModal
