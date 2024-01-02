'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import replaceSpacesWithHyphensAndLowerCase from "../../utils/replaceSpacesWithHyphens"
import { supabaseStorage } from "../../add-job/FileUploader"

const supabase = createServerComponentClient({ cookies })

const deleteProjectTable = async (currentProject) => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', currentProject.id)

    if (error) {
        alert(error.message)
        return false
    } else {
        return true
    }
}

// This function updates the project table based on the new contract sum and new finish date
const updateProjectTable = async (newContractSum, newFinishDate, id) => {
    // Define the update object
    let updateObject = {}

    // If newContractSum is provided and newFinishDate is not, update new_contract_sum
    if (newContractSum && newFinishDate === '') {
        updateObject.new_contract_sum = newContractSum
    }
    // If newFinishDate is provided and newContractSum is not, update new_finish_date
    else if (newFinishDate && newContractSum === '') {
        updateObject.new_finish_date = newFinishDate
    }
    // If both are provided, update both
    else {
        updateObject.new_contract_sum = newContractSum
        updateObject.new_finish_date = newFinishDate
    }

    // Perform the update operation
    const { error } = await supabase
        .from('projects')
        .update(updateObject)
        .eq('id', id)
        .select()

    // If there's an error, return it
    if (error) {
        return error
    } else {
        return true
    }
}


const deleteSitePicture = async (currentProject) => {
    const { error } = await supabaseStorage.storage.from('project-site-picture').remove(replaceSpacesWithHyphensAndLowerCase(currentProject.name))

    if (error) {
        return error
    }
    return true
}

export const deleteProject = async (currentProject) => {
    const deleteProjectTableResult = await deleteProjectTable(currentProject)
    const deleteSitePictureResult = await deleteSitePicture(currentProject)

    if (deleteProjectTableResult && deleteSitePictureResult) {
        return true
    } else {
        return false
    }
}

export const insertProjectPlusTable = async ({ newFinishDate, newContractSum, subsequentPayments, description }, { id }) => {
    const updateProjectTableResult = await updateProjectTable(newContractSum, newFinishDate, id)

    if (updateProjectTableResult === true) {
        const { error } = await supabase
            .from('projects_plus')
            .insert([
                {
                    project_id: id,
                    new_finish_date: newFinishDate,
                    new_contract_sum: newContractSum,
                    subsequent_payments: subsequentPayments,
                    description: description
                }
            ]).select()

        if (error) {
            return error
        }
    } else {
        return updateProjectTableResult
    }
}
