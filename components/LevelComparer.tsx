'use client'

import { useState } from 'react'
import { BarChart3 } from 'lucide-react'

const COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix'
]

const LEVEL_MAPPINGS: Record<string, Record<string, string>> = {
  'Google': { 'L3': 'Entry', 'L4': 'Junior', 'L5': 'Senior', 'L6': 'Staff', 'L7': 'Principal' },
  'Amazon': { 'L4': 'Entry', 'L5': 'Junior', 'L6': 'Senior', 'L7': 'Staff', 'L8': 'Principal' },
  'Microsoft': { '59': 'Entry', '60': 'Junior', '61': 'Senior', '62': 'Staff', '63': 'Principal' },
  'Meta': { 'E3': 'Entry', 'E4': 'Junior', 'E5': 'Senior', 'E6': 'Staff', 'E7': 'Principal' },
  'Apple': { 'ICT2': 'Entry', 'ICT3': 'Junior', 'ICT4': 'Senior', 'ICT5': 'Staff', 'ICT6': 'Principal' },
  'Netflix': { 'L3': 'Junior', 'L4': 'Senior', 'L5': 'Staff' },
}

export default function LevelComparer() {
  const [company1, setCompany1] = useState('Google')
  const [company2, setCompany2] = useState('Amazon')
  const [level1, setLevel1] = useState('L3')
  const [level2, setLevel2] = useState('L4')
  const [comparison, setComparison] = useState<string | null>(null)

  const handleCompare = () => {
    const title1 = LEVEL_MAPPINGS[company1]?.[level1] || 'Unknown'
    const title2 = LEVEL_MAPPINGS[company2]?.[level2] || 'Unknown'
    
    setComparison(
      `📊 **Level Comparison**\n\n` +
      `**${company1}** ${level1} → ${title1}\n` +
      `**${company2}** ${level2} → ${title2}\n\n` +
      `💡 **Insight:** ${title1} is equivalent to ${title2} in the other company's structure.`
    )
  }

  const getLevelsForCompany = (company: string) => {
    return Object.keys(LEVEL_MAPPINGS[company] || {})
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">Level Comparator</h3>
      </div>

      <p className="text-sm text-blue-200 mb-4">
        Compare level mappings across different companies.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-300 mb-1">Company 1</label>
          <select
            value={company1}
            onChange={(e) => setCompany1(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          >
            {COMPANIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={level1}
            onChange={(e) => setLevel1(e.target.value)}
            className="w-full mt-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          >
            {getLevelsForCompany(company1).map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-300 mb-1">Company 2</label>
          <select
            value={company2}
            onChange={(e) => setCompany2(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          >
            {COMPANIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={level2}
            onChange={(e) => setLevel2(e.target.value)}
            className="w-full mt-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          >
            {getLevelsForCompany(company2).map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCompare}
        className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
      >
        Compare Levels
      </button>

      {comparison && (
        <div className="mt-4 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
          <div className="whitespace-pre-wrap text-sm text-blue-200">
            {comparison}
          </div>
        </div>
      )}
    </div>
  )
}