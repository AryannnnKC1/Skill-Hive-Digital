import type { Career } from '../types';

type SaveCareerButtonProps = {
  career: Career;
  isSaved: boolean;
  loading?: boolean;
  onToggle: (career: Career) => void | Promise<void>;
};

export function SaveCareerButton({
  career,
  isSaved,
  loading = false,
  onToggle,
}: SaveCareerButtonProps) {
  return (
    <button
      type='button'
      onClick={() => void onToggle(career)}
      disabled={loading}
      aria-label={
        isSaved
          ? `Remove ${career.title} from saved careers`
          : `Save ${career.title} to saved careers`
      }
      className={`cursor-pointer inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
        isSaved
          ? 'bg-accent-surface text-accent'
          : 'bg-surface-inset text-ink-subtle hover:text-ink-muted'
      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isSaved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    </button>
  );
}
