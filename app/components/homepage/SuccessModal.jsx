'use client'
import { useRouter } from "next/navigation"

function SuccessModal() {
    const router = useRouter()
    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="text-lg font-bold text-success">Account Created Successfully! 🎊</h3>
                    <p className="py-4">Check your email to verify your account</p>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={router.push('/')}>Close</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

export default SuccessModal
