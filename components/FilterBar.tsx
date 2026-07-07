'use client'

interface FilterBarProps {
  level: string
  onLevelChange: (level: string) => void
  industry: string
  onIndustryChange: (industry: string) => void
}

const LEVELS = ['All', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7']
const INDUSTRIES = ['All', 'Tech', 'Finance', 'Healthcare', 'Retail', 'Manufacturing']

export function FilterBar({ 
  level, 
  onLevelChange, 
  industry, 
  onIndustryChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Level:</span>
        <select
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {LEVELS.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Industry:</span>
        <select
          value={industry}
          onChange={(e) => onIndustryChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {INDUSTRIES.map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
    </div>
  )
}