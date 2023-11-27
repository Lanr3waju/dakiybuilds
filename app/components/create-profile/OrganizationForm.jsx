import React, { useRef, useState } from "react"
import { initialOrganizationFormData } from "./initialFormData"
import HorizontalLine from "../utils/HorizontalLine"
import { renderInputField } from "./RenderFields"
import { organizationTable } from "./supabaseTables"



function OrganizationForm({ setActivateUserForm, activateUserForm }) {
    const [organizationFormData, setOrganizationFormData] = useState(initialOrganizationFormData)
    const [formErrors, setFormErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const inputRefs = {
        organizationName: useRef(),
        organizationEmail: useRef(),
        organizationTel: useRef(),
        staffs: useRef(),
    }

    const validateForm = () => {
        const errors = {}

        // Validate organizationName
        if (!organizationFormData.organizationName) {
            errors.organizationName = "Organization name is required"
        }

        // Validate organizationEmail
        if (!organizationFormData.organizationEmail) {
            errors.organizationEmail = "Organization email is required"
        } else if (!/^\S+@\S+\.\S+$/.test(organizationFormData.organizationEmail)) {
            errors.organizationEmail = "Invalid email format"
        }

        // Validate organizationTel
        if (!organizationFormData.organizationTel) {
            errors.organizationTel = "Organization tel is required"
        } else if (!/^\d{10}$/.test(organizationFormData.organizationTel)) {
            errors.organizationTel = "Invalid telephone format, should be 10 digits e.g. (8051551565)"
        }

        // Validate staffs
        if (!organizationFormData.staffs) {
            errors.staffs = "Number of staffs is required"
        } else if (!/^\d+$/.test(organizationFormData.staffs)) {
            errors.staffs = "Please enter a valid number "
        }

        setFormErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setOrganizationFormData({
            ...organizationFormData,
            [name]: value,
        })
    }

    const handleSubmission = async (event) => {
        const { organizationEmail, organizationName, organizationTel, staffs } = organizationFormData
        event.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            const error = await organizationTable(organizationName, organizationEmail, organizationTel, staffs)
            const errorMessage = error?.message
            if (!errorMessage) {
                setActivateUserForm(true)
                alert('Organization Data successfully saved, Please fill in the next form with your profile data!')
            } else {
                setIsLoading(false)
                alert(errorMessage + "   " + 'Try Again!')
            }
        }
    }

    return (
        <section className={`${activateUserForm ? "hidden" : "block"}`}>
            <form
                className="mx-auto my-4 flex w-11/12 flex-col rounded-lg bg-base-200 p-8 font-Raleway text-xs font-semibold uppercase text-primary-content/50 shadow-lg shadow-base-300 md:text-lg md:font-bold"
                noValidate
                onSubmit={handleSubmission}
            >
                <h2 className="my-3 font-bold text-primary-focus md:text-lg">Organization Details (Step 1 of 2)</h2>
                <HorizontalLine />

                {renderInputField(
                    "organizationName",
                    "Organization name",
                    "text",
                    organizationFormData,
                    handleInputChange,
                    inputRefs.organizationName,
                    formErrors.organizationName
                )}

                {renderInputField(
                    "organizationEmail",
                    "Organization email",
                    "email",
                    organizationFormData,
                    handleInputChange,
                    inputRefs.organizationEmail,
                    formErrors.organizationEmail
                )}

                {renderInputField(
                    "organizationTel",
                    "Organization tel",
                    "tel",
                    organizationFormData,
                    handleInputChange,
                    inputRefs.organizationTel,
                    formErrors.organizationTel
                )}

                {renderInputField(
                    "staffs",
                    "Number of staffs",
                    "number",
                    organizationFormData,
                    handleInputChange,
                    inputRefs.staffs,
                    formErrors.staffs
                )}

                <button className="btn btn-success w-full" disabled={isLoading} type="submit">
                    {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Save Data"}</button>
            </form>
        </section>
    )
}

export default OrganizationForm
