import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return NextResponse.json({ message: "invalid credentials", status: 400 })
    }

    return NextResponse.redirect(`${requestUrl.origin}/dakiyboard`, {
        status: 301,
    })
}
