'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Building2, 
  Users, 
  MapPin, 
  Globe, 
  Briefcase, 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  ChevronRight,
  Award,
  Star,
  Clock
} from 'lucide-react'

// Complete company data matching the companies page
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

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=80&background=3b82f6&color=fff&bold=true`
}

// Complete company details data - India offices
const COMPANY_DETAILS: Record<string, any> = {
  'google': {
    name: 'Google',
    type: 'Product',
    employees: '150K+',
    headquarters: 'Bengaluru, India',
    founded: '1998',
    website: 'https://google.com',
    description: 'Google is a multinational technology company specializing in Internet-related services and products including search, cloud computing, and AI.',
    avgSalary: '₹45L',
    totalReports: 156,
    levels: ['L3', 'L4', 'L5', 'L6', 'L7'],
    rating: 4.6,
    levelData: {
      'L3': { avg: '₹25L', min: '₹18L', max: '₹32L', reports: 45 },
      'L4': { avg: '₹35L', min: '₹25L', max: '₹45L', reports: 38 },
      'L5': { avg: '₹50L', min: '₹38L', max: '₹62L', reports: 32 },
      'L6': { avg: '₹70L', min: '₹55L', max: '₹85L', reports: 25 },
      'L7': { avg: '₹95L', min: '₹75L', max: '₹120L', reports: 16 },
    }
  },
  'amazon': {
    name: 'Amazon',
    type: 'Product',
    employees: '1.5M+',
    headquarters: 'Hyderabad, India',
    founded: '1994',
    website: 'https://amazon.com',
    description: 'Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    avgSalary: '₹42L',
    totalReports: 89,
    levels: ['L4', 'L5', 'L6', 'L7', 'L8'],
    rating: 4.4,
    levelData: {
      'L4': { avg: '₹22L', min: '₹15L', max: '₹28L', reports: 28 },
      'L5': { avg: '₹32L', min: '₹22L', max: '₹42L', reports: 22 },
      'L6': { avg: '₹48L', min: '₹35L', max: '₹60L', reports: 18 },
      'L7': { avg: '₹68L', min: '₹50L', max: '₹85L', reports: 12 },
      'L8': { avg: '₹90L', min: '₹70L', max: '₹120L', reports: 9 },
    }
  },
  'microsoft': {
    name: 'Microsoft',
    type: 'Product',
    employees: '220K+',
    headquarters: 'Bengaluru, India',
    founded: '1975',
    website: 'https://microsoft.com',
    description: 'Microsoft develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.',
    avgSalary: '₹40L',
    totalReports: 112,
    levels: ['59', '60', '61', '62', '63', '64'],
    rating: 4.5,
    levelData: {
      '59': { avg: '₹20L', min: '₹14L', max: '₹26L', reports: 25 },
      '60': { avg: '₹26L', min: '₹18L', max: '₹34L', reports: 22 },
      '61': { avg: '₹32L', min: '₹22L', max: '₹42L', reports: 20 },
      '62': { avg: '₹40L', min: '₹28L', max: '₹52L', reports: 18 },
      '63': { avg: '₹52L', min: '₹38L', max: '₹66L', reports: 15 },
      '64': { avg: '₹65L', min: '₹48L', max: '₹82L', reports: 12 },
    }
  },
  'flipkart': {
    name: 'Flipkart',
    type: 'Product',
    employees: '50K+',
    headquarters: 'Bengaluru, India',
    founded: '2007',
    website: 'https://flipkart.com',
    description: 'Flipkart is an Indian e-commerce company headquartered in Bengaluru.',
    avgSalary: '₹35L',
    totalReports: 45,
    levels: ['SDE 1', 'SDE 2', 'SDE 3', 'Principal', 'Staff'],
    rating: 4.3,
    levelData: {
      'SDE 1': { avg: '₹18L', min: '₹12L', max: '₹24L', reports: 15 },
      'SDE 2': { avg: '₹28L', min: '₹20L', max: '₹36L', reports: 12 },
      'SDE 3': { avg: '₹40L', min: '₹30L', max: '₹50L', reports: 8 },
      'Principal': { avg: '₹55L', min: '₹42L', max: '₹68L', reports: 6 },
      'Staff': { avg: '₹70L', min: '₹55L', max: '₹85L', reports: 4 },
    }
  },
  'razorpay': {
    name: 'Razorpay',
    type: 'Startup',
    employees: '2K+',
    headquarters: 'Bengaluru, India',
    founded: '2014',
    website: 'https://razorpay.com',
    description: 'Razorpay is a leading Indian payment gateway and financial services company.',
    avgSalary: '₹28L',
    totalReports: 23,
    levels: ['SDE 1', 'SDE 2', 'SDE 3', 'Lead'],
    rating: 4.2,
    levelData: {
      'SDE 1': { avg: '₹15L', min: '₹10L', max: '₹20L', reports: 8 },
      'SDE 2': { avg: '₹22L', min: '₹16L', max: '₹28L', reports: 7 },
      'SDE 3': { avg: '₹32L', min: '₹24L', max: '₹40L', reports: 5 },
      'Lead': { avg: '₹45L', min: '₹35L', max: '₹55L', reports: 3 },
    }
  },
  'swiggy': {
    name: 'Swiggy',
    type: 'Startup',
    employees: '5K+',
    headquarters: 'Bengaluru, India',
    founded: '2014',
    website: 'https://swiggy.com',
    description: 'Swiggy is a leading Indian food delivery and on-demand delivery platform.',
    avgSalary: '₹25L',
    totalReports: 34,
    levels: ['SDE 1', 'SDE 2', 'SDE 3', 'Senior SDE'],
    rating: 4.1,
    levelData: {
      'SDE 1': { avg: '₹14L', min: '₹9L', max: '₹19L', reports: 12 },
      'SDE 2': { avg: '₹20L', min: '₹14L', max: '₹26L', reports: 10 },
      'SDE 3': { avg: '₹30L', min: '₹22L', max: '₹38L', reports: 7 },
      'Senior SDE': { avg: '₹40L', min: '₹30L', max: '₹50L', reports: 5 },
    }
  },
  'zepto': {
    name: 'Zepto',
    type: 'Startup',
    employees: '1K+',
    headquarters: 'Mumbai, India',
    founded: '2021',
    website: 'https://zepto.com',
    description: 'Zepto is a quick-commerce platform delivering groceries in minutes.',
    avgSalary: '₹22L',
    totalReports: 12,
    levels: ['SDE 1', 'SDE 2', 'SDE 3'],
    rating: 4.0,
    levelData: {
      'SDE 1': { avg: '₹12L', min: '₹8L', max: '₹16L', reports: 5 },
      'SDE 2': { avg: '₹18L', min: '₹12L', max: '₹24L', reports: 4 },
      'SDE 3': { avg: '₹28L', min: '₹20L', max: '₹36L', reports: 3 },
    }
  },
  'infosys': {
    name: 'Infosys',
    type: 'Service',
    employees: '300K+',
    headquarters: 'Bengaluru, India',
    founded: '1981',
    website: 'https://infosys.com',
    description: 'Infosys is a multinational corporation that provides business consulting, IT, and outsourcing services.',
    avgSalary: '₹15L',
    totalReports: 234,
    levels: ['Systems Engineer', 'Senior Systems Engineer', 'Technology Analyst', 'Lead', 'Principal'],
    rating: 4.2,
    levelData: {
      'Systems Engineer': { avg: '₹8L', min: '₹5L', max: '₹11L', reports: 78 },
      'Senior Systems Engineer': { avg: '₹12L', min: '₹8L', max: '₹16L', reports: 56 },
      'Technology Analyst': { avg: '₹16L', min: '₹11L', max: '₹21L', reports: 45 },
      'Lead': { avg: '₹22L', min: '₹16L', max: '₹28L', reports: 32 },
      'Principal': { avg: '₹30L', min: '₹22L', max: '₹38L', reports: 23 },
    }
  },
  'tcs': {
    name: 'TCS',
    type: 'Service',
    employees: '600K+',
    headquarters: 'Mumbai, India',
    founded: '1968',
    website: 'https://tcs.com',
    description: 'TCS is an Indian multinational information technology services and consulting company.',
    avgSalary: '₹12L',
    totalReports: 312,
    levels: ['ASE', 'SE', 'ITA', 'TA', 'Consultant'],
    rating: 4.3,
    levelData: {
      'ASE': { avg: '₹6L', min: '₹4L', max: '₹8L', reports: 98 },
      'SE': { avg: '₹9L', min: '₹6L', max: '₹12L', reports: 76 },
      'ITA': { avg: '₹13L', min: '₹9L', max: '₹17L', reports: 58 },
      'TA': { avg: '₹15L', min: '₹10L', max: '₹20L', reports: 45 },
      'Consultant': { avg: '₹20L', min: '₹14L', max: '₹26L', reports: 35 },
    }
  },
  'wipro': {
    name: 'Wipro',
    type: 'Service',
    employees: '250K+',
    headquarters: 'Bengaluru, India',
    founded: '1945',
    website: 'https://wipro.com',
    description: 'Wipro is an Indian multinational corporation that provides IT, consulting, and business process services.',
    avgSalary: '₹14L',
    totalReports: 189,
    levels: ['Project Engineer', 'Senior Project Engineer', 'Technology Analyst', 'Lead'],
    rating: 4.0,
    levelData: {
      'Project Engineer': { avg: '₹7L', min: '₹5L', max: '₹9L', reports: 62 },
      'Senior Project Engineer': { avg: '₹10L', min: '₹7L', max: '₹13L', reports: 48 },
      'Technology Analyst': { avg: '₹15L', min: '₹10L', max: '₹20L', reports: 42 },
      'Lead': { avg: '₹22L', min: '₹16L', max: '₹28L', reports: 37 },
    }
  },
  'hcl': {
    name: 'HCL',
    type: 'Service',
    employees: '200K+',
    headquarters: 'Noida, India',
    founded: '1976',
    website: 'https://hcl.com',
    description: 'HCL Technologies is a leading global IT services company.',
    avgSalary: '₹13L',
    totalReports: 156,
    levels: ['Engineer', 'Senior Engineer', 'Lead Engineer', 'Principal Engineer'],
    rating: 4.0,
    levelData: {
      'Engineer': { avg: '₹6L', min: '₹4L', max: '₹8L', reports: 52 },
      'Senior Engineer': { avg: '₹9L', min: '₹6L', max: '₹12L', reports: 42 },
      'Lead Engineer': { avg: '₹14L', min: '₹10L', max: '₹18L', reports: 35 },
      'Principal Engineer': { avg: '₹20L', min: '₹15L', max: '₹25L', reports: 27 },
    }
  },
  'tech-mahindra': {
    name: 'Tech Mahindra',
    type: 'Service',
    employees: '150K+',
    headquarters: 'Pune, India',
    founded: '1986',
    website: 'https://techmahindra.com',
    description: 'Tech Mahindra is an Indian multinational IT services and consulting company.',
    avgSalary: '₹12L',
    totalReports: 98,
    levels: ['Associate Engineer', 'Engineer', 'Lead Engineer', 'Senior Lead'],
    rating: 3.9,
    levelData: {
      'Associate Engineer': { avg: '₹5L', min: '₹3L', max: '₹7L', reports: 35 },
      'Engineer': { avg: '₹8L', min: '₹5L', max: '₹11L', reports: 28 },
      'Lead Engineer': { avg: '₹12L', min: '₹8L', max: '₹16L', reports: 20 },
      'Senior Lead': { avg: '₹18L', min: '₹13L', max: '₹23L', reports: 15 },
    }
  },
  'uber': {
    name: 'Uber',
    type: 'Product',
    employees: '30K+',
    headquarters: 'Bengaluru, India',
    founded: '2009',
    website: 'https://uber.com',
    description: 'Uber is a technology company that develops, markets, and operates mobility and delivery services.',
    avgSalary: '₹48L',
    totalReports: 67,
    levels: ['L3', 'L4', 'L5', 'L6', 'L7'],
    rating: 4.4,
    levelData: {
      'L3': { avg: '₹28L', min: '₹20L', max: '₹36L', reports: 18 },
      'L4': { avg: '₹38L', min: '₹28L', max: '₹48L', reports: 15 },
      'L5': { avg: '₹52L', min: '₹40L', max: '₹64L', reports: 14 },
      'L6': { avg: '₹72L', min: '₹58L', max: '₹86L', reports: 12 },
      'L7': { avg: '₹95L', min: '₹75L', max: '₹115L', reports: 8 },
    }
  },
  'adobe': {
    name: 'Adobe',
    type: 'Product',
    employees: '25K+',
    headquarters: 'Bengaluru, India',
    founded: '1982',
    website: 'https://adobe.com',
    description: 'Adobe is a multinational software company known for creative and digital marketing software.',
    avgSalary: '₹44L',
    totalReports: 78,
    levels: ['SDE 1', 'SDE 2', 'SDE 3', 'Principal'],
    rating: 4.5,
    levelData: {
      'SDE 1': { avg: '₹24L', min: '₹16L', max: '₹32L', reports: 22 },
      'SDE 2': { avg: '₹34L', min: '₹24L', max: '₹44L', reports: 20 },
      'SDE 3': { avg: '₹48L', min: '₹36L', max: '₹60L', reports: 18 },
      'Principal': { avg: '₹65L', min: '₹50L', max: '₹80L', reports: 18 },
    }
  },
  'oracle': {
    name: 'Oracle',
    type: 'Product',
    employees: '160K+',
    headquarters: 'Bengaluru, India',
    founded: '1977',
    website: 'https://oracle.com',
    description: 'Oracle is a multinational technology company specializing in database software and cloud solutions.',
    avgSalary: '₹38L',
    totalReports: 92,
    levels: ['SDE 1', 'SDE 2', 'SDE 3', 'Senior Principal'],
    rating: 4.1,
    levelData: {
      'SDE 1': { avg: '₹20L', min: '₹14L', max: '₹26L', reports: 28 },
      'SDE 2': { avg: '₹30L', min: '₹20L', max: '₹40L', reports: 25 },
      'SDE 3': { avg: '₹42L', min: '₹32L', max: '₹52L', reports: 22 },
      'Senior Principal': { avg: '₹58L', min: '₹45L', max: '₹72L', reports: 17 },
    }
  },
  'salesforce': {
    name: 'Salesforce',
    type: 'Product',
    employees: '70K+',
    headquarters: 'Bengaluru, India',
    founded: '1999',
    website: 'https://salesforce.com',
    description: 'Salesforce is a cloud-based software company providing CRM solutions.',
    avgSalary: '₹46L',
    totalReports: 56,
    levels: ['SDE 1', 'SDE 2', 'SDE 3', 'Lead SDE'],
    rating: 4.6,
    levelData: {
      'SDE 1': { avg: '₹26L', min: '₹18L', max: '₹34L', reports: 16 },
      'SDE 2': { avg: '₹36L', min: '₹26L', max: '₹46L', reports: 15 },
      'SDE 3': { avg: '₹50L', min: '₹38L', max: '₹62L', reports: 14 },
      'Lead SDE': { avg: '₹68L', min: '₹52L', max: '₹84L', reports: 11 },
    }
  }
}

export default function CompanyDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (slug) {
      setTimeout(() => {
        const data = COMPANY_DETAILS[slug]
        setCompany(data || null)
        setLoading(false)
      }, 500)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-blue-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
          <h1 className="text-2xl font-bold text-white mb-2">Company not found</h1>
          <p className="text-blue-300 mb-4">The company you're looking for doesn't exist in our database.</p>
          <Link href="/companies" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Companies
          </Link>
        </div>
      </div>
    )
  }

  const logoUrl = getLogoUrl(company.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/companies" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {/* Company Header */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
              {!imageError ? (
                <img 
                  src={logoUrl}
                  alt={`${company.name} logo`}
                  className="w-16 h-16 object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-4xl font-bold text-blue-400">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  company.type === 'Product' ? 'bg-green-500/30 text-green-300' :
                  company.type === 'Startup' ? 'bg-orange-500/30 text-orange-300' :
                  'bg-purple-500/30 text-purple-300'
                }`}>
                  {company.type}
                </span>
                <span className="text-sm text-blue-300 flex items-center gap-1">
                  <Users className="w-4 h-4" /> {company.employees}
                </span>
                <span className="text-sm text-blue-300 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {company.headquarters}
                </span>
                <span className="text-sm text-blue-300 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Founded {company.founded}
                </span>
                <span className="flex items-center gap-1 text-sm text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" /> {company.rating}
                </span>
              </div>
              <p className="mt-4 text-blue-200 leading-relaxed">{company.description}</p>
              {company.website && (
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-flex items-center gap-1"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{company.levels?.length || 0}</div>
              <div className="text-sm text-blue-300">Levels</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{company.totalReports || 0}</div>
              <div className="text-sm text-blue-300">Salary Reports</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{company.avgSalary}</div>
              <div className="text-sm text-blue-300">Average CTC</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{company.rating}★</div>
              <div className="text-sm text-blue-300">Rating</div>
            </div>
          </div>
        </div>

        {/* Levels */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">💰 Salary by Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.levels?.map((level: string) => {
              const levelData = company.levelData?.[level]
              return (
                <div key={level} className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-blue-400/50 transition hover:bg-white/25">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Level {level}</h3>
                    <Award className="w-5 h-5 text-blue-400" />
                  </div>
                  {levelData && (
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Average</span>
                        <span className="text-green-400 font-semibold">{levelData.avg}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Range</span>
                        <span className="text-white">{levelData.min} - {levelData.max}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Reports</span>
                        <span className="text-blue-400">{levelData.reports}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <p className="text-blue-200">Know your worth at {company.name}</p>
          <Link href="/submit" className="inline-block mt-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition shadow-lg">
            Add Your Salary
          </Link>
        </div>
      </div>
    </div>
  )
}