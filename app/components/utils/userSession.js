import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

export default async function userSession() {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (session) {
        return true
    } else {
        return false
    }
}

