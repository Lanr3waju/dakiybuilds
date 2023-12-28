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

const deleteSitePicture = async (currentProject) => {
    const { error } = await supabaseStorage.storage.from('project-site-picture').remove(replaceSpacesWithHyphensAndLowerCase(currentProject.name))

    if (error) {
        alert(error.message)
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
