import ExpenditureRegistrationForm from "./ExpenditureRegistrationForm"

function ExpenditureRegistrationModal() {
    return (
        <dialog id="payment_form" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-primary-content/70">Expenditure Registration!</h3>
                <ExpenditureRegistrationForm />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ExpenditureRegistrationModal
