import { Link, Navigate, useLocation } from 'react-router-dom';
import { DashboardSavedCareersWidget } from '../components/DashboardSavedCareersWidget';
import { SaveCareerButton } from '../components/SaveCareerButton';
import { useSavedCareers } from '../hooks/useSavedCareers';
import { useRecommendations } from '../hooks/useRecommendations';

export default function Dashboard() {
  const location = useLocation();
  const userName = location.state?.userName ?? 'there';
  const {
    savedCareers,
    loading: loadingSaved,
    isSaved,
    toggleSave,
  } = useSavedCareers();
  const {
    recommendations,
    loading: loadingRecs,
    hasTakenAssessment,
    submittedAt,
  } = useRecommendations();

  if (!location.state?.userName) {
    return <Navigate to='/register' replace />;
  }

  // Derive dynamic metrics
  const assessmentScoreStr = hasTakenAssessment ? '100%' : '0%';
  const assessmentTrend = hasTakenAssessment ? 'Completed' : 'Pending';

  const metrics = [
    {
      label: 'Saved Careers',
      value: savedCareers.length.toString(),
      trend: 'Shortlisted',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      label: 'Assessment Score',
      value: assessmentScoreStr,
      trend: assessmentTrend,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
          <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
    },
    {
      label: 'Skills Matched',
      value: hasTakenAssessment ? '12' : '0',
      trend: 'Based on profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ),
    },
    {
      label: 'Mentor Sessions',
      value: '0',
      trend: 'Not booked yet',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  // Dynamic recommendations: take top 3
  const topRecommendations = recommendations.slice(0, 3).map(r => r.career);

  return (
    <main className='min-h-screen bg-slate-50 text-slate-900' spellCheck={false}>
      <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12'>
        {/* Header / Hero */}
        <header className='mb-8 flex flex-col justify-between gap-6 bg-white border-b border-slate-200 p-8 rounded-2xl shadow-sm md:flex-row md:items-center'>
          <div>
            <p className='text-sm font-semibold tracking-wide text-slate-400 uppercase'>
              SkillHive Digital
            </p>
            <h1 className='mt-2 text-3xl font-bold text-slate-900 sm:text-4xl'>
              Welcome Back, {userName}
            </h1>
            <p className='mt-2 text-lg text-slate-600'>
              Continue building your future today.
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 transition hover:bg-slate-200'>
              {userName.slice(0, 1).toUpperCase()}
            </button>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </button>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
          </div>
        </header>

        {/* Metrics Grid */}
        <section className='mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {metrics.map(metric => (
            <article
              key={metric.label}
              className='flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50'>
                  {metric.icon}
                </div>
                <span className='text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200'>
                  {metric.trend}
                </span>
              </div>
              <div className='mt-6'>
                <p className='text-sm font-medium text-slate-600'>
                  {metric.label}
                </p>
                <p className='mt-1 text-3xl font-bold text-slate-900'>
                  {metric.value}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Main Grid */}
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2 space-y-8'>
            {/* Progress Panel */}
            <article className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 md:p-8'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
                    Career Progress
                  </p>
                  <h2 className='mt-1 text-xl font-bold text-slate-900'>
                    Career Readiness
                  </h2>
                </div>
                <span className='inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 border border-slate-200'>
                  {hasTakenAssessment ? '100% Complete' : '50% Complete'}
                </span>
              </div>
              <p className='mt-4 text-sm text-slate-600 leading-relaxed max-w-2xl'>
                {hasTakenAssessment
                  ? 'Your profile is fully ready! Explore your tailored recommendations below.'
                  : 'Your profile is nearly ready. Finish the assessment to unlock stronger recommendations.'}
              </p>
              <div className='mt-6'>
                <div className='h-3 w-full overflow-hidden rounded-full bg-slate-100'>
                  <div
                    className={`h-full rounded-full bg-emerald-500 transition-all duration-1000 ${hasTakenAssessment ? 'w-full' : 'w-1/2'}`}
                  />
                </div>
                <div className='mt-2 flex justify-between text-xs font-medium text-slate-500'>
                  <span>Profile readiness</span>
                  <span>{hasTakenAssessment ? '100%' : '50%'}</span>
                </div>
              </div>
            </article>

            {/* Recommended Careers Panel */}
            <article className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 md:p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
                    Recommended Careers
                  </p>
                  <h2 className='mt-1 text-xl font-bold text-slate-900'>
                    Matches for your journey
                  </h2>
                </div>
                <Link
                  to='/recommendations'
                  className='text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors'
                >
                  Explore all &rarr;
                </Link>
              </div>

              <div className='space-y-6'>
                {loadingRecs ? (
                  <div className='animate-pulse h-32 bg-slate-100 rounded-lg w-full' />
                ) : topRecommendations.length > 0 ? (
                  topRecommendations.map(career => (
                    <div
                      key={career._id}
                      className='group flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between'
                    >
                      <div className='flex-1'>
                        <p className='text-xs font-medium text-slate-500'>
                          {career.category}
                        </p>
                        <h3 className='text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600'>
                          {career.title}
                        </h3>
                        <p className='mt-1 text-sm text-slate-600 line-clamp-2'>
                          {career.description}
                        </p>
                        <div className='mt-3 flex flex-wrap gap-2'>
                          {career.requiredSkills.slice(0, 3).map(skill => (
                            <span
                              key={skill}
                              className='inline-flex items-center rounded-md bg-slate-50 border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600'
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className='flex items-center gap-3 sm:flex-col sm:items-end'>
                        <Link
                          to={`/careers/${career._id}`}
                          className='rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700'
                        >
                          View path
                        </Link>
                        <SaveCareerButton
                          career={career}
                          isSaved={isSaved(career._id)}
                          onToggle={toggleSave}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='rounded-lg bg-slate-50 p-6 text-center border border-slate-200'>
                    <p className='text-sm text-slate-600 mb-4'>
                      Take the assessment to see your personalized
                      recommendations.
                    </p>
                    <Link
                      to='/assessment'
                      className='inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700'
                    >
                      Start Assessment
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </div>

          <div className='space-y-8'>
            <DashboardSavedCareersWidget
              savedCareers={savedCareers}
              loading={loadingSaved}
              onToggleSave={toggleSave}
              isSaved={isSaved}
            />

            {/* Tasks Panel */}
            <article className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
              <div className='mb-6'>
                <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
                  Upcoming tasks
                </p>
                <h2 className='mt-1 text-lg font-bold text-slate-900'>
                  Keep momentum going
                </h2>
              </div>
              <div className='space-y-4'>
                {!hasTakenAssessment && (
                  <div className='flex items-start gap-4'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold text-slate-600'>
                      01
                    </div>
                    <div>
                      <h3 className='text-sm font-bold text-slate-900'>
                        Complete Assessment
                      </h3>
                      <p className='mt-1 text-xs text-slate-600'>
                        Unlock a sharper career match score.
                      </p>
                      <Link
                        to='/assessment'
                        className='mt-2 inline-block text-xs font-medium text-blue-800 hover:text-blue-600'
                      >
                        Start &rarr;
                      </Link>
                    </div>
                  </div>
                )}
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold text-slate-600'>
                    02
                  </div>
                  <div>
                    <h3 className='text-sm font-bold text-slate-900'>
                      Explore Careers
                    </h3>
                    <p className='mt-1 text-xs text-slate-600'>
                      Review paths aligned to your strengths.
                    </p>
                    <Link
                      to='/careers'
                      className='mt-2 inline-block text-xs font-medium text-blue-800 hover:text-blue-600'
                    >
                      Browse &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Recent Activity Panel */}
            <article className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
              <div className='mb-6'>
                <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
                  Recent activity
                </p>
                <h2 className='mt-1 text-lg font-bold text-slate-900'>
                  Latest progress
                </h2>
              </div>
              <div className='space-y-6'>
                {[
                  {
                    title: 'Dashboard Updated',
                    note: 'New dynamic layout loaded',
                    time: 'Just now',
                  },
                  hasTakenAssessment
                    ? {
                        title: 'Assessment Completed',
                        note: 'Personality and interest assessment finished',
                        time: submittedAt
                          ? new Date(submittedAt).toLocaleDateString()
                          : 'Recently',
                      }
                    : null,
                  {
                    title: 'Profile Created',
                    note: 'Welcome to SkillHive Digital',
                    time: 'Recently',
                  },
                ]
                  .filter(Boolean)
                  .map((item, idx, arr) => (
                    <div key={idx} className='relative flex gap-4'>
                      {idx !== arr.length - 1 && (
                        <div className='absolute left-3 top-6 h-full w-[1px] bg-slate-200' />
                      )}
                      <div className='relative mt-1 h-6 w-6 shrink-0 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200'>
                        <div className='h-2 w-2 rounded-full bg-slate-400' />
                      </div>
                      <div>
                        <h3 className='text-sm font-bold text-slate-900'>
                          {item!.title}
                        </h3>
                        <p className='mt-0.5 text-xs text-slate-600'>
                          {item!.note}
                        </p>
                        <span className='mt-1 block text-xs font-medium text-slate-400'>
                          {item!.time}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
