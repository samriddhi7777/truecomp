'use client'

import OfferAnalyzer from '@/components/OfferAnalyzer'
import CareerRoast from '@/components/CareerRoast'
import LevelComparer from '@/components/LevelComparer'
import LayoffTracker from '@/components/LayoffTracker'
import { Sparkles, Zap, BarChart3, TrendingDown, Brain, Rocket, Lightbulb, Star } from 'lucide-react'

export default function AIPage() {
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
              <Sparkles className="w-10 h-10 text-teal-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                AI-Powered Career Tools
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Supercharge your career with AI-driven insights, analysis, and personalized recommendations
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <Brain className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">AI Analysis</h4>
              <p className="text-blue-300 text-xs">Smart insights</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <Rocket className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">Career Growth</h4>
              <p className="text-blue-300 text-xs">Personalized roadmap</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <Lightbulb className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">Market Insights</h4>
              <p className="text-blue-300 text-xs">Real-time data</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <Star className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">Expert Advice</h4>
              <p className="text-blue-300 text-xs">Pro recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Offer Analyzer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-teal-400/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Offer Analyzer</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Upload your offer letter to get real-time market analysis and negotiation insights.
            </p>
            <OfferAnalyzer />
          </div>

          {/* Career Roast */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-orange-400/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Career Roast</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Get brutally honest career feedback from your favorite AI personality.
            </p>
            <CareerRoast />
          </div>

          {/* Level Comparer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-purple-400/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Level Comparator</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Compare level mappings across different companies and understand career progression.
            </p>
            <LevelComparer />
          </div>

          {/* Layoff Tracker */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-red-400/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Layoff Tracker</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Stay updated with the latest layoffs across industries and make informed decisions.
            </p>
            <LayoffTracker />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Transform Your Career?</h3>
          <p className="text-blue-200 mb-4">Use AI-powered insights to make smarter career decisions</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition shadow-lg">
              Get Started
            </button>
            <button className="px-6 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/20">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}