import { createClient } from '@supabase/supabase-js'
import replaceSpacesWithHyphensAndLowerCase from '../utils/replaceSpacesWithHyphens'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)



export const handleFileUpload = async (event, fileName) => {
    const file = event.target.files[0]
    if (file) {
        // Upload the file to Supabase storage without specifying the file path
        await uploadToSupabase(file, fileName)
    }
}

const uploadToSupabase = async (file, fileName) => {
    const pictureName = replaceSpacesWithHyphensAndLowerCase(fileName)
    const { data, error } = await supabase.storage.from('project-site-picture').upload(pictureName, file) // Using file.name as the file path

    if (error) {
        alert('Error uploading file:', error.message)
    } else {
        alert('File uploaded successfully:', data)
    }
}
