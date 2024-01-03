import { createClient } from '@supabase/supabase-js'
import replaceSpacesWithHyphensAndLowerCase from '../utils/replaceSpacesWithHyphens'

export const supabaseStorage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const handleFileUpload = async (event, fileName) => {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 1 * 1024 * 1024) {
            alert('File size exceeds 1MB, upload another picture')
            return false
        }
        await uploadToSupabase(file, fileName)
    }
}

const uploadToSupabase = async (file, fileName) => {
    const pictureName = replaceSpacesWithHyphensAndLowerCase(fileName)
    const { data, error } = await supabaseStorage.storage.from('project-site-picture').upload(pictureName, file) // Using file.name as the file path

    if (error) {
        alert('Picture with the same name already exists, try changing the name of the project')
        return false
    } else {
        alert('File uploaded successfully:', data)
        return true
    }
}
