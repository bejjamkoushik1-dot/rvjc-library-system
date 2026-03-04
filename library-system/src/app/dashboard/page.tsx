'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
  const [userStats, setUserStats] = useState({
    totalBooks: 1234,
    availableBooks: 856,
    reservedBooks: 378,
    myReservations: 3,
    overdueBooks: 2
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'reservation',
      title: 'Data Structures and Algorithms',
      author: 'Thomas H. Cormen',
      time: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'return',
      title: 'Algorithm Design',
      author: 'Jon Kleinberg',
      time: '1 day ago',
      status: 'returned'
    },
    {
      id: 3,
      type: 'reservation',
      title: 'Database System Concepts',
      author: 'Abraham Silberschatz',
      time: '3 days ago',
      status: 'active'
    },
    {
      id: 4,
      type: 'overdue',
      title: 'Engineering Mathematics',
      author: 'K.A. Stroud',
      time: '5 days ago',
      status: 'overdue'
    }
  ])

  const [quickActions] = useState([
    { title: 'Browse Books', description: 'Search our collection of 15,000+ books', icon: '📚', href: '/books', color: 'blue' },
    { title: 'My Reservations', description: 'View and manage your current reservations', icon: '📝', href: '/reservations', color: 'green' },
    { title: 'E-Books', description: 'Access 5,000+ digital books', icon: '💻', href: '/ebooks', color: 'purple' },
    { title: 'Profile Settings', description: 'Update your account information', icon: '⚙️', href: '/profile', color: 'gray' }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'reservation': return '📝'
      case 'return': return '✅'
      case 'overdue': return '⚠️'
      default: return '📚'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600'
      case 'returned': return 'text-gray-600'
      case 'overdue': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getActionColor = (color: string) => {
    switch (color) {
      case 'blue': return 'btn-primary'
      case 'green': return 'btn-success'
      case 'purple': return 'bg-purple-600 text-white hover:bg-purple-700'
      case 'gray': return 'btn-secondary'
      default: return 'btn-secondary'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav">
        <Link href="/" className="nav-brand">
          📚 RVRJC Library
        </Link>
        <div className="nav-links">
          <Link href="/dashboard" className="bg-blue-700">Dashboard</Link>
          <Link href="/books">Books</Link>
          <Link href="/reservations">My Reservations</Link>
          <Link href="/ebooks">E-Books</Link>
          <button onClick={() => window.location.href = '/login'}>Logout</button>
        </div>
      </nav>

      <main className="container">
        <div className="py-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, Student! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Here's your library dashboard with all your important information
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card hover:scale-105 transition-transform">
              <div className="text-blue-600 mb-2">
                <div className="text-4xl">📚</div>
              </div>
              <div className="stat-number text-blue-600">{userStats.totalBooks.toLocaleString()}</div>
              <div className="stat-label text-blue-600">Total Books</div>
            </div>
            <div className="stat-card hover:scale-105 transition-transform">
              <div className="text-green-600 mb-2">
                <div className="text-4xl">✅</div>
              </div>
              <div className="stat-number text-green-600">{userStats.availableBooks.toLocaleString()}</div>
              <div className="stat-label text-green-600">Available</div>
            </div>
            <div className="stat-card hover:scale-105 transition-transform">
              <div className="text-orange-600 mb-2">
                <div className="text-4xl">📝</div>
              </div>
              <div className="stat-number text-orange-600">{userStats.reservedBooks.toLocaleString()}</div>
              <div className="stat-label text-orange-600">Reserved</div>
            </div>
            <div className="stat-card hover:scale-105 transition-transform">
              <div className="text-purple-600 mb-2">
                <div className="text-4xl">📋</div>
              </div>
              <div className="stat-number text-purple-600">{userStats.myReservations}</div>
              <div className="stat-label text-purple-600">My Reservations</div>
            </div>
          </div>

          {/* Alert for overdue books */}
          {userStats.overdueBooks > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="text-red-600 text-xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-1">
                    You have {userStats.overdueBooks} overdue book{userStats.overdueBooks > 1 ? 's' : ''}
                  </h3>
                  <p className="text-red-600">
                    Please return or renew them as soon as possible to avoid late fees.
                  </p>
                  <Link href="/reservations" className="btn btn-danger mt-2">
                    View Overdue Books
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2">📈</span>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="text-2xl mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">by {activity.author}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full status-badge ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href="/reservations" className="btn btn-secondary">
                  View All Activity
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2">🚀</span>
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`block w-full text-left p-4 rounded-lg hover:shadow-md transition-all hover:scale-105 ${getActionColor(action.color)}`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{action.icon}</span>
                      <div>
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-sm opacity-80">{action.description}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="card text-center">
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-lg font-semibold mb-2">Library Hours</h3>
              <p className="text-gray-600 mb-1">Mon - Fri: 8:00 AM - 8:00 PM</p>
              <p className="text-gray-600">Sat - Sun: 9:00 AM - 5:00 PM</p>
              <Link href="/hours" className="btn btn-secondary mt-3">
                View Details
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="text-lg font-semibold mb-2">Contact Library</h3>
              <p className="text-gray-600 mb-1">Need help? Reach out to our staff</p>
              <Link href="/contact" className="btn btn-secondary mt-3">
                Get Help
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-2">📰</div>
              <h3 className="text-lg font-semibold mb-2">Library News</h3>
              <p className="text-gray-600 mb-1">Stay updated with latest announcements</p>
              <Link href="/news" className="btn btn-secondary mt-3">
                Read News
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
