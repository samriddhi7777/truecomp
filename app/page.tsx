'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, Users, Building2, Sparkles, Shield, ArrowRight } from 'lucide-react'

// Real companies from your database
const COMPANIES = [
  { id: 'google', name: 'Google' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'flipkart', name: 'Flipkart' },
  { id: 'razorpay', name: 'Razorpay' },
  { id: 'swiggy', name: 'Swiggy' },
  { id: 'zepto', name: 'Zepto' },
  { id: 'infosys', name: 'Infosys' },
  { id: 'tcs', name: 'TCS' },
  { id: 'wipro', name: 'Wipro' },
  { id: 'hcl', name: 'HCL' },
  { id: 'tech-mahindra', name: 'Tech Mahindra' },
  { id: 'uber', name: 'Uber' },
  { id: 'adobe', name: 'Adobe' },
  { id: 'oracle', name: 'Oracle' },
  { id: 'salesforce', name: 'Salesforce' },
]

const COMPANY_DOMAINS: Record<string, string> = {
  'google': 'google.com',
  'amazon': 'amazon.com',
  'microsoft': 'microsoft.com',
  'flipkart': 'flipkart.com',
  'razorpay': 'razorpay.com',
  'swiggy': 'swiggy.com',
  'zepto': 'zepto.com',
  'infosys': 'infosys.com',
  'tcs': 'tcs.com',
  'wipro': 'wipro.com',
  'hcl': 'hcltech.com',
  'tech-mahindra': 'techmahindra.com',
  'uber': 'uber.com',
  'adobe': 'adobe.com',
  'oracle': 'oracle.com',
  'salesforce': 'salesforce.com',
}

const getLogoUrl = (companyName: string) => {
  const slug = companyName.toLowerCase().replace(/\s/g, '')
  
  const hardcodedLogos: Record<string, string> = {
    'zepto': 'https://zepto.com/favicon.ico',
    'hcl': 'https://www.hcltech.com/favicon.ico',
    'tech-mahindra': 'https://www.techmahindra.com/favicon.ico',
    'tcs': 'https://www.tcs.com/favicon.ico',
  }
  
  if (hardcodedLogos[slug]) {
    return hardcodedLogos[slug]
  }
  
  const domain = COMPANY_DOMAINS[slug]
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=48&background=3b82f6&color=fff&bold=true`
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<typeof COMPANIES>([])
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [isSearching, setIsSearching] = useState(false)

  const handleImageError = (companyId: string) => {
    setImageErrors(prev => ({ ...prev, [companyId]: true }))
  }

  const handleSearch = () => {
    if (!search.trim()) {
      setSearchResults([])
      return
    }
    
    setIsSearching(true)
    const results = COMPANIES.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResults(results)
    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full text-sm font-medium">
                🔥 Trusted by Professionals
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Know Your <span className="text-teal-300">Market Worth</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Get real-time, verified salary data across Indian tech companies. 
              Make informed career decisions with confidence.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center flex-1 w-full">
                <Search className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-2 py-3 text-gray-700 outline-none bg-transparent w-full"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-teal-600 hover:to-blue-700 transition font-medium w-full md:w-auto shadow-lg"
              >
                Search
              </button>
            </div>

            {/* Search Results */}
            {search && searchResults.length > 0 && (
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                {searchResults.map((company) => {
                  const hasError = imageErrors[company.id]
                  const logoUrl = getLogoUrl(company.name)
                  return (
                    <Link 
                      key={company.id} 
                      href={`/companies/${company.id}`}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition border-b border-white/10 last:border-0"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {!hasError ? (
                          <img 
                            src={logoUrl}
                            alt={company.name}
                            className="w-6 h-6 object-contain"
                            onError={() => handleImageError(company.id)}
                          />
                        ) : (
                          <span className="text-sm font-bold text-white">{company.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="text-white font-medium">{company.name}</span>
                      <span className="text-blue-300 text-sm ml-auto">View Salaries →</span>
                    </Link>
                  )
                })}
              </div>
            )}

            {search && searchResults.length === 0 && !isSearching && (
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 text-center">
                <p className="text-blue-200">No companies found matching "{search}"</p>
              </div>
            )}

            {/* Stats - Removed fake figures */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-10">
              <div>
                <div className="text-2xl md:text-3xl font-bold">{COMPANIES.length}</div>
                <div className="text-sm text-blue-200">Companies Tracked</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">8</div>
                <div className="text-sm text-blue-200">Career Levels</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">15</div>
                <div className="text-sm text-blue-200">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Verified Salaries</h3>
            <p className="text-xs text-gray-500 mt-1">Real data from employees</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Market Insights</h3>
            <p className="text-xs text-gray-500 mt-1">Salary trends and analysis</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">AI-Powered Tools</h3>
            <p className="text-xs text-gray-500 mt-1">Smart career recommendations</p>
          </div>
        </div>
      </div>

      {/* AI Tools CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">AI-Powered Career Tools</h3>
                <p className="text-sm text-gray-600">Get personalized salary insights and career advice</p>
              </div>
            </div>
            <Link href="/ai" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition shadow-lg flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
              Explore AI Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Know Your Worth?</h2>
          <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base">Join professionals who trust TrueComp for salary insights.</p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <Link href="/submit" className="bg-white text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg text-sm md:text-base">
              Add Your Salary
            </Link>
            <Link href="/compare" className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition shadow-lg text-sm md:text-base">
              Compare Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}