'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import replaceSpacesWithHyphensAndLowerCase from '../../utils/replaceSpacesWithHyphens'
import { supabaseStorage } from '../../add-job/FileUploader'

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
export const updateProjectTable = async (
  { newContractSum, newFinishDate, subsequentPayments },
  { id }
) => {
  // Initialize an empty object to store properties that need to be updated.
  let updateObject = {}

  // Check if 'newContractSum' exists and is truthy.
  if (newContractSum !== '') {
    // If 'newContractSum' is truthy, add it to the 'updateObject' with the key 'new_contract_sum'.
    updateObject = { ...updateObject, new_contract_sum: newContractSum }
  }

  // Check if 'newFinishDate' exists and is truthy.
  if (newFinishDate !== '') {
    // If 'newFinishDate' is truthy, add it to the 'updateObject' with the key 'new_finish_date'.
    updateObject = { ...updateObject, new_finish_date: newFinishDate }
  }

  // Check if 'subsequentPayments' exists and is truthy.
  if (subsequentPayments !== '') {
    // If 'subsequentPayments' is truthy, add it to the 'updateObject' with the key 'latest_client_payment'.
    updateObject = {
      ...updateObject,
      latest_client_payment: subsequentPayments,
    }
  }

  // The 'updateObject' will contain properties based on the conditions evaluated above.

  // Perform the update operation
  if (id) {
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
  } else {
    console.error('Wrong ID')
  }
}

const deleteSitePicture = async (currentProject) => {
  const { error } = await supabaseStorage.storage
    .from('project-site-picture')
    .remove(replaceSpacesWithHyphensAndLowerCase(currentProject.name))

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

export const getProjectsPlus = async (projectId) => {
  let { data: projectsPlus, error } = await supabase
    .from('projects_plus')
    .select('*')
    // Filters
    .eq('project_id', projectId)

  if (error) {
    console.error(error)
  } else {
    return projectsPlus
  }
}
