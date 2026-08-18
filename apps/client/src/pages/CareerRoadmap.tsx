import { useEffect, useState, type JSX } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCareerById } from '../api'
import type { Career, RoadmapItemType, RoadmapStage } from '../types'

const ITEM_META: Record<
  RoadmapItemType,
  { label: string; colorClass: string; icon: JSX.Element }
> = {
  education: {
    label: 'Education',
    colorClass: 'bg-accent-surface text-accent border-accent-border',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='w-3.5 h-3.5'>
        <path d='M22 10v6M2 10l10-5 10 5-10 5z'></path>
        <path d='M6 12v5c3 3 9 3 12 0v-5'></path>
      </svg>
    ),
  },
  skill: {
    label: 'Skill',
    colorClass: 'bg-cta-surface text-cta border-accent-border',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='w-3.5 h-3.5'>
        <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>
      </svg>
    ),
  },
  experience: {
    label: 'Experience',
    colorClass: 'bg-surface-inset text-ink-muted border-border',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='w-3.5 h-3.5'>
        <rect x='2' y='7' width='20' height='14' rx='2' ry='2'></rect>
        <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path>
      </svg>
    ),
  },
}

function StageItem({ type, label }: { type: RoadmapItemType; label: string }) {
  const meta = ITEM_META[type]
  return (
    <li className='flex items-start gap-3'>
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${meta.colorClass}`}
        title={meta.label}
      >
        {meta.icon}
      </span>
      <span className='text-sm text-ink-muted leading-relaxed'>{label}</span>
    </li>
  )
}

function StageCard({ stage, index }: { stage: RoadmapStage; index: number }) {
  const itemCounts = stage.items.reduce<Record<RoadmapItemType, number>>(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    },
    { education: 0, skill: 0, experience: 0 }
  )

  return (
    <div className='relative pl-12'>
      <div className='absolute left-[11px] top-2 bottom-0 w-px bg-border' aria-hidden='true' />
      <div className='absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface-raised shadow-sm'>
        <span className='text-[10px] font-bold text-accent'>{index + 1}</span>
      </div>

      <div className='bg-surface-raised border border-border p-6 rounded-xl shadow-sm'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-accent mb-1'>
              Phase {index + 1}
            </p>
            <h3 className='text-lg font-bold text-ink'>{stage.title}</h3>
          </div>
          {stage.duration && (
            <span className='shrink-0 inline-flex items-center rounded-md bg-surface-inset border border-border px-2.5 py-1 text-xs font-medium text-ink-muted'>
              {stage.duration}
            </span>
          )}
        </div>

        {stage.description && (
          <p className='text-sm text-ink-muted leading-relaxed mb-4'>
            {stage.description}
          </p>
        )}

        <ul className='space-y-2.5'>
          {stage.items.map((item, i) => (
            <StageItem key={i} type={item.type} label={item.label} />
          ))}
        </ul>

        <div className='mt-4 flex flex-wrap gap-2 border-t border-border pt-4'>
          {(Object.keys(ITEM_META) as RoadmapItemType[]).map((type) =>
            itemCounts[type] > 0 ? (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${ITEM_META[type].colorClass}`}
              >
                {ITEM_META[type].icon}
                {itemCounts[type]} {ITEM_META[type].label.toLowerCase()}
                {itemCounts[type] > 1 ? 's' : ''}
              </span>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

function CareerRoadmapPage() {
  const { id } = useParams<{ id: string }>()
  const [career, setCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <div className='min-h-screen bg-surface-inset flex items-center justify-center'>
        <div className='text-ink-muted font-medium flex items-center gap-2'>
          <svg className='animate-spin h-5 w-5 text-ink-subtle' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
          Loading roadmap...
        </div>
      </div>
    )
  }

  if (error || !career) {
    return (
      <div className='min-h-screen bg-surface-inset p-6'>
        <div className='max-w-3xl mx-auto mt-12 bg-surface-raised border border-border p-8 rounded-xl shadow-sm text-center'>
          <div className='text-ink font-medium mb-6'>
            {error ?? 'Career not found.'}
          </div>
          <Link to='/careers' className='text-sm font-medium text-accent hover:text-accent-hover transition-colors'>
            &larr; Back to careers
          </Link>
        </div>
      </div>
    )
  }

  const roadmap = career.roadmap

  if (!roadmap || roadmap.stages.length === 0) {
    return (
      <div className='min-h-screen bg-surface-inset p-6'>
        <div className='max-w-3xl mx-auto mt-12 bg-surface-raised border border-border p-8 rounded-xl shadow-sm text-center'>
          <div className='text-ink font-medium mb-2'>Roadmap not available</div>
          <p className='text-sm text-ink-muted mb-6'>
            A step-by-step roadmap for {career.title} isn't ready yet. Check
            the career details for education and skills requirements.
          </p>
          <Link to={`/careers/${career._id}`} className='text-sm font-medium text-accent hover:text-accent-hover transition-colors'>
            &larr; Back to career details
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-surface-inset pb-12'>
      <nav className='bg-surface-raised border-b border-border sticky top-0 z-50 px-6 py-4 mb-8 shadow-sm'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <Link to={`/careers/${career._id}`} className='text-sm font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-2'>
            <span>&larr;</span> Back to {career.title}
          </Link>
        </div>
      </nav>

      <div className='max-w-4xl mx-auto px-4'>
        {/* Header Section */}
        <div className='bg-surface-raised border border-border p-8 rounded-xl mb-8 shadow-sm'>
          <span className='inline-block px-3 py-1 rounded-full bg-surface-inset border border-border text-ink-muted text-xs font-medium uppercase tracking-wider mb-4'>
            Career Roadmap
          </span>
          <h1 className='text-3xl md:text-4xl font-bold text-ink mb-2'>
            {career.title}
          </h1>
          <p className='text-sm font-medium text-ink-muted mb-4'>
            {career.category} &middot; {career.educationRequired}
          </p>
          <p className='text-lg text-ink-muted leading-relaxed max-w-3xl'>
            {roadmap.summary}
          </p>
        </div>

        {/* Legend */}
        <div className='bg-surface-raised border border-border p-6 rounded-xl mb-8 shadow-sm'>
          <h2 className='text-sm font-bold text-ink mb-4'>What you'll find here</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {(Object.keys(ITEM_META) as RoadmapItemType[]).map((type) => (
              <div key={type} className='flex items-center gap-3'>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${ITEM_META[type].colorClass}`}>
                  {ITEM_META[type].icon}
                </span>
                <div>
                  <p className='text-sm font-semibold text-ink'>{ITEM_META[type].label}</p>
                  <p className='text-xs text-ink-muted'>
                    {type === 'education'
                      ? 'Degrees & certifications'
                      : type === 'skill'
                        ? 'Competencies to build'
                        : 'Roles & hands-on steps'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className='space-y-8'>
          {roadmap.stages.map((stage, index) => (
            <StageCard key={index} stage={stage} index={index} />
          ))}
        </div>

        <div className='mt-10 text-center'>
          <Link
            to={`/careers/${career._id}`}
            className='inline-flex items-center justify-center rounded-lg bg-cta px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover'
          >
            View career details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CareerRoadmapPage
