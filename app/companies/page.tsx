'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, Search, Users, ChevronRight, MapPin, TrendingUp, Briefcase } from 'lucide-react'

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

const COMPANY_TYPES = ['All', 'Product', 'Service', 'Startup']

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

// Complete company data with INDIA locations
const COMPANY_DATA: Record<string, any> = {
  'google': { 
    type: 'Product', 
    employees: '150K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹45L', 
    reports: 156,
    founded: '1998',
    levels: 7
  },
  'amazon': { 
    type: 'Product', 
    employees: '1.5M+', 
    headquarters: 'Hyderabad, India', 
    avgSalary: '₹42L', 
    reports: 89,
    founded: '1994',
    levels: 5
  },
  'microsoft': { 
    type: 'Product', 
    employees: '220K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹40L', 
    reports: 112,
    founded: '1975',
    levels: 6
  },
  'flipkart': { 
    type: 'Product', 
    employees: '50K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹35L', 
    reports: 45,
    founded: '2007',
    levels: 5
  },
  'razorpay': { 
    type: 'Startup', 
    employees: '2K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹28L', 
    reports: 23,
    founded: '2014',
    levels: 4
  },
  'swiggy': { 
    type: 'Startup', 
    employees: '5K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹25L', 
    reports: 34,
    founded: '2014',
    levels: 4
  },
  'zepto': { 
    type: 'Startup', 
    employees: '1K+', 
    headquarters: 'Mumbai, India', 
    avgSalary: '₹22L', 
    reports: 12,
    founded: '2021',
    levels: 3
  },
  'infosys': { 
    type: 'Service', 
    employees: '300K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹15L', 
    reports: 234,
    founded: '1981',
    levels: 5
  },
  'tcs': { 
    type: 'Service', 
    employees: '600K+', 
    headquarters: 'Mumbai, India', 
    avgSalary: '₹12L', 
    reports: 312,
    founded: '1968',
    levels: 5
  },
  'wipro': { 
    type: 'Service', 
    employees: '250K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹14L', 
    reports: 189,
    founded: '1945',
    levels: 4
  },
  'hcl': { 
    type: 'Service', 
    employees: '200K+', 
    headquarters: 'Noida, India', 
    avgSalary: '₹13L', 
    reports: 156,
    founded: '1976',
    levels: 4
  },
  'tech-mahindra': { 
    type: 'Service', 
    employees: '150K+', 
    headquarters: 'Pune, India', 
    avgSalary: '₹12L', 
    reports: 98,
    founded: '1986',
    levels: 4
  },
  'uber': { 
    type: 'Product', 
    employees: '30K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹48L', 
    reports: 67,
    founded: '2009',
    levels: 5
  },
  'adobe': { 
    type: 'Product', 
    employees: '25K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹44L', 
    reports: 78,
    founded: '1982',
    levels: 5
  },
  'oracle': { 
    type: 'Product', 
    employees: '160K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹38L', 
    reports: 92,
    founded: '1977',
    levels: 5
  },
  'salesforce': { 
    type: 'Product', 
    employees: '70K+', 
    headquarters: 'Bengaluru, India', 
    avgSalary: '₹46L', 
    reports: 56,
    founded: '1999',
    levels: 5
  },
}

export default function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [filteredCompanies, setFilteredCompanies] = useState(COMPANIES)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let filtered = COMPANIES
    
    if (search) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (selectedType !== 'All') {
      filtered = filtered.filter(c => {
        const data = COMPANY_DATA[c.id]
        return data && data.type === selectedType
      })
    }
    
    setFilteredCompanies(filtered)
  }, [search, selectedType])

  const handleImageError = (companyId: string) => {
    setImageErrors(prev => ({ ...prev, [companyId]: true }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="w-10 h-10 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                All <span className="text-blue-400">Companies</span>
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Explore salary data across {COMPANIES.length} companies in our database
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-white">{COMPANIES.length}</div>
              <div className="text-sm text-blue-300">Total Companies</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-green-400">
                {COMPANIES.filter(c => COMPANY_DATA[c.id]?.type === 'Product').length}
              </div>
              <div className="text-sm text-blue-300">Product Companies</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-orange-400">
                {COMPANIES.filter(c => COMPANY_DATA[c.id]?.type === 'Startup').length}
              </div>
              <div className="text-sm text-blue-300">Startups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/20 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-blue-300/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {COMPANY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    selectedType === type
                      ? 'bg-blue-500/40 text-white border border-blue-400'
                      : 'bg-white/20 text-blue-200 hover:bg-white/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white">No companies found</h3>
            <p className="text-blue-300 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => {
              const data = COMPANY_DATA[company.id]
              const hasError = imageErrors[company.id]
              const logoUrl = getLogoUrl(company.name)

              return (
                <Link key={company.id} href={`/companies/${company.id}`}>
                  <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-blue-400/50 transition hover:bg-white/25 group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        {!hasError ? (
                          <img 
                            src={logoUrl}
                            alt={`${company.name} logo`}
                            className="w-10 h-10 object-contain"
                            onError={() => handleImageError(company.id)}
                          />
                        ) : (
                          <span className="text-2xl font-bold text-blue-400">
                            {company.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition">
                          {company.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            data?.type === 'Product' ? 'bg-green-500/30 text-green-300' :
                            data?.type === 'Startup' ? 'bg-orange-500/30 text-orange-300' :
                            data?.type === 'Service' ? 'bg-purple-500/30 text-purple-300' :
                            'bg-gray-500/30 text-gray-300'
                          }`}>
                            {data?.type || 'N/A'}
                          </span>
                          <span className="text-xs text-blue-300 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {data?.employees || 'N/A'}
                          </span>
                        </div>
                        <div className="text-xs text-blue-300 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {data?.headquarters || 'N/A'}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-green-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {data?.avgSalary || 'N/A'}
                          </span>
                          <span className="text-blue-400 flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {data?.reports || 0} reports
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">📊 Missing a company?</h3>
          <p className="text-blue-200 mb-4">Help us grow our database by adding your company</p>
          <Link href="/submit" className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition shadow-lg">
            Add Company Salary Data
          </Link>
        </div>
      </div>
    </div>
  )
}