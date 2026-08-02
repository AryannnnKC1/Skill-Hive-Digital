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
    <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">{career.category}</p>
          <h3 className="text-lg font-bold text-slate-900">{career.title}</h3>
        </div>
        <SaveCareerButton career={career} isSaved={isSaved} onToggle={onToggleSave} />
      </div>
      
      <p className="mb-6 text-sm leading-relaxed text-slate-600 line-clamp-3 flex-grow">{career.description}</p>
      
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
      
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span className="font-medium text-slate-900">{career.averageSalary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <span className="text-slate-600">{career.growthOutlook}</span>
          </div>
        </div>
        <Link to={`/careers/${career._id}`} className="font-medium text-blue-800 hover:text-blue-600 transition-colors">
          View details
        </Link>
      </div>
    </article>
  )
}
