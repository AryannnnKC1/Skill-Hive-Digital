import { Link } from 'react-router-dom';
import type { RecommendationResult } from '../types';

type RecommendationCardProps = {
  result: RecommendationResult;
  rank: number;
  featured?: boolean;
};

export function RecommendationCard({
  result,
  rank,
  featured = false,
}: RecommendationCardProps) {
  const { career, matchPercentage, score, maxScore } = result;

  return (
    <article
      className={`group flex flex-col justify-between card p-6 transition-all duration-300 ${
        featured ? 'ring-1 ring-accent-border' : ''
      }`}
    >
      <div className='w-full flex-grow flex flex-col'>
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div className='flex items-center gap-3'>
            <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-inset text-sm font-bold text-ink'>
              #{rank}
            </span>
            <div>
              <h3 className='text-lg font-bold text-ink leading-tight'>
                {career.title}
              </h3>
              <span className='inline-block mt-1 text-xs font-medium text-ink-muted'>
                {career.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium text-ink-muted">Compatibility</span>
            <span className="font-bold text-ink">{matchPercentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-inset overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${rank === 1 ? 'bg-accent' : 'bg-cta'}`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
          <p className='mt-2 text-xs text-ink-subtle'>
            {score}/{maxScore} field points from your answers
          </p>
        </div>

        <p className='mb-6 line-clamp-3 text-sm text-ink-muted flex-grow'>
          {career.description}
        </p>

        <div className='flex flex-wrap gap-2 mb-6'>
          {career.requiredSkills.slice(0, 3).map(skill => (
            <span
              key={skill}
              className='inline-flex items-center rounded-md bg-surface-inset border border-border px-2 py-1 text-xs text-ink-muted'
            >
              {skill}
            </span>
          ))}
          {career.requiredSkills.length > 3 && (
            <span className='inline-flex items-center rounded-md bg-surface-inset border border-border px-2 py-1 text-xs text-ink-subtle'>
              +{career.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between border-t border-border pt-4 mt-auto'>
        <div className="flex flex-col">
          <p className='text-xs text-ink-subtle uppercase tracking-wider mb-0.5'>Average Salary</p>
          <p className='text-sm font-bold text-ink'>
            {career.averageSalary}
          </p>
        </div>
        <Link
          to={`/careers/${career._id}`}
          className='inline-flex items-center justify-center rounded-lg bg-cta px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cta-hover'
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
