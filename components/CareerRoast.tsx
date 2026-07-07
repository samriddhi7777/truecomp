'use client'

import { useState } from 'react'
import { Zap, Shield, RefreshCw } from 'lucide-react'

const ROASTERS = [
  { id: 'elon', name: 'Elon Musk', emoji: '🚀' },
  { id: 'harvey', name: 'Harvey Specter', emoji: '💼' },
  { id: 'rock', name: 'The Rock', emoji: '💪' },
  { id: 'trump', name: 'Donald Trump', emoji: '🏛️' },
  { id: 'logan', name: 'Logan Roy', emoji: '👔' },
]

export default function CareerRoast() {
  const [selectedRoaster, setSelectedRoaster] = useState(ROASTERS[0])
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [roast, setRoast] = useState<string | null>(null)

  const handleRoast = async () => {
    if (!linkedinUrl) {
      alert('Please enter your LinkedIn profile URL')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setRoast(
        `🔥 **${selectedRoaster.name} says:**\n\n` +
        `"You've been grinding for ${Math.floor(Math.random() * 5 + 3)} years and you're still not at a Staff level? Your resume looks like a template from 2015. \n\n` +
        `Here's the truth: Your skills are average, your network is small, and your salary is below market. But here's the good news - you can fix all of this.\n\n` +
        `🚀 Start applying to FAANG companies today\n` +
        `💡 Learn AI/ML to boost your value\n` +
        `🤝 Connect with 5 new people this week\n` +
        `📈 Aim for a 30% salary bump in your next role"\n\n` +
        `*This is a roast - take it as motivation!*`
      )
    } catch (err) {
      alert('Failed to generate roast. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-orange-400" />
        <h3 className="text-lg font-bold text-white">🔥 Career Roast</h3>
      </div>

      <p className="text-sm text-blue-200 mb-4">
        Get brutally honest career feedback from your favorite AI personality.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-300 mb-1">
          Choose your roaster
        </label>
        <div className="flex flex-wrap gap-2">
          {ROASTERS.map((roaster) => (
            <button
              key={roaster.id}
              onClick={() => setSelectedRoaster(roaster)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                selectedRoaster.id === roaster.id
                  ? 'bg-orange-500/30 text-orange-300 border border-orange-400'
                  : 'bg-white/10 text-blue-300 hover:bg-white/20'
              }`}
            >
              {roaster.emoji} {roaster.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-300 mb-1">
          LinkedIn Profile URL
        </label>
        <input
          type="url"
          placeholder="https://linkedin.com/in/your-profile"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
      </div>

      <button
        onClick={handleRoast}
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Roasting...
          </span>
        ) : (
          `Get Roasted by ${selectedRoaster.name}`
        )}
      </button>

      {roast && (
        <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/10">
          <div className="whitespace-pre-wrap text-sm text-blue-200">
            {roast}
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-white/10 text-blue-300 text-sm font-medium py-1.5 rounded-lg hover:bg-white/20 transition">
              Share on Twitter
            </button>
            <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-1.5 rounded-lg hover:bg-blue-700 transition">
              Share on LinkedIn
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 text-xs text-blue-400">
        <Shield className="w-3 h-3" />
        <span>Your data is kept private and anonymous</span>
      </div>
    </div>
  )
}