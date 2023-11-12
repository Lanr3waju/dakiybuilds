import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function getUserProfile() {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    let { data: profiles } = await supabase
        .from('profiles')
        .select("full_name")
        // Filters
        .eq('id', user?.id)
    if (profiles) return true
}
