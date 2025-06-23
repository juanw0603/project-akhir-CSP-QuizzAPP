import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { user_id, new_score } = await req.json();

    // Update the user's highest_score
    await fetch(`https://xzphvmwoxcaifzdnmsjw.supabase.co/rest/v1/users?id=eq.${user_id}`, {
        method: 'PATCH',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            highest_score: new_score,
        }),
    });

    // Fetch the latest user data
    const userRes = await fetch(`https://xzphvmwoxcaifzdnmsjw.supabase.co/rest/v1/users?id=eq.${user_id}`, {
        method: 'GET',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cGh2bXdveGNhaWZ6ZG5tc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjIyNzMsImV4cCI6MjA2NjIzODI3M30.3jYuIs3nGo9780TqYZboo-s8xWTEFO-bQeA330dAfug',
        },
    });
    const users = await userRes.json();
    const user = users && users.length > 0 ? users[0] : null;
    return NextResponse.json({ user });
}
