'use client'

import { useState } from 'react'
import { Upload, FileText, Sparkles, X } from 'lucide-react'

export default function OfferAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload an offer letter first')
      return
    }

    setAnalyzing(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setAnalysis({
        company: 'Google',
        role: 'Software Engineer',
        level: 'L4',
        totalComp: 3500000,
        baseSalary: 2500000,
        bonus: 500000,
        stocks: 500000,
        marketPercentile: 75,
        recommendation: 'above',
        insights: [
          'Your offer is in the top 25% for this role',
          'Base salary is competitive for your experience level',
          'Stock component could be negotiated higher',
          'Consider asking for a signing bonus'
        ]
      })
    } catch (err) {
      setError('Failed to analyze offer. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setAnalysis(null)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-teal-400" />
        <h3 className="text-lg font-bold text-white">Offer Analyzer</h3>
      </div>

      {!analysis ? (
        <>
          <p className="text-sm text-blue-200 mb-4">
            Upload your offer letter to get real-time market analysis and negotiation insights.
          </p>

          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-teal-400 transition relative">
            {file ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-teal-400" />
                  <span className="text-sm text-white truncate">{file.name}</span>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-300">Drag & drop your offer letter or click to browse</p>
                <p className="text-xs text-blue-400 mt-1">PDF, DOC, DOCX supported</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || analyzing}
            className="mt-4 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-2 rounded-lg hover:from-teal-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                Analyzing...
              </span>
            ) : (
              'Analyze Offer'
            )}
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-blue-400">Company</p>
              <p className="font-semibold text-white">{analysis.company}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-blue-400">Role</p>
              <p className="font-semibold text-white">{analysis.role}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-blue-400">Level</p>
              <p className="font-semibold text-white">{analysis.level}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-blue-400">Market Percentile</p>
              <p className="font-semibold text-white">{analysis.marketPercentile}th</p>
            </div>
          </div>

          <div className={`rounded-lg p-3 ${
            analysis.recommendation === 'above' ? 'bg-green-500/20 border border-green-500/30' :
            analysis.recommendation === 'below' ? 'bg-red-500/20 border border-red-500/30' :
            'bg-yellow-500/20 border border-yellow-500/30'
          }`}>
            <p className="font-semibold text-white">
              {analysis.recommendation === 'above' ? '✅ Competitive Offer' :
               analysis.recommendation === 'below' ? '⚠️ Below Market Average' :
               '📊 On Par with Market'}
            </p>
          </div>

          <div>
            <p className="font-semibold text-white mb-2">💡 Insights</p>
            <ul className="space-y-1">
              {analysis.insights.map((insight: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-200">
                  <span className="text-teal-400">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setAnalysis(null)}
            className="w-full bg-white/10 text-white font-medium py-2 rounded-lg hover:bg-white/20 transition"
          >
            Analyze Another Offer
          </button>
        </div>
      )}
    </div>
  )
}