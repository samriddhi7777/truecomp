'use client'

import { useState } from 'react'

export function SalaryCalculator() {
  const [ctc, setCtc] = useState<number>(25)
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new')
  const [location, setLocation] = useState('Bengaluru')

  const calculateInHand = () => {
    const annualCtc = ctc * 100000 // Convert lakhs to rupees
    
    // PF Calculation (12% of basic, capped at 2.16L)
    const pf = Math.min(annualCtc * 0.12, 216000)
    
    // Gratuity (4.81% of basic)
    const gratuity = annualCtc * 0.0481
    
    // Professional Tax (varies by state)
    const professionalTax = location.includes('Bengaluru') ? 2400 : 2500
    
    // Standard Deduction
    const standardDeduction = 50000
    
    // Taxable Income
    let taxableIncome = annualCtc - pf - gratuity - professionalTax - standardDeduction
    
    // Income Tax Calculation
    let incomeTax = 0
    
    if (taxRegime === 'new') {
      // New Tax Regime (FY 2023-24)
      if (taxableIncome > 1500000) {
        incomeTax += (taxableIncome - 1500000) * 0.30
        taxableIncome = 1500000
      }
      if (taxableIncome > 1200000) {
        incomeTax += (taxableIncome - 1200000) * 0.20
        taxableIncome = 1200000
      }
      if (taxableIncome > 900000) {
        incomeTax += (taxableIncome - 900000) * 0.15
        taxableIncome = 900000
      }
      if (taxableIncome > 600000) {
        incomeTax += (taxableIncome - 600000) * 0.10
        taxableIncome = 600000
      }
      if (taxableIncome > 300000) {
        incomeTax += (taxableIncome - 300000) * 0.05
      }
    } else {
      // Old Tax Regime
      if (taxableIncome > 1000000) {
        incomeTax += (taxableIncome - 1000000) * 0.30
        taxableIncome = 1000000
      }
      if (taxableIncome > 500000) {
        incomeTax += (taxableIncome - 500000) * 0.20
        taxableIncome = 500000
      }
      if (taxableIncome > 250000) {
        incomeTax += (taxableIncome - 250000) * 0.05
      }
    }
    
    // Health & Education Cess (4%)
    const cess = incomeTax * 0.04
    const totalTax = incomeTax + cess
    
    const annualInHand = annualCtc - pf - gratuity - professionalTax - totalTax
    const monthlyInHand = Math.round(annualInHand / 12)
    
    return {
      monthlyInHand,
      annualInHand: Math.round(annualInHand),
      deductions: {
        pf: Math.round(pf),
        gratuity: Math.round(gratuity),
        professionalTax,
        incomeTax: Math.round(totalTax),
      }
    }
  }

  const result = calculateInHand()

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">💰 CTC to In-Hand Calculator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual CTC (in Lakhs)
          </label>
          <input
            type="range"
            min="3"
            max="100"
            step="0.5"
            value={ctc}
            onChange={(e) => setCtc(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>₹{ctc} L</span>
            <span>₹{(ctc * 100000).toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Regime
            </label>
            <select
              value={taxRegime}
              onChange={(e) => setTaxRegime(e.target.value as 'old' | 'new')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="new">New Regime</option>
              <option value="old">Old Regime</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="text-sm text-green-600">Monthly In-Hand</div>
          <div className="text-2xl font-bold text-green-700">
            ₹{result.monthlyInHand.toLocaleString()}
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-sm text-blue-600">Annual In-Hand</div>
          <div className="text-2xl font-bold text-blue-700">
            ₹{result.annualInHand.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-700 mb-2">Deductions Breakdown</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">PF (12% of basic)</span>
            <span className="font-medium">₹{result.deductions.pf.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gratuity (4.81%)</span>
            <span className="font-medium">₹{result.deductions.gratuity.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Professional Tax</span>
            <span className="font-medium">₹{result.deductions.professionalTax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
            <span className="text-gray-600 font-semibold">Income Tax + Cess</span>
            <span className="font-bold text-red-600">₹{result.deductions.incomeTax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm bg-gray-50 rounded-lg p-2">
            <span className="text-gray-700 font-semibold">Total Deductions</span>
            <span className="font-bold text-gray-800">
              ₹{(result.deductions.pf + result.deductions.gratuity + result.deductions.professionalTax + result.deductions.incomeTax).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-blue-700">
          💡 This is an estimate. Actual in-hand may vary based on company policies and tax planning.
        </p>
      </div>
    </div>
  )
}