import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const res = await fetch(`https://xzphvmwoxcaifzdnmsjw.supabase.co/rest/v1/users?email=eq.${email}&password=eq.${password}`, {
        method: 'GET',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
        }
    })

    const users = await res.json()
    if (users.length === 0) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({ message: 'Login success', user: users[0] })
}
