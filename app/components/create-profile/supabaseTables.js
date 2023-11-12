'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient({ cookies })

export const organizationTable = async (name, email, tel, staffs) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
        .from('organizations')
        .insert([
            { name: name, email: email, phone: tel, number_of_staffs: staffs, user_id: user?.id },
        ])
        .select()
    return error
}

export const profileTable = async (firstName, lastName, profession, tel) => {
    const fullName = `${firstName} ${lastName}`
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
        .from('profiles')
        .insert([
            { id: user?.id, full_name: fullName, profession: profession, tel: tel },
        ])
        .select()
    return error
}


