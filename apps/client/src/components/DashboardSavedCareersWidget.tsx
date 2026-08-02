import { Link } from 'react-router-dom';
import type { Career, SavedCareerRecord } from '../types';
import { SaveCareerButton } from './SaveCareerButton';

type DashboardSavedCareersWidgetProps = {
  savedCareers: SavedCareerRecord[];
  loading: boolean;
  onToggleSave: (career: Career) => void | Promise<void>;
  isSaved: (careerId: string) => boolean;
};

export function DashboardSavedCareersWidget({
  savedCareers,
  loading,
  onToggleSave,
  isSaved,
}: DashboardSavedCareersWidgetProps) {
  const recent = savedCareers.slice(0, 3);

  return (
    <article className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
            Saved careers
          </p>
          <h2 className='mt-1 text-lg font-bold text-slate-900'>
            Your favorites
          </h2>
        </div>
        <Link
          to='/saved-careers'
          className='text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors'
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className='space-y-4'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className='h-16 animate-pulse rounded-lg bg-slate-100 w-full'
            />
          ))}
        </div>
      ) : recent.length ? (
        <div className='space-y-4'>
          {recent.map(entry => (
            <div
              key={entry._id}
              className='flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:bg-slate-50'
            >
              <div>
                <p className='text-sm font-semibold text-slate-900'>
                  {entry.career?.title ?? 'Career'}
                </p>
                <p className='text-xs text-slate-600'>
                  {entry.career?.category ?? 'Saved career'}
                </p>
              </div>
              {entry.career ? (
                <SaveCareerButton
                  career={entry.career}
                  isSaved={isSaved(entry.career._id)}
                  onToggle={onToggleSave}
                />
              ) : null}
            </div>
          ))}
          <div className='pt-2 text-center text-xs text-slate-400'>
            {savedCareers.length} saved career{savedCareers.length === 1 ? '' : 's'}
          </div>
        </div>
      ) : (
        <div className='rounded-lg bg-slate-50 p-6 text-center border border-slate-200'>
          <p className='text-sm text-slate-600'>
            You have no saved careers yet. Save one from the careers list to see
            it here.
          </p>
        </div>
      )}
    </article>
  );
}
