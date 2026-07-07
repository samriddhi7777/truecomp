'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Search, 
  BarChart3, 
  Building2, 
  LogIn, 
  UserPlus,
  Menu,
  X,
  Bell,
  Sparkles,
  Briefcase,
  User
} from 'lucide-react'
import './globals.css'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/compare', label: 'Compare', icon: BarChart3 },
  { href: '/companies', label: 'Companies', icon: Building2 },
  { href: '/ai', label: 'AI Hub', icon: Sparkles },
  { href: '/jobai', label: 'JobAI', icon: Briefcase },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/submit', label: 'Add Salary', icon: Search },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Don't show nav on login/signup pages
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {!isAuthPage && (
          <>
            {/* Top Navigation */}
            <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white sticky top-0 z-50 shadow-lg">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Link href="/" className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-white">TrueComp</span>
                    <span className="text-[10px] text-teal-300 tracking-wider">KNOW YOUR TRUE WORTH</span>
                  </Link>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Right side - Auth */}
                  <div className="hidden md:flex items-center gap-3">
                    <button className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition">
                      <Bell className="w-5 h-5" />
                    </button>
                    <Link
                      href="/login"
                      className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-teal-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-300 transition shadow-lg"
                    >
                      Sign Up
                    </Link>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6 text-white" />
                    ) : (
                      <Menu className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-800 border-t border-white/10 py-4 px-4">
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      )
                    })}
                    <div className="border-t border-white/10 my-3 pt-3 space-y-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
                      >
                        <LogIn className="w-5 h-5" />
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-teal-400 text-slate-900 hover:bg-teal-300 transition"
                      >
                        <UserPlus className="w-5 h-5" />
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </nav>

            {/* Main Content */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white/70 border-t border-white/10 py-8">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="font-semibold text-white mb-3">TrueComp</h4>
                    <p className="text-xs text-teal-400 mb-3">Know Your True Worth</p>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                      <li><Link href="/compare" className="hover:text-white transition">Compare Salaries</Link></li>
                      <li><Link href="/submit" className="hover:text-white transition">Add Salary</Link></li>
                      <li><Link href="/ai" className="hover:text-white transition">AI Hub</Link></li>
                      <li><Link href="/jobai" className="hover:text-white transition">JobAI</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Company</h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/companies" className="hover:text-white transition">All Companies</Link></li>
                      <li><Link href="/companies/google" className="hover:text-white transition">Google</Link></li>
                      <li><Link href="/companies/amazon" className="hover:text-white transition">Amazon</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-white transition">Blog</a></li>
                      <li><a href="#" className="hover:text-white transition">Career Advice</a></li>
                      <li><a href="#" className="hover:text-white transition">Salary Calculator</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Connect</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                      <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                      <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/50">
                  © 2026 TrueComp. All rights reserved.
                </div>
              </div>
            </footer>
          </>
        )}

        {/* Auth Pages (no nav/footer) */}
        {isAuthPage && (
          <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
            {children}
          </main>
        )}
      </body>
    </html>
  )
}