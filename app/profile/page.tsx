'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Briefcase, 
  Code, 
  MapPin, 
  Award, 
  Save, 
  Edit, 
  Plus, 
  X,
  CheckCircle,
  AlertCircle,
  Building2,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  Calendar,
  FileText,
  Sparkles,
  Shield,
  ArrowLeft
} from 'lucide-react'

// Skill categories
const SKILL_CATEGORIES = [
  { id: 'frontend', label: 'Frontend', color: 'bg-blue-500/20 text-blue-300' },
  { id: 'backend', label: 'Backend', color: 'bg-green-500/20 text-green-300' },
  { id: 'cloud', label: 'Cloud & DevOps', color: 'bg-purple-500/20 text-purple-300' },
  { id: 'data', label: 'Data & AI', color: 'bg-orange-500/20 text-orange-300' },
  { id: 'mobile', label: 'Mobile', color: 'bg-pink-500/20 text-pink-300' },
  { id: 'other', label: 'Other', color: 'bg-gray-500/20 text-gray-300' },
]

// Popular skills with categories
const POPULAR_SKILLS = [
  { name: 'React', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML/CSS', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Java', category: 'backend' },
  { name: 'C#', category: 'backend' },
  { name: 'Go', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  
  { name: 'AWS', category: 'cloud' },
  { name: 'Azure', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
  { name: 'Kubernetes', category: 'cloud' },
  { name: 'Terraform', category: 'cloud' },
  { name: 'CI/CD', category: 'cloud' },
  { name: 'Git', category: 'cloud' },
  { name: 'Linux', category: 'cloud' },
  
  { name: 'Machine Learning', category: 'data' },
  { name: 'Data Science', category: 'data' },
  { name: 'SQL', category: 'data' },
  { name: 'Python (Data)', category: 'data' },
  { name: 'TensorFlow', category: 'data' },
  { name: 'Power BI', category: 'data' },
  
  { name: 'React Native', category: 'mobile' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'Swift', category: 'mobile' },
  { name: 'Kotlin', category: 'mobile' },
  { name: 'Android', category: 'mobile' },
]

const COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Flipkart', 'Infosys', 
  'TCS', 'Wipro', 'Uber', 'Adobe', 'Oracle', 'Salesforce',
  'Razorpay', 'Swiggy', 'Zepto', 'HCL', 'Tech Mahindra'
]

const EXPERIENCE_LEVELS = [
  { value: 'fresher', label: 'Fresher (0-1 years)' },
  { value: 'junior', label: 'Junior (1-3 years)' },
  { value: 'mid', label: 'Mid-Level (3-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead (8-12 years)' },
  { value: 'principal', label: 'Principal (12+ years)' },
]

const LOCATIONS = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 
  'Chennai', 'Pune', 'Remote', 'Kolkata', 'Ahmedabad'
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // User profile data
  const [profile, setProfile] = useState({
    name: 'Samriddhi Kumar',
    email: 'samriddhi@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru',
    experience: 'mid',
    currentCompany: '',
    jobTitle: 'Software Engineer',
    about: 'Passionate software engineer with 4 years of experience in building scalable web applications.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
    preferredCompanies: ['Google', 'Amazon', 'Microsoft'],
    lookingFor: 'Full-time',
    openToRemote: true,
  })

  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile.skills)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(profile.preferredCompanies)
  const [skillInput, setSkillInput] = useState('')
  const [companyInput, setCompanyInput] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const handleSave = () => {
    setProfile({
      ...profile,
      skills: selectedSkills,
      preferredCompanies: selectedCompanies,
    })
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill))
  }

  const handleAddCompany = (company: string) => {
    if (!selectedCompanies.includes(company)) {
      setSelectedCompanies([...selectedCompanies, company])
    }
  }

  const handleRemoveCompany = (company: string) => {
    setSelectedCompanies(selectedCompanies.filter(c => c !== company))
  }

  const filteredSkills = activeCategory === 'all' 
    ? POPULAR_SKILLS 
    : POPULAR_SKILLS.filter(s => s.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/jobai" className="text-blue-400 hover:text-blue-300 transition">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                <p className="text-sm text-blue-300">Manage your career profile for AI matching</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-500/30 text-purple-300 rounded-lg font-medium hover:bg-purple-500/40 transition flex items-center gap-2"
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-300">Profile updated successfully! AI will use this data for job matching.</span>
          </div>
        )}

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">{selectedSkills.length}</div>
            <div className="text-sm text-blue-300">Skills</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-green-400">{profile.experience}</div>
            <div className="text-sm text-blue-300">Experience Level</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-orange-400">{selectedCompanies.length}</div>
            <div className="text-sm text-blue-300">Preferred Companies</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-blue-400">{profile.openToRemote ? '✅' : '❌'}</div>
            <div className="text-sm text-blue-300">Open to Remote</div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Location</label>
                <select
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Experience & Job */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-400" />
              Professional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-300 mb-1">Current Company</label>
                <input
                  type="text"
                  value={profile.currentCompany}
                  onChange={(e) => setProfile({...profile, currentCompany: e.target.value})}
                  disabled={!isEditing}
                  placeholder="e.g., Google"
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Job Title</label>
                <input
                  type="text"
                  value={profile.jobTitle}
                  onChange={(e) => setProfile({...profile, jobTitle: e.target.value})}
                  disabled={!isEditing}
                  placeholder="e.g., Software Engineer"
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Experience Level</label>
                <select
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                >
                  {EXPERIENCE_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-1">Looking For</label>
                <select
                  value={profile.lookingFor}
                  onChange={(e) => setProfile({...profile, lookingFor: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-blue-300 mb-1">About Yourself</label>
                <textarea
                  value={profile.about}
                  onChange={(e) => setProfile({...profile, about: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tell us about your experience, achievements, and career goals..."
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none ${
                    !isEditing && 'opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" />
              Skills ({selectedSkills.length})
            </h2>

            {/* Current Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSkills.map(skill => (
                <span key={skill} className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/30 text-purple-300 text-sm">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-purple-100 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && skillInput.trim()) {
                        handleAddSkill(skillInput.trim())
                        setSkillInput('')
                      }
                    }}
                    placeholder="Type a skill and press Enter..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                {/* Skill Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      activeCategory === 'all'
                        ? 'bg-purple-500/40 text-white'
                        : 'bg-white/10 text-blue-300 hover:bg-white/20'
                    }`}
                  >
                    All
                  </button>
                  {SKILL_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        activeCategory === cat.id
                          ? cat.color.replace('text-', 'bg-').replace('/20', '/40') + ' text-white'
                          : 'bg-white/10 text-blue-300 hover:bg-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Popular Skills */}
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map(skill => (
                    <button
                      key={skill.name}
                      onClick={() => handleAddSkill(skill.name)}
                      className={`px-3 py-1 rounded-full text-xs transition ${
                        selectedSkills.includes(skill.name)
                          ? 'bg-green-500/30 text-green-300 cursor-default'
                          : 'bg-white/10 text-blue-300 hover:bg-white/20'
                      }`}
                      disabled={selectedSkills.includes(skill.name)}
                    >
                      {skill.name}
                      {!selectedSkills.includes(skill.name) && ' +'}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Preferred Companies */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-400" />
              Preferred Companies ({selectedCompanies.length})
            </h2>

            {/* Current Companies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCompanies.map(company => (
                <span key={company} className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/30 text-orange-300 text-sm">
                  {company}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveCompany(company)}
                      className="hover:text-orange-100 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && companyInput.trim()) {
                      handleAddCompany(companyInput.trim())
                      setCompanyInput('')
                    }
                  }}
                  placeholder="Type a company name and press Enter..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
                <div className="flex flex-wrap gap-2">
                  {COMPANIES.filter(c => !selectedCompanies.includes(c)).slice(0, 5).map(company => (
                    <button
                      key={company}
                      onClick={() => handleAddCompany(company)}
                      className="px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs hover:bg-white/20 transition"
                    >
                      + {company}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              Preferences
            </h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-blue-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.openToRemote}
                  onChange={(e) => setProfile({...profile, openToRemote: e.target.checked})}
                  disabled={!isEditing}
                  className="w-4 h-4 accent-purple-500"
                />
                Open to Remote Work
              </label>
            </div>
          </div>
        </div>

        {/* AI Profile Score */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-500/30 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Profile Score</h3>
              <p className="text-sm text-blue-300">Your profile is {Math.min(100, selectedSkills.length * 5 + 20)}% complete</p>
              <div className="w-full max-w-xs h-2 bg-white/10 rounded-full mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, selectedSkills.length * 5 + 20)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/jobai" 
            className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-lg"
          >
            View Matched Jobs →
          </Link>
        </div>
      </div>
    </div>
  )
}