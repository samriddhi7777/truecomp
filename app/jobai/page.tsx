'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Briefcase, 
  Sparkles, 
  Zap, 
  Users, 
  CheckCircle,
  Filter,
  Brain,
  Loader2,
  List,
  Grid,
  X,
  User,
  Building2,
  Code,
  MapPin,
  Award
} from 'lucide-react'

// Types
interface Job {
  id: string
  title: string
  company: string
  companyId: string
  location: string
  type: string
  experience: string
  salary: string
  skills: string[]
  matchScore: number
  posted: string
  logo: string
  description?: string
  requirements?: string[]
}

interface JobStats {
  matched: number
  autoApplied: number
  applied: number
  interviews: number
  offers: number
}

// Mock jobs data
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Google',
    companyId: 'google',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '5-8 years',
    salary: '₹35L - ₹55L',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    matchScore: 92,
    posted: '2 days ago',
    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    description: 'Build and maintain large-scale distributed systems for Google\'s core products.',
    requirements: ['5+ years of experience', 'Strong knowledge of data structures and algorithms', 'Experience with cloud platforms']
  },
  {
    id: '2',
    title: 'SDE 2',
    company: 'Amazon',
    companyId: 'amazon',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹25L - ₹40L',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    matchScore: 88,
    posted: '3 days ago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png',
    description: 'Design and implement scalable microservices for Amazon\'s e-commerce platform.',
    requirements: ['3+ years of experience', 'Experience with distributed systems', 'Strong problem-solving skills']
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'Microsoft',
    companyId: 'microsoft',
    location: 'Remote, India',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹20L - ₹35L',
    skills: ['C#', '.NET', 'Azure', 'React'],
    matchScore: 75,
    posted: '1 week ago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1280px-Microsoft_logo.svg.png',
    description: 'Develop cloud-native applications using Microsoft Azure and modern web technologies.',
    requirements: ['2+ years of experience', 'Experience with cloud platforms', 'Knowledge of modern web frameworks']
  },
  {
    id: '4',
    title: 'Tech Lead',
    company: 'Flipkart',
    companyId: 'flipkart',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '7-10 years',
    salary: '₹40L - ₹65L',
    skills: ['Python', 'Django', 'AWS', 'Team Management'],
    matchScore: 68,
    posted: '4 days ago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flipkart_logo.svg/1280px-Flipkart_logo.svg.png',
    description: 'Lead a team of engineers building Flipkart\'s next-generation e-commerce platform.',
    requirements: ['7+ years of experience', 'Experience leading engineering teams', 'Strong architectural skills']
  },
  {
    id: '5',
    title: 'Principal Engineer',
    company: 'Uber',
    companyId: 'uber',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '8-12 years',
    salary: '₹50L - ₹80L',
    skills: ['Go', 'Distributed Systems', 'Kubernetes', 'AWS'],
    matchScore: 45,
    posted: '5 days ago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1280px-Uber_logo_2018.svg.png',
    description: 'Architect and build high-scale distributed systems for Uber\'s mobility platform.',
    requirements: ['8+ years of experience', 'Experience with distributed systems', 'Strong system design skills']
  },
  {
    id: '6',
    title: 'Senior Backend Engineer',
    company: 'Adobe',
    companyId: 'adobe',
    location: 'Noida, India',
    type: 'Full-time',
    experience: '5-8 years',
    salary: '₹30L - ₹50L',
    skills: ['Java', 'Spring', 'PostgreSQL', 'Redis'],
    matchScore: 82,
    posted: '1 week ago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_logo.svg/1280px-Adobe_Corporate_logo.svg.png',
    description: 'Build and maintain backend services for Adobe\'s creative cloud products.',
    requirements: ['5+ years of experience', 'Experience with high-scale systems', 'Strong database knowledge']
  },
]

// AI Job Categories with icons
const AI_CATEGORIES = [
  { id: 'matched', label: 'Matched Jobs', icon: Sparkles, color: 'text-blue-400' },
  { id: 'auto-apply', label: 'Auto-Apply', icon: Zap, color: 'text-purple-400' },
  { id: 'applied', label: 'Applied', icon: CheckCircle, color: 'text-green-400' },
  { id: 'interviews', label: 'Interviews', icon: Users, color: 'text-orange-400' },
]

export default function JobAIPage() {
  const [activeTab, setActiveTab] = useState('matched')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [interviewJobs, setInterviewJobs] = useState<string[]>([])
  const [offerJobs, setOfferJobs] = useState<string[]>([])
  const [autoApplying, setAutoApplying] = useState<string | null>(null)

  // Stats that update based on actions
  const [stats, setStats] = useState<JobStats>({
    matched: MOCK_JOBS.length,
    autoApplied: 0,
    applied: 0,
    interviews: 0,
    offers: 0
  })

  // Update stats whenever lists change
  useEffect(() => {
    setStats({
      matched: jobs.filter(job => !appliedJobs.includes(job.id) && !interviewJobs.includes(job.id) && !offerJobs.includes(job.id)).length,
      autoApplied: appliedJobs.length + interviewJobs.length + offerJobs.length,
      applied: appliedJobs.length,
      interviews: interviewJobs.length,
      offers: offerJobs.length
    })
  }, [jobs, appliedJobs, interviewJobs, offerJobs])

  const filteredJobs = jobs.filter(job => {
    // Filter by search
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // Filter by tab
    if (activeTab === 'matched') {
      return matchesSearch && !appliedJobs.includes(job.id) && !interviewJobs.includes(job.id) && !offerJobs.includes(job.id)
    }
    if (activeTab === 'auto-apply') {
      return matchesSearch && (appliedJobs.includes(job.id) || interviewJobs.includes(job.id) || offerJobs.includes(job.id))
    }
    if (activeTab === 'applied') {
      return matchesSearch && appliedJobs.includes(job.id)
    }
    if (activeTab === 'interviews') {
      return matchesSearch && interviewJobs.includes(job.id)
    }
    return matchesSearch
  })

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-gray-400'
  }

  const getMatchBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20'
    if (score >= 60) return 'bg-yellow-500/20'
    return 'bg-gray-500/20'
  }

  const handleAutoApply = async (jobId: string) => {
    setAutoApplying(jobId)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Move job to applied
    setAppliedJobs(prev => [...prev, jobId])
    setAutoApplying(null)
  }

  const handleMoveToInterview = (jobId: string) => {
    setAppliedJobs(prev => prev.filter(id => id !== jobId))
    setInterviewJobs(prev => [...prev, jobId])
  }

  const handleMoveToOffer = (jobId: string) => {
    setInterviewJobs(prev => prev.filter(id => id !== jobId))
    setOfferJobs(prev => [...prev, jobId])
  }

  const handleApplyAll = async () => {
    setLoading(true)
    const jobIds = filteredJobs.map(job => job.id)
    for (const id of jobIds) {
      await new Promise(resolve => setTimeout(resolve, 300))
      if (!appliedJobs.includes(id) && !interviewJobs.includes(id) && !offerJobs.includes(id)) {
        setAppliedJobs(prev => [...prev, id])
      }
    }
    setLoading(false)
  }

  const getCompanyLogo = (company: string) => {
    const logos: Record<string, string> = {
      'Google': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png',
      'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1280px-Microsoft_logo.svg.png',
      'Flipkart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flipkart_logo.svg/1280px-Flipkart_logo.svg.png',
      'Uber': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1280px-Uber_logo_2018.svg.png',
      'Adobe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_logo.svg/1280px-Adobe_Corporate_logo.svg.png',
    }
    return logos[company] || `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&size=48&background=3b82f6&color=fff&bold=true`
  }

  const getJobStatus = (jobId: string) => {
    if (offerJobs.includes(jobId)) return 'offer'
    if (interviewJobs.includes(jobId)) return 'interview'
    if (appliedJobs.includes(jobId)) return 'applied'
    return 'matched'
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'offer':
        return <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/30 text-green-300">🎉 Offer</span>
      case 'interview':
        return <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300">📅 Interview</span>
      case 'applied':
        return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300">✅ Applied</span>
      default:
        return null
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
        
        <div className="max-w-7xl mx-auto px-4 py-12 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-10 h-10 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                AI Job <span className="text-purple-400">Copilot</span>
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Let AI find and apply to jobs that match your profile
            </p>
          </div>

          {/* Stats - Now dynamic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-purple-400">{stats.matched}</div>
              <div className="text-sm text-blue-300">Matched Jobs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-green-400">{stats.autoApplied}</div>
              <div className="text-sm text-blue-300">Auto-Applied</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-blue-400">{stats.applied}</div>
              <div className="text-sm text-blue-300">Applied</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-orange-400">{stats.interviews}</div>
              <div className="text-sm text-blue-300">Interviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Auto-Apply Mode Toggle */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white">Auto-Apply Mode</h3>
                <p className="text-sm text-blue-300">AI automatically applies to jobs that match your profile</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-300">Auto Applies Used: {stats.autoApplied}/10</span>
              <button
                onClick={() => setIsAutoMode(!isAutoMode)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  isAutoMode 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {isAutoMode ? 'Auto-Apply Active' : 'Enable Auto-Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {AI_CATEGORIES.map((category) => {
            const Icon = category.icon
            const isActive = activeTab === category.id
            const counts = {
              matched: stats.matched,
              'auto-apply': stats.autoApplied,
              applied: stats.applied,
              interviews: stats.interviews
            }
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-purple-500/30 text-white border border-purple-400'
                    : 'bg-white/10 text-blue-300 hover:bg-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${category.color}`} />
                {category.label}
                <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {counts[category.id as keyof typeof counts] || 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-purple-500/30 text-white' : 'bg-white/10 text-blue-300 hover:bg-white/20'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-purple-500/30 text-white' : 'bg-white/10 text-blue-300 hover:bg-white/20'}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2 bg-white/10 text-blue-300 rounded-lg hover:bg-white/20 transition"
            >
              <Filter className="w-5 h-5" />
            </button>
            {isAutoMode && filteredJobs.length > 0 && (
              <button
                onClick={handleApplyAll}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                Apply All
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-blue-300 mb-1">Location</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option>All Locations</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Experience</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option>All Levels</option>
                  <option>2-4 years</option>
                  <option>5-8 years</option>
                  <option>8+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Job Type</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Sort By</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option>Match Score</option>
                  <option>Recent</option>
                  <option>Salary</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
            <p className="text-blue-300">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-white">No jobs found</h3>
            <p className="text-blue-300 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredJobs.map((job) => {
              const status = getJobStatus(job.id)
              const isApplying = autoApplying === job.id
              const logo = getCompanyLogo(job.company)

              return (
                <div
                  key={job.id}
                  className={`bg-white/10 backdrop-blur-md rounded-xl border p-5 transition cursor-pointer ${
                    status === 'offer' ? 'border-green-400/50 bg-green-500/10' :
                    status === 'interview' ? 'border-orange-400/50 bg-orange-500/10' :
                    status === 'applied' ? 'border-blue-400/50 bg-blue-500/10' :
                    'border-white/10 hover:border-purple-400/50 hover:bg-white/15'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img 
                        src={logo} 
                        alt={job.company}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span className="text-lg font-bold text-blue-400">${job.company.charAt(0)}</span>`
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-white">{job.title}</h3>
                          <p className="text-sm text-blue-300">{job.company} • {job.location}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchBg(job.matchScore)} ${getMatchColor(job.matchScore)}`}>
                            {job.matchScore}% Match
                          </div>
                          {getStatusBadge(status)}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-blue-300">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-blue-300">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                        <div className="text-sm text-green-400 font-medium">{job.salary}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-blue-300">{job.posted}</span>
                          {status === 'matched' && isAutoMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleAutoApply(job.id)
                              }}
                              disabled={isApplying}
                              className="text-xs px-3 py-1 bg-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/50 transition disabled:opacity-50"
                            >
                              {isApplying ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Apply'}
                            </button>
                          )}
                          {status === 'applied' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveToInterview(job.id)
                              }}
                              className="text-xs px-3 py-1 bg-orange-500/30 text-orange-300 rounded-lg hover:bg-orange-500/50 transition"
                            >
                              Got Interview
                            </button>
                          )}
                          {status === 'interview' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveToOffer(job.id)
                              }}
                              className="text-xs px-3 py-1 bg-green-500/30 text-green-300 rounded-lg hover:bg-green-500/50 transition"
                            >
                              Got Offer 🎉
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src={getCompanyLogo(selectedJob.company)} 
                    alt={selectedJob.company}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `<span className="text-2xl font-bold text-blue-400">${selectedJob.company.charAt(0)}</span>`
                      }
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  <p className="text-blue-300">{selectedJob.company} • {selectedJob.location}</p>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">{selectedJob.type}</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">{selectedJob.experience}</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">{selectedJob.salary}</span>
              </div>

              {selectedJob.description && (
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">📋 Job Description</h4>
                  <p className="text-sm text-blue-200">{selectedJob.description}</p>
                </div>
              )}

              {selectedJob.requirements && (
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">✅ Requirements</h4>
                  <ul className="list-disc list-inside text-sm text-blue-200 space-y-1">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">✨ AI Match Analysis</h4>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-purple-400">{selectedJob.matchScore}%</div>
                  <div>
                    <p className="text-sm text-blue-300">Match Score</p>
                    <p className="text-xs text-blue-400">
                      {selectedJob.matchScore >= 80 ? 'Excellent match! You\'re a top candidate.' :
                       selectedJob.matchScore >= 60 ? 'Good match. Consider applying.' :
                       'Fair match. You may need to upskill.'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-blue-300 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-white/10">
                {getJobStatus(selectedJob.id) === 'matched' ? (
                  <button
                    onClick={() => {
                      handleAutoApply(selectedJob.id)
                      setSelectedJob(null)
                    }}
                    disabled={autoApplying === selectedJob.id}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50"
                  >
                    {autoApplying === selectedJob.id ? (
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    ) : (
                      <Sparkles className="w-4 h-4 inline mr-2" />
                    )}
                    AI Auto-Apply
                  </button>
                ) : getJobStatus(selectedJob.id) === 'applied' ? (
                  <button
                    onClick={() => {
                      handleMoveToInterview(selectedJob.id)
                      setSelectedJob(null)
                    }}
                    className="flex-1 bg-orange-500/30 text-orange-300 px-6 py-2.5 rounded-lg font-medium hover:bg-orange-500/50 transition"
                  >
                    📅 Mark as Interview
                  </button>
                ) : getJobStatus(selectedJob.id) === 'interview' ? (
                  <button
                    onClick={() => {
                      handleMoveToOffer(selectedJob.id)
                      setSelectedJob(null)
                    }}
                    className="flex-1 bg-green-500/30 text-green-300 px-6 py-2.5 rounded-lg font-medium hover:bg-green-500/50 transition"
                  >
                    🎉 Mark as Offer
                  </button>
                ) : (
                  <button className="flex-1 bg-green-500/20 text-green-300 px-6 py-2.5 rounded-lg font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Offer Received
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}