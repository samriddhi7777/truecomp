'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const formatCurrency = (value: number) => {
  if (!value) return 'No data'
  if (value >= 100) {
    return `₹${(value / 100).toFixed(1)} Cr`
  }
  return `₹${value.toFixed(1)} L`
}

const formatMonthly = (value: number) => {
  if (!value) return 'No data'
  return `₹${value.toLocaleString()}`
}

// Simple logo function
const getLogoUrl = (companyName: string) => {
  const slug = companyName.toLowerCase().replace(/\s/g, '')
  return `https://logo.dev/${slug}?size=64`
}

export default function CompanyDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [companyData, setCompanyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchCompanyData()
    }
  }, [slug])

  const fetchCompanyData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/companies/${slug}`)
      if (!response.ok) {
        throw new Error('Company not found')
      }
      const data = await response.json()
      setCompanyData(data)
    } catch (error) {
      console.error('Failed to fetch company:', error)
      setError('Company not found')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error || !companyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Company not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const { company, levelStats, totalSubmissions } = companyData
  const levels = Object.keys(levelStats).sort()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">TrueComp</Link>
          <div className="flex gap-6 text-gray-600">
            <Link href="/compare" className="hover:text-gray-900 transition">Compare</Link>
            <Link href="/submit" className="hover:text-gray-900 transition">Submit</Link>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
              {!imageError ? (
                <img 
                  src={getLogoUrl(company.name)}
                  alt={`${company.name} logo`}
                  className="w-16 h-16 object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-3xl font-bold text-blue-600">
                  {company.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {company.type}
                </span>
                <span>•</span>
                <span>{totalSubmissions} salary reports</span>
              </div>
              {company.website && (
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  Visit website →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Salary by Level</h2>

        {levels.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No salary data available for this company yet.</p>
            <Link 
              href="/submit"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              Be the first to add your salary →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {levels.map((level) => {
              const stats = levelStats[level]
              return (
                <div key={level} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Level {level}</h3>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {stats.count} reports
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">📊 Median CTC</span>
                      <span className="font-bold text-gray-800">
                        {formatCurrency(stats.medianTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>💰 Monthly In-Hand</span>
                      <span className="font-bold">
                        {formatMonthly(stats.medianInhand)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 pt-1">
                      <span>📈 Avg YOE: {stats.avgYoe.toFixed(1)} years</span>
                      <span>⚡ {stats.count === 1 ? '1 report' : `${stats.count} reports`}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-blue-900 text-lg mb-2">Help others know their worth</h3>
          <p className="text-blue-700 mb-4">Share your salary at {company.name}</p>
          <Link 
            href="/submit"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Add Your Salary
          </Link>
        </div>
      </div>
    </div>
  )
}