'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getUser from "../utils/getUser"

export const organizationTable = async (name, email, tel, staffs) => {
    const supabase = createServerComponentClient({ cookies })
    const user = await getUser()
    const { error } = await supabase
        .from('organizations')
        .insert([
            { name: name, email: email, phone: tel, number_of_staffs: staffs, user_id: user.id },
        ])
        .select()
    return error
}

export const profileTable = async (firstName, lastName, profession, tel) => {
    const supabase = createServerComponentClient({ cookies })
    const fullName = `${firstName} ${lastName}`
    const user = await getUser()
    const { error } = await supabase
        .from('profiles')
        .insert([
            { id: user.id, full_name: fullName, profession: profession, tel: tel },
        ])
        .select()
    return error
}


