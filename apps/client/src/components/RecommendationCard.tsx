import { Link } from 'react-router-dom';
import type { RecommendationResult } from '../types';

type RecommendationCardProps = {
  result: RecommendationResult;
  rank: number;
};

export function RecommendationCard({ result, rank }: RecommendationCardProps) {
  const { career, matchPercentage } = result;

  return (
    <article className='group flex flex-col justify-between rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md'>
      <div className='w-full flex-grow flex flex-col'>
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div className='flex items-center gap-3'>
            <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-bold text-slate-700'>
              #{rank}
            </span>
            <div>
              <h3 className='text-lg font-bold text-slate-900 leading-tight'>
                {career.title}
              </h3>
              <span className='inline-block mt-1 text-xs font-medium text-slate-500'>
                {career.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Match progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium text-slate-700">Match Score</span>
            <span className="font-bold text-slate-900">{matchPercentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div 
              className={`h-full rounded-full ${rank === 1 ? 'bg-blue-600' : 'bg-emerald-500'}`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        <p className='mb-6 line-clamp-3 text-sm text-slate-600 flex-grow'>
          {career.description}
        </p>

        <div className='flex flex-wrap gap-2 mb-6'>
          {career.requiredSkills.slice(0, 3).map(skill => (
            <span
              key={skill}
              className='inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700'
            >
              {skill}
            </span>
          ))}
          {career.requiredSkills.length > 3 && (
            <span className='inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500'>
              +{career.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between border-t border-slate-200 pt-4 mt-auto'>
        <div className="flex flex-col">
          <p className='text-xs text-slate-500 uppercase tracking-wider mb-0.5'>Average Salary</p>
          <p className='text-sm font-bold text-slate-900'>
            {career.averageSalary}
          </p>
        </div>
        <Link
          to={`/careers/${career._id}`}
          className='inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700'
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
