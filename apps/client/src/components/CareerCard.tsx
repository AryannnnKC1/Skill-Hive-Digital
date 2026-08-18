import { Link } from 'react-router-dom'
import { SaveCareerButton } from './SaveCareerButton'
import type { Career } from '../types'

type CareerCardProps = {
  career: Career
  isSaved: boolean
  onToggleSave: (career: Career) => void | Promise<void>
}

export function CareerCard({ career, isSaved, onToggleSave }: CareerCardProps) {
  return (
    <article className="card p-6 flex flex-col h-full transition-all duration-300">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-subtle mb-1">{career.category}</p>
          <h3 className="text-lg font-bold text-ink">{career.title}</h3>
        </div>
        <SaveCareerButton career={career} isSaved={isSaved} onToggle={onToggleSave} />
      </div>
      
      <p className="mb-6 text-sm leading-relaxed text-ink-muted line-clamp-3 flex-grow">{career.description}</p>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {career.requiredSkills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full bg-surface-inset border border-border px-3 py-1 text-xs font-medium text-ink-muted">
            {skill}
          </span>
        ))}
        {career.requiredSkills.length > 3 && (
          <span className="rounded-full bg-surface-inset border border-border px-3 py-1 text-xs font-medium text-ink-subtle">
            +{career.requiredSkills.length - 3}
          </span>
        )}
      </div>
      
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-ink-muted">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-subtle w-4 h-4">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span className="font-medium text-ink">{career.averageSalary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-subtle w-4 h-4">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <span className="text-ink-muted">{career.growthOutlook}</span>
          </div>
        </div>
        <Link to={`/careers/${career._id}`} className="font-medium text-accent hover:text-accent-hover transition-colors">
          View details
        </Link>
      </div>
    </article>
  )
}
