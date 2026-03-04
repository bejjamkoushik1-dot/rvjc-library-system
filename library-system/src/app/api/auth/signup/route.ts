import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // TODO: Implement actual user registration logic
    // For now, just return success for demo
    if (name && email && password) {
      return NextResponse.json({ 
        success: true, 
        message: 'Account created successfully' 
      })
    }

    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
