import { createClient } from '@supabase/supabase-js'
import replaceSpacesWithHyphensAndLowerCase from '../utils/replaceSpacesWithHyphens'

export const supabaseStorage = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Ensure the file is validated and ready to upload
export const handleFileUpload = async (event, fileName) => {
    const file = event.target.files[0]
    if (file) {
        // Check if file size exceeds 1MB
        if (file.size > 1 * 1024 * 1024) {
            alert('File size exceeds 1MB, upload another file')
            return false
        }

        // Perform the upload to Supabase
        try {
            const res = await uploadToSupabase(file, fileName)
            return res
        } catch (error) {
            return false
        }
    }
}

// Upload function with logging and upsert enabled
const uploadToSupabase = async (file, fileName) => {
    const documentName = replaceSpacesWithHyphensAndLowerCase(fileName)
    console.log('Uploading file with name:', documentName)

    const { error } = await supabaseStorage.storage
        .from('project-documents')
        .upload(documentName, file)

    if (error) {
        alert('Error uploading file:', error)
        return false
    } else {
        return true
    }
}

