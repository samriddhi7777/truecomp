'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Lock, CheckCircle, ArrowLeft, Upload, FileText, Sparkles } from 'lucide-react'

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

const formatTotalComp = (amount: number) => {
  if (!amount) return '₹0'
  if (amount >= 100) {
    return `₹${(amount / 100).toFixed(1)} Cr`
  }
  return `₹${amount.toFixed(1)} L`
}

const formatMonthly = (amount: number) => {
  if (!amount) return '₹0'
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`
  }
  return `₹${amount.toLocaleString()}`
}

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    companyId: '',
    rawBand: '',
    role: '',
    yoe: '',
    location: '',
    baseSalary: '',
    bonus: '',
    stocks: '',
    signingBonus: '',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const payload = {
        companyId: formData.companyId,
        rawBand: formData.rawBand,
        role: formData.role,
        yoe: parseInt(formData.yoe) || 0,
        location: formData.location,
        baseSalary: parseFloat(formData.baseSalary) || 0,
        bonus: parseFloat(formData.bonus) || 0,
        stocks: parseFloat(formData.stocks) || 0,
        signingBonus: parseFloat(formData.signingBonus) || 0,
      }
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setResult({ error: data.error || 'Server error' })
        return
      }
      
      setResult(data)
      
    } catch (error) {
      setResult({ error: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
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
              <Upload className="w-10 h-10 text-teal-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Share Your <span className="text-teal-400">Salary</span>
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Completely anonymous — helps everyone negotiate better
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-6 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-6 bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-300">100% Anonymous • No personal data collected</span>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Company *</label>
                  <select
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.companyId}
                    onChange={(e) => setFormData({...formData, companyId: e.target.value})}
                  >
                    <option value="" className="text-gray-400">Select company</option>
                    {COMPANIES.map(company => (
                      <option key={company.id} value={company.id} className="text-white">{company.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Your Band/Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., SDE 2, L3, Technology Analyst"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.rawBand}
                    onChange={(e) => setFormData({...formData, rawBand: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Role/Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Software Engineer"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-1">Years of Experience *</label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      value={formData.yoe}
                      onChange={(e) => setFormData({...formData, yoe: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Bengaluru"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Base Salary (in Lakhs) *</label>
                  <input
                    type="number"
                    required
                    step="0.1"
                    placeholder="e.g., 20"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
                  />
                  <p className="text-xs text-blue-400 mt-1">Your fixed annual salary</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Bonus (in Lakhs)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.bonus}
                    onChange={(e) => setFormData({...formData, bonus: e.target.value})}
                  />
                  <p className="text-xs text-blue-400 mt-1">Annual performance bonus</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Stocks / RSUs (in Lakhs)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 10"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.stocks}
                    onChange={(e) => setFormData({...formData, stocks: e.target.value})}
                  />
                  <p className="text-xs text-blue-400 mt-1">Annual stock compensation</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Signing Bonus (in Lakhs)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 3"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    value={formData.signingBonus}
                    onChange={(e) => setFormData({...formData, signingBonus: e.target.value})}
                  />
                  <p className="text-xs text-blue-400 mt-1">One-time signing bonus</p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-teal-600 hover:to-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Anonymously'}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Why Contribute?</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Help Others</p>
                    <p className="text-xs text-blue-300">Your data helps others negotiate better</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">100% Anonymous</p>
                    <p className="text-xs text-blue-300">No personal data is ever stored</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Verified Data</p>
                    <p className="text-xs text-blue-300">All submissions are verified for accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 max-w-2xl mx-auto">
            <div className={`p-4 rounded-lg ${
              result.success 
                ? result.submission?.alreadyExists 
                  ? 'bg-yellow-500/20 border border-yellow-500/30' 
                  : 'bg-green-500/20 border border-green-500/30'
                : 'bg-red-500/20 border border-red-500/30'
            }`}>
              {result.success ? (
                <div>
                  {result.submission?.alreadyExists ? (
                    <>
                      <p className="text-yellow-300 font-semibold">✅ Already in our system!</p>
                      <p className="text-yellow-200 text-sm mt-1">
                        This data was already in our system. We've added your verification vote!
                      </p>
                    </>
                  ) : (
                    <p className="text-green-300 font-semibold">✅ Submitted successfully!</p>
                  )}
                  <div className="mt-2 space-y-1 text-sm text-blue-200">
                    <p>
                      📊 Level: <strong className="text-white">{result.submission?.normalizedLevel || 'L3'}</strong>
                    </p>
                    <p>
                      💰 Total Compensation: <strong className="text-white">{formatTotalComp(result.submission?.totalComp || 0)}</strong>
                    </p>
                    <p>
                      💵 Monthly In-Hand: <strong className="text-white">{formatMonthly(result.submission?.monthlyInhand || 0)}</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-red-300 font-semibold">❌ Error</p>
                  <p className="text-red-200 text-sm mt-1">{result.error || 'Something went wrong'}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}