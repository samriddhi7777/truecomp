'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Award, BarChart3, TrendingUp, Users, ChevronDown } from 'lucide-react'

const COMPANIES = [
  { id: 'google', name: 'Google' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'flipkart', name: 'Flipkart' },
  { id: 'infosys', name: 'Infosys' },
  { id: 'tcs', name: 'TCS' },
  { id: 'wipro', name: 'Wipro' },
  { id: 'uber', name: 'Uber' },
  { id: 'adobe', name: 'Adobe' },
  { id: 'oracle', name: 'Oracle' },
]

const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8']

const formatTotalComp = (amount: number) => {
  if (!amount || amount === 0) return 'No data'
  if (amount >= 100) {
    return `₹${(amount / 100).toFixed(1)} Cr`
  }
  return `₹${amount.toFixed(1)} L`
}

const formatMonthly = (amount: number) => {
  if (!amount || amount === 0) return 'No data'
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`
  }
  return `₹${amount.toLocaleString()}`
}

export default function ComparePage() {
  const [company1, setCompany1] = useState('google')
  const [company2, setCompany2] = useState('amazon')
  const [level, setLevel] = useState('L3')
  const [data1, setData1] = useState<any>(null)
  const [data2, setData2] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [company1, company2, level])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/compare?companyId=${company1}&level=${level}`),
        fetch(`/api/compare?companyId=${company2}&level=${level}`),
      ])

      if (!res1.ok || !res2.ok) {
        throw new Error(`Failed to fetch data`)
      }

      const data1 = await res1.json()
      const data2 = await res2.json()
      
      setData1(data1)
      setData2(data2)
    } catch (error) {
      console.error('Failed to fetch:', error)
      setError('Failed to load comparison data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getCompanyName = (id: string) => COMPANIES.find(c => c.id === id)?.name || id

  const renderComparisonCard = (companyId: string, data: any) => {
    const name = getCompanyName(companyId)
    const hasData = data?.data && data.count > 0
    
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-blue-400/50 transition">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <p className="text-sm text-blue-300">Level {level}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {hasData ? (
            <>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-blue-300">📊 Median CTC</span>
                <span className="text-xl font-bold text-white">
                  {formatTotalComp(data.data.medianTotal)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-blue-300">💰 Monthly In-Hand</span>
                <span className="text-xl font-bold text-green-400">
                  {formatMonthly(data.data.medianMonthly)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-blue-300">📈 Avg YOE</span>
                <span className="font-semibold text-white">{data.data.averageYoe} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-300">👥 Reports</span>
                <span className="font-semibold text-white">{data.count}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-blue-300">No data available for this level</p>
              <p className="text-sm text-blue-400 mt-2">Be the first to contribute!</p>
            </div>
          )}
        </div>
      </div>
    )
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
              <BarChart3 className="w-10 h-10 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Compare <span className="text-blue-400">Salaries</span>
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              See real in-hand salaries across companies and make informed decisions
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Company 1</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={company1}
                onChange={(e) => setCompany1(e.target.value)}
              >
                {COMPANIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Company 2</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={company2}
                onChange={(e) => setCompany2(e.target.value)}
              >
                {COMPANIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Level</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                {LEVELS.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 mb-4">
            ❌ {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-blue-300">Loading comparison data...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {renderComparisonCard(company1, data1)}
            {renderComparisonCard(company2, data2)}
          </div>
        )}

        {/* Difference Banner */}
        {data1?.data && data2?.data && (
          <div className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-bold text-white">💰 Salary Difference</h3>
                <p className="text-blue-200">
                  {getCompanyName(company1)} offers 
                  <span className="font-bold text-white mx-1">
                    {formatTotalComp(Math.abs(data1.data.medianTotal - data2.data.medianTotal))}
                  </span>
                  {data1.data.medianTotal > data2.data.medianTotal ? 'more' : 'less'} than {getCompanyName(company2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">📊 Want to see more data?</h3>
          <p className="text-blue-200 mb-4">Help us grow our database by sharing your salary anonymously</p>
          <Link href="/submit" className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition shadow-lg">
            Add Your Salary
          </Link>
        </div>
      </div>
    </div>
  )
}