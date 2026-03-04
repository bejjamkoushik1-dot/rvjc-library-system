import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav">
        <Link href="/" className="nav-brand">
          📚 R.V.R & J.C College of Engineering Library
        </Link>
        <div className="nav-links">
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to RVRJC Library
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Your gateway to knowledge. Browse, reserve, and manage books from our extensive collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books" className="btn bg-white text-blue-600 hover:bg-gray-100">
                📖 Browse Books
              </Link>
              <Link href="/signup" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
                🚀 Get Started
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <div className="text-8xl">📚</div>
        </div>
        <div className="absolute top-20 right-10 opacity-10">
          <div className="text-6xl">📖</div>
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <div className="text-6xl">🎓</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern library management with powerful features designed for students and faculty.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-4">Browse Books</h3>
              <p className="text-gray-600 mb-4">
                Search our extensive collection by title, author, department, or ISBN. Advanced filters help you find exactly what you need.
              </p>
              <Link href="/books" className="btn btn-primary">
                Explore Collection
              </Link>
            </div>
            
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-4">Reserve Books</h3>
              <p className="text-gray-600 mb-4">
                Reserve books online and pick them up at the library. Manage your reservations with real-time status updates.
              </p>
              <Link href="/reservations" className="btn btn-primary">
                Manage Reservations
              </Link>
            </div>
            
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-4">E-Books</h3>
              <p className="text-gray-600 mb-4">
                Access digital books anytime, anywhere. Download for offline reading and enjoy interactive features.
              </p>
              <Link href="/ebooks" className="btn btn-primary">
                Read E-Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Library at a Glance
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that show our commitment to education
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="text-5xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="stat-label text-blue-600">Books</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-green-600 mb-2">5,000+</div>
              <div className="stat-label text-green-600">E-Books</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-purple-600 mb-2">2,500+</div>
              <div className="stat-label text-purple-600">Members</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-orange-600 mb-2">500+</div>
              <div className="stat-label text-orange-600">Daily Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Account</h3>
              <p className="text-gray-600">
                Sign up with your college email. Quick verification process gets you started in minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Browse & Reserve</h3>
              <p className="text-gray-600">
                Search our catalog and reserve books online. Get notified when your books are ready.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Pick Up & Enjoy</h3>
              <p className="text-gray-600">
                Collect your reserved books from the library. Enjoy flexible return periods and renewals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold">Sarah Kumar</div>
                  <div className="text-sm text-gray-500">Computer Science Student</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The online reservation system saved me so much time. I can check availability from anywhere!"
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  R
                </div>
                <div>
                  <div className="font-semibold">Ravi Patel</div>
                  <div className="text-sm text-gray-500">Mechanical Engineering</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The e-book collection is amazing. I can study even when the library is closed."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  P
                </div>
                <div>
                  <div className="font-semibold">Priya Reddy</div>
                  <div className="text-sm text-gray-500">Faculty Member</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Great system for managing course materials. My students love it!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students already using our digital library system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Create Account
            </Link>
            <Link href="/books" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">RVRJC Library</h3>
              <p className="text-gray-400">
                Modern library management system for R.V.R & J.C College of Engineering.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/books" className="text-gray-400 hover:text-white">Browse Books</Link></li>
                <li><Link href="/ebooks" className="text-gray-400 hover:text-white">E-Books</Link></li>
                <li><Link href="/reservations" className="text-gray-400 hover:text-white">My Reservations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">📧</a>
                <a href="#" className="text-gray-400 hover:text-white">📱</a>
                <a href="#" className="text-gray-400 hover:text-white">💬</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 R.V.R & J.C College of Engineering Library. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
