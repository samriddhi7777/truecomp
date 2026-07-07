'use client'

import { useState } from 'react'
import { AlertTriangle, Calendar, Building2, TrendingDown } from 'lucide-react'

interface Layoff {
  company: string
  date: string
  employeesAffected: number
  industry: string
  source: string
}

const mockLayoffs: Layoff[] = [
  { company: 'TechCorp', date: '2026-01-15', employeesAffected: 500, industry: 'Technology', source: 'TechCrunch' },
  { company: 'FinTech Inc', date: '2026-01-10', employeesAffected: 200, industry: 'Finance', source: 'Bloomberg' },
  { company: 'HealthTech', date: '2026-01-05', employeesAffected: 150, industry: 'Healthcare', source: 'Reuters' },
  { company: 'CloudSys', date: '2025-12-20', employeesAffected: 300, industry: 'Technology', source: 'TechCrunch' },
  { company: 'DataFlow', date: '2025-12-15', employeesAffected: 100, industry: 'Technology', source: 'Reuters' },
]

export default function LayoffTracker() {
  const [layoffs] = useState<Layoff[]>(mockLayoffs)
  const [filter, setFilter] = useState('All')

  const industries = ['All', ...new Set(layoffs.map(l => l.industry))]

  const filteredLayoffs = filter === 'All' 
    ? layoffs 
    : layoffs.filter(l => l.industry === filter)

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown className="w-5 h-5 text-red-400" />
        <h3 className="text-lg font-bold text-white">📊 Layoff Tracker</h3>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {industries.map(industry => (
          <button
            key={industry}
            onClick={() => setFilter(industry)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === industry
                ? 'bg-red-500/30 text-red-300 border border-red-400'
                : 'bg-white/10 text-blue-300 hover:bg-white/20'
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[250px] overflow-y-auto">
        {filteredLayoffs.length === 0 ? (
          <p className="text-center text-blue-300 py-4">No layoffs recorded in this industry</p>
        ) : (
          filteredLayoffs.map((layoff, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white">{layoff.company}</span>
                </div>
                <span className="text-sm font-medium text-red-400">
                  {layoff.employeesAffected} affected
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-blue-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {layoff.date}
                </span>
                <span>{layoff.industry}</span>
                <span>Source: {layoff.source}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30 text-xs text-yellow-300">
        <AlertTriangle className="w-4 h-4 inline mr-1" />
        Data is for informational purposes only. Verify through official sources.
      </div>
    </div>
  )
}