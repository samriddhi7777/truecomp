'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'

interface SalaryChartProps {
  data: Array<{
    level: string
    count: number
    medianTotal: number
    medianInhand: number
  }>
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff']

const formatCurrency = (value: number) => {
  if (!value) return '₹0'
  if (value >= 100) {
    return `₹${(value / 100).toFixed(1)} Cr`
  }
  return `₹${value.toFixed(1)} L`
}

export function SalaryChart({ data }: SalaryChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No salary data available for this company
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="medianTotal" fill="#3b82f6" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList 
                dataKey="medianTotal" 
                position="top" 
                formatter={(value: number) => formatCurrency(value)}
                style={{ fontSize: '12px', fill: '#374151' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-sm text-gray-500 mt-2">
        Median Total Compensation by Level (in ₹)
      </div>
    </div>
  )
}