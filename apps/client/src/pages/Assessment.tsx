import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchActiveAssessment,
  submitAssessment,
  fetchAssessmentStatus,
} from '../api';
import type { Assessment, AssessmentAnswer } from '../types';

function deriveCategory(question: Assessment['questions'][0]): string {
  const tallied: Record<string, number> = {};
  for (const opt of question.options) {
    for (const [cat, w] of Object.entries(opt.categoryWeights ?? {})) {
      tallied[cat] = (tallied[cat] ?? 0) + Number(w);
    }
  }
  const sorted = Object.entries(tallied).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? 'General';
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* ── Generic Icons ── */
function TagIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 6h.008v.008H6V6z'
      />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 12.75l6 6 9-13.5'
      />
    </svg>
  );
}

function WarningIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      />
    </svg>
  );
}

function InfoIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0zm-9-3.75h.008v.008H12V8.25z'
      />
    </svg>
  );
}

/* ── Confirmation screen ─────────────────────────────────────── */
function ConfirmationScreen({
  onViewResults,
  onGoToDashboard,
}: {
  onViewResults: () => void;
  onGoToDashboard: () => void;
}) {
  return (
    <div className='min-h-screen bg-surface-inset flex items-center justify-center px-4'>
      <div className='bg-surface-raised border border-border rounded-xl p-8 shadow-sm max-w-lg w-full text-center'>
        <div className='w-16 h-16 rounded-full bg-cta-surface flex items-center justify-center mx-auto mb-6'>
          <CheckIcon className='w-8 h-8 text-cta' />
        </div>
        <h1 className='text-2xl font-bold text-ink mb-3'>
          Assessment Complete
        </h1>
        <p className='text-ink-muted leading-relaxed mb-8'>
          Great job! We've analyzed your responses and matched you to careers
          that align with your interests and strengths. Your personalized
          results are ready.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button
            type='button'
            onClick={onViewResults}
            className='inline-flex items-center justify-center px-6 py-2 rounded-lg bg-cta hover:bg-cta-hover text-white font-medium transition-colors cursor-pointer'
          >
            View my career matches
          </button>
          <button
            type='button'
            onClick={onGoToDashboard}
            className='inline-flex items-center justify-center px-6 py-2 rounded-lg border border-border text-ink-muted font-medium hover:bg-surface-inset transition-colors cursor-pointer'
          >
            Return to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
function AssessmentPage() {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const [previousDate, setPreviousDate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const token = localStorage.getItem('token');
        const [data, status] = await Promise.all([
          fetchActiveAssessment(),
          token
            ? fetchAssessmentStatus().catch(() => null)
            : Promise.resolve(null),
        ]);
        if (!cancelled) {
          setAssessment(data);
          if (status?.hasSubmitted) {
            setHasSubmittedBefore(true);
            setPreviousDate(status.submittedAt ?? null);
          }
        }
      } catch {
        if (!cancelled)
          setError('Unable to load the assessment. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    setValidationError(false);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (!assessment) return;
      const clamped = Math.max(
        0,
        Math.min(index, assessment.questions.length - 1)
      );
      setCurrentIndex(clamped);
      setValidationError(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [assessment]
  );

  const handleNext = useCallback(() => {
    if (!assessment) return;
    const question = assessment.questions[currentIndex];
    if (!question) return;
    if (!answers[question.questionId]) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    if (currentIndex < assessment.questions.length - 1) goTo(currentIndex + 1);
  }, [assessment, currentIndex, answers, goTo]);

  const handlePrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo]
  );

  const handleSubmit = useCallback(async () => {
    if (!assessment) return;
    const firstUnansweredIndex = assessment.questions.findIndex(
      q => !answers[q.questionId]
    );
    if (firstUnansweredIndex !== -1) {
      goTo(firstUnansweredIndex);
      setValidationError(true);
      setError(
        `Please answer question ${firstUnansweredIndex + 1} before submitting.`
      );
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload: AssessmentAnswer[] = Object.entries(answers).map(
        ([questionId, optionId]) => ({ questionId, optionId })
      );
      await submitAssessment(assessment._id, payload);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your answers. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }, [assessment, answers, goTo]);

  /* ── Loading ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className='min-h-screen bg-surface-inset flex flex-col'>
        <div className='h-16 bg-surface-raised border-b border-border shadow-sm animate-pulse' />
        <div className='max-w-2xl mx-auto w-full px-4 py-10 space-y-6'>
          <div className='h-28 bg-surface-inset rounded-xl animate-pulse' />
          <div className='h-80 bg-surface-raised rounded-xl border border-border animate-pulse shadow-sm' />
        </div>
      </div>
    );
  }

  /* ── Fatal error ─────────────────────────────────────────────── */
  if (error && !assessment) {
    return (
      <div className='min-h-screen bg-surface-inset flex items-center justify-center px-4'>
        <div className='bg-surface-raised border border-border rounded-xl p-8 max-w-md w-full text-center shadow-sm'>
          <div className='w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4'>
            <WarningIcon className='text-red-500 w-7 h-7' />
          </div>
          <p className='text-red-500 font-medium mb-6'>{error}</p>
          <Link
            to='/dashboard'
            className='inline-flex items-center justify-center px-6 py-2 rounded-lg border border-border text-ink-muted font-medium hover:bg-surface-inset transition-colors'
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!assessment) return null;
  if (submitted)
    return (
      <ConfirmationScreen
        onViewResults={() => navigate('/recommendations')}
        onGoToDashboard={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const currentQuestion = assessment.questions[currentIndex]!;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentCategory = deriveCategory(currentQuestion);
  const currentAnswered = Boolean(answers[currentQuestion.questionId]);

  return (
    <div className='min-h-screen bg-surface-inset'>
      {/* ── Sticky Top Bar ───────────────────────────────────────── */}
      <header
        className='fixed top-0 left-0 right-0 z-50 bg-surface-raised border-b border-border shadow-sm'
        role='banner'
      >
        <div className='max-w-3xl mx-auto px-4 h-16 flex items-center gap-4'>
          <Link
            to='/dashboard'
            aria-label='Back to dashboard'
            className='flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors shrink-0'
          >
            <svg
              width='14'
              height='14'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
              />
            </svg>
            Dashboard
          </Link>

          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-ink truncate'>
              {assessment.title}
            </p>
            <p className='text-xs text-ink-muted'>
              {answeredCount} of {totalQuestions} answered
            </p>
          </div>

          <span
            className='text-sm font-medium text-ink-muted shrink-0'
            aria-live='polite'
          >
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className='h-1 bg-surface-inset'
          role='progressbar'
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className='h-full bg-cta transition-all duration-300 ease-out'
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className='max-w-3xl mx-auto px-4 pt-28 pb-16'>
        {/* Hero banner (first question only) */}
        {currentIndex === 0 && (
          <div className='mb-8 bg-surface-raised border border-border rounded-xl p-8 text-center shadow-sm'>
            <h1 className='text-2xl font-bold text-ink mb-3'>
              Discover Your Ideal Career Path
            </h1>
            <p className='text-ink-muted'>
              Answer {totalQuestions} quick questions and we'll match you to
              careers that align with your interests, strengths, and
              personality.
            </p>
          </div>
        )}

        {/* Retake banner */}
        {hasSubmittedBefore && currentIndex === 0 && (
          <div className='mb-6 flex items-start gap-3 bg-accent-surface border border-accent-border rounded-lg px-4 py-3 text-sm'>
            <InfoIcon className='text-accent w-5 h-5 shrink-0 mt-0.5' />
            <div>
              <p className='font-medium text-accent'>
                You're retaking the assessment
              </p>
              <p className='text-ink-muted mt-0.5'>
                {previousDate
                  ? `Last completed on ${new Date(previousDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : 'Your previous results will be updated with your new answers.'}
              </p>
            </div>
          </div>
        )}

        {/* Question card */}
        <article
          key={currentQuestion.questionId}
          className='bg-surface-raised border border-border rounded-xl p-8 mb-6 shadow-sm'
        >
          {/* Category tag */}
          <div className='inline-flex items-center gap-1.5 bg-surface-inset text-ink-muted text-xs font-medium px-2 py-1 rounded-md mb-4'>
            <TagIcon className='text-ink-subtle w-3 h-3' />
            {currentCategory}
          </div>

          <p className='text-sm text-ink-subtle font-medium mb-2'>
            Question {currentIndex + 1} of {totalQuestions}
          </p>

          <h2 className='text-xl font-bold text-ink mb-6'>
            {currentQuestion.text}
          </h2>

          {/* Options */}
          <div className='space-y-3' role='radiogroup'>
            {currentQuestion.options.map((option, idx) => {
              const isSelected =
                answers[currentQuestion.questionId] === option.optionId;
              return (
                <label
                  key={option.optionId}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-accent bg-accent-surface ring-1 ring-accent'
                      : 'border-border bg-surface hover:bg-surface-inset hover:border-border-strong'
                  }`}
                >
                  <input
                    type='radio'
                    name={currentQuestion.questionId}
                    value={option.optionId}
                    checked={isSelected}
                    onChange={() =>
                      selectAnswer(currentQuestion.questionId, option.optionId)
                    }
                    className='sr-only'
                  />
                  {/* Letter badge */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-accent text-white'
                        : 'bg-surface-inset text-ink-muted'
                    }`}
                  >
                    {LETTERS[idx] ?? String.fromCharCode(65 + idx)}
                  </span>
                  <span
                    className={`text-sm md:text-base ${isSelected ? 'text-accent font-medium' : 'text-ink-muted'}`}
                  >
                    {option.text}
                  </span>
                  {isSelected && (
                    <CheckIcon className='ml-auto w-5 h-5 text-accent flex-shrink-0' />
                  )}
                </label>
              );
            })}
          </div>
        </article>

        {/* Validation warning */}
        {validationError && !currentAnswered && (
          <div className='mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg px-4 py-3 text-sm font-medium'>
            <WarningIcon className='w-4 h-4 shrink-0' />
            Please select an answer before continuing.
          </div>
        )}

        {/* Submission error */}
        {error && (
          <div className='mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg px-4 py-3 text-sm font-medium'>
            <WarningIcon className='w-4 h-4 shrink-0' />
            {error}
          </div>
        )}

        {/* Navigation */}
        <nav className='flex items-center justify-between gap-4'>
          <button
            type='button'
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='flex items-center justify-center px-4 py-2 rounded-lg border border-border text-ink-muted font-medium hover:bg-surface-inset disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer'
          >
            Previous
          </button>

          {isLastQuestion ? (
            <button
              type='button'
              onClick={handleSubmit}
              disabled={submitting}
              className='flex items-center justify-center px-6 py-2 rounded-lg bg-cta hover:bg-cta-hover text-white font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer'
            >
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </button>
          ) : (
            <button
              type='button'
              onClick={handleNext}
              className='flex items-center justify-center px-6 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors cursor-pointer'
            >
              Next
            </button>
          )}
        </nav>
      </main>
    </div>
  );
}

export default AssessmentPage;
