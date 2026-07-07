'use client'

import Link from 'next/link'

interface CompanyCardProps {
  company: {
    id: string
    name: string
    slug: string
    logoUrl?: string
  }
  salary: number
  count: number
  level: string
}

export function CompanyCard({ company, salary, count, level }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.slug}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition cursor-pointer">
        <div className="flex items-center gap-4">
          {company.logoUrl && (
            <img 
              src={company.logoUrl} 
              alt={company.name}
              className="w-12 h-12 rounded-lg object-contain bg-gray-50"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{company.name}</h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-600 font-medium">
                ₹{salary.toLocaleString()}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{count} reports</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Level {level}</span>
            </div>
          </div>
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            + Add
          </button>
        </div>
      </div>
    </Link>
  )
}