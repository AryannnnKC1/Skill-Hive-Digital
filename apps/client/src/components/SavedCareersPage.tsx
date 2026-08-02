import { Link } from 'react-router-dom'
import type { Career, SavedCareerRecord } from '../types'
import { SaveCareerButton } from './SaveCareerButton'

type SavedCareersPageProps = {
  entries: SavedCareerRecord[]
  loading: boolean
  error: string | null
  onRemove: (careerId: string) => void | Promise<void>
  onToggleSave: (career: Career) => void | Promise<void>
  isSaved: (careerId: string) => boolean
}

export function SavedCareersPage({ entries, loading, error, onRemove, onToggleSave, isSaved }: SavedCareersPageProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 rounded bg-slate-200 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-4 h-4 w-24 rounded bg-slate-200 animate-pulse" />
              <div className="mb-4 h-6 w-40 rounded bg-slate-200 animate-pulse" />
              <div className="h-20 rounded bg-slate-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 w-6 h-6">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p className="text-slate-900 font-medium">{error}</p>
      </div>
    )
  }

  if (!entries.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-8 h-8">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">No saved careers yet</h2>
        <p className="mb-8 text-slate-600 max-w-md mx-auto">
          Bookmark careers you like from the catalog, and they'll appear here for quick access later.
        </p>
        <Link to="/careers" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg px-6 py-2.5 transition-colors inline-flex items-center justify-center">
          Browse careers
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
          Saved careers
        </p>
        <h2 className="text-3xl font-bold text-slate-900">Your shortlist</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {entries.map(({ career, savedAt }) => (
          <article key={career._id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">{career.category}</p>
                <h3 className="text-lg font-bold text-slate-900">{career.title}</h3>
              </div>
              <SaveCareerButton career={career} isSaved={isSaved(career._id)} onToggle={onToggleSave} />
            </div>
            
            <p className="mb-6 text-sm leading-relaxed text-slate-600 line-clamp-3 flex-grow">
              {career.description}
            </p>
            
            <div className="mb-6 flex flex-wrap gap-2">
              {career.requiredSkills.slice(0, 3).map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                  {skill}
                </span>
              ))}
              {career.requiredSkills.length > 3 && (
                <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
                  +{career.requiredSkills.length - 3}
                </span>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span className="font-medium text-slate-900">{career.averageSalary}</span>
              </div>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => void onRemove(career._id)} className="font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  Remove
                </button>
                <Link to={`/careers/${career._id}`} className="font-medium text-blue-800 hover:text-blue-600 transition-colors">
                  View details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
