import { NextResponse } from 'next/server'

// Mock data for demo - replace with real database
const mockReservations = [
  {
    id: 1,
    book_id: 1,
    book_title: "Data Structures and Algorithms",
    book_author: "Thomas H. Cormen",
    reserved_at: "2024-01-15T10:00:00Z",
    due_date: "2024-01-29T10:00:00Z",
    status: "active"
  },
  {
    id: 2,
    book_id: 2,
    book_title: "Database System Concepts",
    book_author: "Abraham Silberschatz",
    reserved_at: "2024-01-10T10:00:00Z",
    due_date: "2024-01-24T10:00:00Z",
    returned_at: "2024-01-22T10:00:00Z",
    status: "returned"
  },
  {
    id: 3,
    book_id: 3,
    book_title: "Engineering Mathematics",
    book_author: "K.A. Stroud",
    reserved_at: "2024-01-05T10:00:00Z",
    due_date: "2024-01-19T10:00:00Z",
    status: "overdue"
  }
]

export async function GET() {
  try {
    // TODO: Replace with actual database query for user's reservations
    return NextResponse.json({ 
      success: true, 
      reservations: mockReservations 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch reservations' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { book_id } = await request.json()
    
    // TODO: Create reservation in database
    const newReservation = {
      id: mockReservations.length + 1,
      book_id,
      book_title: "Sample Book Title", // TODO: Get actual book title
      book_author: "Sample Author", // TODO: Get actual book author
      reserved_at: new Date().toISOString(),
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      status: "active"
    }

    mockReservations.push(newReservation)

    return NextResponse.json({ 
      success: true, 
      reservation: newReservation 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create reservation' 
    }, { status: 500 })
  }
}
