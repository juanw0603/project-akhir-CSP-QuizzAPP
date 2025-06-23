import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, password } = await req.json()
    console.log('[REGISTER] Route hit')
    const response = await fetch('https://xzphvmwoxcaifzdnmsjw.supabase.co/rest/v1/users', {
        method: 'POST',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await response.json()
    return NextResponse.json(data)
}
