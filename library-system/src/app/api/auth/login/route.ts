import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // TODO: Implement actual authentication logic
    // For now, just return success for demo
    if (email && password) {
      const response = NextResponse.json({ success: true, user: { email, name: 'Demo User' } })
      
      // Set session cookie
      response.cookies.set('library-session', 'demo-session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
