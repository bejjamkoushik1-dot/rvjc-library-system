'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'

interface Book {
  id: number
  title: string
  author: string
  isbn?: string
  genre?: string
  description?: string
  total_copies: number
  available_copies: number
  cover_image?: string
  publish_year?: number
  pages?: number
  language?: string
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      if (response.ok) {
        const data = await response.json()
        setBooks(data.books || [])
      }
    } catch (error) {
      console.error('Failed to fetch books:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = !selectedGenre || book.genre === selectedGenre
      const matchesAvailability = !selectedAvailability || 
        (selectedAvailability === 'available' && book.available_copies > 0) ||
        (selectedAvailability === 'unavailable' && book.available_copies === 0)
      return matchesSearch && matchesGenre && matchesAvailability
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'year':
          return (b.publish_year || 0) - (a.publish_year || 0)
        case 'available':
          return b.available_copies - a.available_copies
        default:
          return 0
      }
    })

  const genres = [...new Set(books.map(book => book.genre).filter(Boolean))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing books...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav">
        <Link href="/" className="nav-brand">
          📚 RVRJC Library
        </Link>
        <div className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/books" className="bg-blue-700">Books</Link>
          <Link href="/reservations">My Reservations</Link>
          <Link href="/ebooks">E-Books</Link>
          <button onClick={() => window.location.href = '/login'}>Logout</button>
        </div>
      </nav>

      <main className="container">
        <div className="py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📚 Browse Our Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover from over 15,000 books across all engineering disciplines
            </p>
          </div>

          {/* Search and Filters */}
          <div className="search-container">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search by title, author, or ISBN..."
                className="search-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-3 text-gray-400">
                🔍
              </div>
            </div>
            <select
              className="filter-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres ({genres.length})</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="">All Books</option>
              <option value="available">Available Now</option>
              <option value="unavailable">Currently Unavailable</option>
            </select>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="year">Sort by Year</option>
              <option value="available">Sort by Availability</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
              >
                📱 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              >
                📋 List
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{filteredAndSortedBooks.length}</span> books
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedGenre && ` in ${selectedGenre}`}
            </p>
          </div>

          {/* Books Display */}
          {filteredAndSortedBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3 className="empty-title">No books found</h3>
              <p className="empty-description">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedGenre('')
                  setSelectedAvailability('')
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="book-grid">
              {filteredAndSortedBooks.map((book) => (
                <div key={book.id} className="book-card fade-in">
                  {book.cover_image ? (
                    <img 
                      src={book.cover_image} 
                      alt={book.title}
                      className="book-cover"
                    />
                  ) : (
                    <div className="book-cover bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <span className="text-4xl text-blue-500">📚</span>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {book.genre && (
                        <span className="book-genre">{book.genre}</span>
                      )}
                      {book.publish_year && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {book.publish_year}
                        </span>
                      )}
                      {book.pages && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {book.pages} pages
                        </span>
                      )}
                    </div>
                    
                    <div className="book-availability">
                      <span className={`font-medium ${book.available_copies > 0 ? 'available' : 'unavailable'}`}>
                        {book.available_copies > 0 ? `✅ ${book.available_copies} available` : '❌ Not available'}
                      </span>
                      <span className="text-sm text-gray-500">
                        of {book.total_copies} total
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Reservation feature coming soon!')}
                        className={`flex-1 btn ${book.available_copies > 0 ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                        disabled={book.available_copies === 0}
                      >
                        {book.available_copies > 0 ? '📝 Reserve' : 'Unavailable'}
                      </button>
                      <button
                        onClick={() => alert('Details feature coming soon!')}
                        className="btn btn-secondary"
                      >
                        ℹ️ Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedBooks.map((book) => (
                <div key={book.id} className="reservation-item fade-in">
                  <div className="reservation-header">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        {book.cover_image ? (
                          <img 
                            src={book.cover_image} 
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded flex items-center justify-center">
                            <span className="text-2xl text-blue-500">📚</span>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-lg font-semibold">{book.title}</h3>
                          <p className="text-gray-600">by {book.author}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {book.genre && (
                              <span className="book-genre">{book.genre}</span>
                            )}
                            {book.publish_year && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {book.publish_year}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="reservation-actions">
                      <div className="text-center mb-2">
                        <span className={`font-medium ${book.available_copies > 0 ? 'available' : 'unavailable'}`}>
                          {book.available_copies > 0 ? `✅ ${book.available_copies}/${book.total_copies}` : '❌ 0/0'}
                        </span>
                      </div>
                      <button
                        onClick={() => alert('Reservation feature coming soon!')}
                        className={`w-full ${book.available_copies > 0 ? 'btn btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                        disabled={book.available_copies === 0}
                      >
                        {book.available_copies > 0 ? '📝 Reserve' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
