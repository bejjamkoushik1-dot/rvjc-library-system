import { NextResponse } from 'next/server'

// Mock data for demo - replace with real database
const mockBooks = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262033848",
    genre: "Computer Science",
    description: "Comprehensive introduction to algorithms and data structures",
    total_copies: 5,
    available_copies: 3,
    cover_image: "https://via.placeholder.com/200x300?text=Data+Structures"
  },
  {
    id: 2,
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    isbn: "978-0078022159",
    genre: "Computer Science",
    description: "Fundamental concepts of database management systems",
    total_copies: 4,
    available_copies: 2,
    cover_image: "https://via.placeholder.com/200x300?text=Database+Systems"
  },
  {
    id: 3,
    title: "Engineering Mathematics",
    author: "K.A. Stroud",
    isbn: "978-1133633113",
    genre: "Mathematics",
    description: "Mathematical techniques for engineering students",
    total_copies: 8,
    available_copies: 6,
    cover_image: "https://via.placeholder.com/200x300?text=Engineering+Math"
  },
  {
    id: 4,
    title: "Digital Electronics",
    author: "M. Morris Mano",
    isbn: "978-0132740188",
    genre: "Electronics",
    description: "Principles and applications of digital circuits",
    total_copies: 6,
    available_copies: 1,
    cover_image: "https://via.placeholder.com/200x300?text=Digital+Electronics"
  },
  {
    id: 5,
    title: "Mechanics of Materials",
    author: "Ferdinand Beer",
    isbn: "978-0073398235",
    genre: "Mechanical Engineering",
    description: "Fundamentals of material mechanics and stress analysis",
    total_copies: 3,
    available_copies: 0,
    cover_image: "https://via.placeholder.com/200x300?text=Mechanics+of+Materials"
  }
]

export async function GET() {
  try {
    // TODO: Replace with actual database query
    return NextResponse.json({ 
      success: true, 
      books: mockBooks 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch books' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, author, isbn, genre, description, total_copies } = await request.json()
    
    // TODO: Add book to database
    const newBook = {
      id: mockBooks.length + 1,
      title,
      author,
      isbn,
      genre,
      description,
      total_copies: parseInt(total_copies),
      available_copies: parseInt(total_copies)
    }

    mockBooks.push(newBook)

    return NextResponse.json({ 
      success: true, 
      book: newBook 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to add book' 
    }, { status: 500 })
  }
}
