import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getUser from "./getUser"

export default async function getUserProfile() {
    const supabase = createServerComponentClient({ cookies })
    const user = await getUser()
    let { data: profiles } = await supabase
        .from('profiles')
        .select("full_name")
        // Filters
        .eq('id', user.id)
    if (profiles.length > 0) {
        return true
    } else {
        return false
    }
}
