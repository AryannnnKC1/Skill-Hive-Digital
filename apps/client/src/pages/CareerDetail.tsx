import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCareerById } from '../api'
import type { Career } from '../types'
import { SaveCareerButton } from '../components/SaveCareerButton'
import { useSavedCareers } from '../hooks/useSavedCareers'

function CareerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [career, setCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isSaved, toggleSave } = useSavedCareers()

  useEffect(() => {
    if (!id) return
    let cancelled = false

    setLoading(true)
    fetchCareerById(id)
      .then((data) => {
        if (!cancelled) setCareer(data)
      })
      .catch(() => {
        if (!cancelled) setError('Career not found.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600 font-medium flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      </div>
    )
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto mt-12 bg-white border border-slate-200 p-8 rounded-xl shadow-sm text-center">
          <div className="text-slate-900 font-medium mb-6">
            {error ?? 'Career not found.'}
          </div>
          <Link to="/careers" className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors">
            &larr; Back to careers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 mb-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/careers" className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors flex items-center gap-2">
            <span>&larr;</span> Back to careers
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white border border-slate-200 p-8 rounded-xl mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium uppercase tracking-wider mb-4">
                {career.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {career.title}
              </h1>
            </div>
            <div className="shrink-0">
              <SaveCareerButton career={career} isSaved={isSaved(career._id)} onToggle={toggleSave} />
            </div>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mt-4">
            {career.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Salary</p>
            </div>
            <p className="text-xl font-bold text-slate-900">{career.averageSalary}</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Education</p>
            </div>
            <p className="text-lg font-bold text-slate-900">{career.educationRequired}</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Growth</p>
            </div>
            <p className="text-lg font-bold text-slate-900">{career.growthOutlook}</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Environment</p>
            </div>
            <p className="text-lg font-bold text-slate-900">{career.workEnvironment}</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Required Skills</h2>
          <div className="flex flex-wrap gap-3">
            {career.requiredSkills.map((skill) => (
              <span key={skill} className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerDetailPage
