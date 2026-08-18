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
        <div className="h-8 w-48 rounded bg-green-alpha-08 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass-card rounded-[20px] p-6">
              <div className="mb-4 h-4 w-24 rounded bg-green-alpha-08 animate-pulse" />
              <div className="mb-4 h-6 w-40 rounded bg-green-alpha-08 animate-pulse" />
              <div className="h-20 rounded bg-green-alpha-08 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card rounded-[20px] p-6 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary w-6 h-6">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p className="text-text-primary font-medium">{error}</p>
      </div>
    )
  }

  if (!entries.length) {
    return (
      <div className="glass-card rounded-[20px] p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-alpha-08 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary w-8 h-8">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-text-primary">No saved careers yet</h2>
        <p className="mb-8 text-text-secondary max-w-md mx-auto">
          Bookmark careers you like from the catalog, and they'll appear here for quick access later.
        </p>
        <Link to="/careers" className="btn-primary text-white font-medium rounded-lg px-6 py-2.5 inline-flex items-center justify-center cursor-pointer">
          Browse careers
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-wider text-text-tertiary">
          Saved careers
        </p>
        <h2 className="text-3xl font-bold text-text-primary display-heading">Your shortlist</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {entries.map(({ career }) => (
          <article key={career._id} className="glass-card rounded-[20px] p-6 flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1">{career.category}</p>
                <h3 className="text-lg font-bold text-text-primary">{career.title}</h3>
              </div>
              <SaveCareerButton career={career} isSaved={isSaved(career._id)} onToggle={onToggleSave} />
            </div>
            
            <p className="mb-6 text-sm leading-relaxed text-text-secondary line-clamp-3 flex-grow">
              {career.description}
            </p>
            
            <div className="mb-6 flex flex-wrap gap-2">
              {career.requiredSkills.slice(0, 3).map((skill) => (
                <span key={skill} className="rounded-full bg-green-alpha-08 border border-green-alpha-18 px-3 py-1 text-xs font-medium text-text-secondary">
                  {skill}
                </span>
              ))}
              {career.requiredSkills.length > 3 && (
                <span className="rounded-full bg-green-alpha-08 border border-green-alpha-18 px-3 py-1 text-xs font-medium text-text-tertiary">
                  +{career.requiredSkills.length - 3}
                </span>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-green-alpha-18 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary w-4 h-4">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span className="font-medium text-text-primary">{career.averageSalary}</span>
              </div>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => void onRemove(career._id)} className="font-medium text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer">
                  Remove
                </button>
                <Link to={`/careers/${career._id}`} className="font-medium text-accent hover:text-accent-hover transition-colors">
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
