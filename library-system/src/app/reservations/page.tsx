'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'

interface Reservation {
  id: number
  book_id: number
  book_title: string
  book_author: string
  book_isbn?: string
  reserved_at: string
  due_date: string
  returned_at?: string
  status: 'active' | 'returned' | 'overdue'
  cover_image?: string
  renewal_count?: number
  fine_amount?: number
}

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'returned' | 'overdue'>('all')
  const [sortBy, setSortBy] = useState<'due_date' | 'reserved_at' | 'title'>('due_date')

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations')
      if (response.ok) {
        const data = await response.json()
        setReservations(data.reservations || [])
      }
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (reservationId: number) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}/return`, {
        method: 'POST'
      })
      
      if (response.ok) {
        fetchReservations() // Refresh the list
        alert('Book returned successfully!')
      } else {
        alert('Failed to return book')
      }
    } catch (error) {
      alert('Error returning book')
    }
  }

  const handleRenew = async (reservationId: number) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}/renew`, {
        method: 'POST'
      })
      
      if (response.ok) {
        fetchReservations() // Refresh the list
        alert('Book renewed successfully!')
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to renew book')
      }
    } catch (error) {
      alert('Error renewing book')
    }
  }

  const filteredAndSortedReservations = reservations
    .filter(reservation => {
      if (filter === 'all') return true
      return reservation.status === filter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'due_date':
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        case 'reserved_at':
          return new Date(b.reserved_at).getTime() - new Date(a.reserved_at).getTime()
        case 'title':
          return a.book_title.localeCompare(b.book_title)
        default:
          return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600'
      case 'returned': return 'text-gray-600'
      case 'overdue': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'status-active'
      case 'returned': return 'status-returned'
      case 'overdue': return 'status-overdue'
      default: return 'status-returned'
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getFilterCount = (status: string) => {
    return reservations.filter(r => r.status === status).length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your reservations...</p>
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
          <Link href="/books">Books</Link>
          <Link href="/reservations" className="bg-blue-700">My Reservations</Link>
          <Link href="/ebooks">E-Books</Link>
          <button onClick={() => window.location.href = '/login'}>Logout</button>
        </div>
      </nav>

      <main className="container">
        <div className="py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📋 My Reservations
            </h1>
            <p className="text-lg text-gray-600">
              Manage your book reservations and track due dates
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="stat-card">
              <div className="text-3xl text-blue-600 mb-2">{getFilterCount('active')}</div>
              <div className="stat-label text-blue-600">Active</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl text-orange-600 mb-2">{getFilterCount('overdue')}</div>
              <div className="stat-label text-orange-600">Overdue</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl text-gray-600 mb-2">{getFilterCount('returned')}</div>
              <div className="stat-label text-gray-600">Returned</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl text-purple-600 mb-2">{reservations.length}</div>
              <div className="stat-label text-purple-600">Total</div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              >
                All ({reservations.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Active ({getFilterCount('active')})
              </button>
              <button
                onClick={() => setFilter('overdue')}
                className={`btn ${filter === 'overdue' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Overdue ({getFilterCount('overdue')})
              </button>
              <button
                onClick={() => setFilter('returned')}
                className={`btn ${filter === 'returned' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Returned ({getFilterCount('returned')})
              </button>
            </div>
            
            <select
              className="form-input md:w-48"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="due_date">Sort by Due Date</option>
              <option value="reserved_at">Sort by Reservation Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>

          {/* Reservations List */}
          {filteredAndSortedReservations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3 className="empty-title">No reservations found</h3>
              <p className="empty-description">
                {filter === 'all' 
                  ? "You haven't made any reservations yet. Start by browsing our book collection!"
                  : `No ${filter} reservations found.`
                }
              </p>
              {filter === 'all' && (
                <Link href="/books" className="btn btn-primary">
                  Browse Books
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedReservations.map((reservation) => {
                const daysUntilDue = getDaysUntilDue(reservation.due_date)
                const isOverdue = daysUntilDue < 0
                
                return (
                  <div key={reservation.id} className="reservation-item fade-in">
                    <div className="reservation-header">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          {reservation.cover_image ? (
                            <img 
                              src={reservation.cover_image} 
                              alt={reservation.book_title}
                              className="w-20 h-28 object-cover rounded-lg shadow-md"
                            />
                          ) : (
                            <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center shadow-md">
                              <span className="text-3xl text-blue-500">📚</span>
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{reservation.book_title}</h3>
                            <p className="text-gray-600 mb-2">by {reservation.book_author}</p>
                            {reservation.book_isbn && (
                              <p className="text-sm text-gray-500 mb-2">ISBN: {reservation.book_isbn}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-3 text-sm">
                              <span className={`status-badge ${getStatusBadge(reservation.status)}`}>
                                {reservation.status}
                              </span>
                              {reservation.renewal_count && reservation.renewal_count > 0 && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  Renewed {reservation.renewal_count} time{reservation.renewal_count > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="reservation-actions">
                        <div className="text-center mb-3">
                          {reservation.status === 'active' && (
                            <div>
                              <div className={`font-medium ${isOverdue ? 'text-red-600' : daysUntilDue <= 3 ? 'text-orange-600' : 'text-green-600'}`}>
                                {isOverdue 
                                  ? `⚠️ ${Math.abs(daysUntilDue)} days overdue`
                                  : daysUntilDue === 0 
                                  ? '📅 Due today'
                                  : `📅 ${daysUntilDue} days left`
                                }
                              </div>
                              <div className="text-sm text-gray-500">
                                Due: {new Date(reservation.due_date).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                          
                          {reservation.status === 'returned' && (
                            <div>
                              <div className="font-medium text-gray-600">
                                ✅ Returned
                              </div>
                              <div className="text-sm text-gray-500">
                                Returned: {new Date(reservation.returned_at!).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                          
                          {reservation.status === 'overdue' && (
                            <div>
                              <div className="font-medium text-red-600">
                                ⚠️ {Math.abs(daysUntilDue)} days overdue
                              </div>
                              {reservation.fine_amount && reservation.fine_amount > 0 && (
                                <div className="text-sm text-red-500 font-medium">
                                  Fine: ₹{reservation.fine_amount}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {reservation.status === 'active' && (
                          <div className="space-y-2">
                            <button
                              onClick={() => handleRenew(reservation.id)}
                              className="w-full btn btn-secondary"
                            >
                              🔄 Renew
                            </button>
                            <button
                              onClick={() => handleReturn(reservation.id)}
                              className="w-full btn btn-success"
                            >
                              ✅ Return Book
                            </button>
                          </div>
                        )}
                        
                        {reservation.status === 'overdue' && (
                          <div className="space-y-2">
                            <button
                              onClick={() => handleRenew(reservation.id)}
                              className="w-full btn btn-secondary"
                            >
                              🔄 Renew (Pay Fine)
                            </button>
                            <button
                              onClick={() => handleReturn(reservation.id)}
                              className="w-full btn btn-danger"
                            >
                              ✅ Return Book
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
