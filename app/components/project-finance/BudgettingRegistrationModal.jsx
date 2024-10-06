import BudgetForm from "./BudgetForm"

function BudgetRegistrationModal() {
    return (
        <dialog id="budget_form" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-primary-content/70">Budget Registration!</h3>
                <BudgetForm />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default BudgetRegistrationModal
