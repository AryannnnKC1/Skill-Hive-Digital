import { Link, useNavigate } from 'react-router-dom';
import { useRecommendations } from '../hooks/useRecommendations';
import { RecommendationCard } from '../components/RecommendationCard';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/dashboard')}
      aria-label='Back to Dashboard'
      className='inline-flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted shadow-sm transition-colors hover:bg-surface-inset cursor-pointer'
    >
      <span aria-hidden='true'>←</span>
      Back
    </button>
  );
}

export default function RecommendationsPage() {
  const {
    recommendations,
    submittedAt,
    topCategories,
    loading,
    error,
    hasTakenAssessment,
  } = useRecommendations();

  return (
    <div className='min-h-screen bg-surface-inset text-ink-muted'>
      <div className='mx-auto max-w-5xl px-4 py-8 md:px-6 lg:py-12'>
        <div className='mb-6'>
          <BackButton />
        </div>
        <div className='mb-10 rounded-xl bg-surface-raised border border-border p-8 shadow-sm md:p-10'>
          <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl'>
              <h1 className='mt-4 text-3xl font-bold tracking-tight text-ink'>
                Your Personalized Recommendations
              </h1>
              <p className='mt-3 text-base text-ink-muted'>
                Based on your assessment, we've identified the strongest career
                paths for you. Review your matches and explore the details of
                each role.
              </p>
            </div>
            <div className='shrink-0'>
              <Link
                to='/assessment'
                className='inline-flex items-center justify-center rounded-lg bg-cta px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover'
              >
                {hasTakenAssessment ? 'Retake Assessment' : 'Take Assessment'}
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className='grid gap-6 sm:grid-cols-2'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='h-64 animate-pulse rounded-xl bg-surface-raised border border-border p-6 shadow-sm'
              >
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-surface-inset' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-1/3 rounded bg-surface-inset' />
                    <div className='h-3 w-1/4 rounded bg-surface-inset' />
                  </div>
                </div>
                <div className='mt-6 space-y-3'>
                  <div className='h-3 w-full rounded bg-surface-inset' />
                  <div className='h-3 w-full rounded bg-surface-inset' />
                  <div className='h-3 w-2/3 rounded bg-surface-inset' />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className='rounded-xl bg-red-500/10 p-6 text-red-500 border border-red-500/20'>
            <div className='flex items-center gap-3'>
              <svg
                className='h-5 w-5 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <h3 className='text-sm font-medium'>
                Error loading recommendations
              </h3>
            </div>
            <p className='mt-2 text-sm'>{error}</p>
          </div>
        ) : !hasTakenAssessment ? (
          <div className='flex flex-col items-center justify-center rounded-xl bg-surface-raised border border-border px-6 py-16 text-center shadow-sm'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-surface-inset mb-4'>
              <svg
                className='h-6 w-6 text-ink-muted'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-ink'>
              No Assessment Found
            </h2>
            <p className='mt-2 max-w-md text-ink-muted'>
              Discover careers tailored to your unique strengths. Take our short
              assessment to get personalized recommendations.
            </p>
            <Link
              to='/assessment'
              className='mt-6 inline-flex items-center justify-center rounded-lg bg-cta px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover'
            >
              Start the Assessment
            </Link>
          </div>
        ) : (
          <div className='space-y-6'>
            <div className='rounded-xl bg-surface-raised border border-border p-6 shadow-sm md:p-8'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <h2 className='text-xl font-bold text-ink'>
                    Insights Summary
                  </h2>
                  <p className='mt-2 max-w-3xl text-sm text-ink-muted'>
                    {topCategories.length
                      ? `Your responses show the strongest alignment with ${topCategories.join(' and ')}.`
                      : 'Your responses did not strongly favor a single field, so the list below keeps the options broader.'}{' '}
                    {recommendations.length > 0 && (
                      <span className='block mt-1'>
                        Your top match is{' '}
                        <span className='font-medium text-ink'>
                          {recommendations[0].career.title}
                        </span>{' '}
                        at{' '}
                        <span className='font-medium text-accent'>
                          {recommendations[0].matchPercentage}%
                        </span>
                        .
                      </span>
                    )}
                  </p>
                </div>
                {submittedAt && (
                  <div className='shrink-0'>
                    <span className='inline-flex items-center rounded-md bg-surface-inset border border-border px-2.5 py-1 text-xs font-medium text-ink-muted'>
                      Taken{' '}
                      {new Date(submittedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {recommendations.length === 0 ? (
              <div className='rounded-xl border border-border bg-surface-raised p-12 text-center shadow-sm'>
                <h3 className='text-sm font-medium text-ink'>
                  No matches found
                </h3>
                <p className='mt-1 text-sm text-ink-muted'>
                  We couldn't generate recommendations from your answers. Please
                  try retaking the assessment.
                </p>
                <div className='mt-6'>
                  <Link
                    to='/assessment'
                    className='inline-flex items-center rounded-lg bg-cta px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover'
                  >
                    Retake Assessment
                  </Link>
                </div>
              </div>
            ) : (
              <div className='grid gap-6 md:grid-cols-2'>
                {recommendations.map((result, index) => (
                  <RecommendationCard
                    key={result.career._id}
                    result={result}
                    rank={index + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
