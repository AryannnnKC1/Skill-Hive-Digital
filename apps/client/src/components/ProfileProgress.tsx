interface ProfileProgressProps {
  completion: number;
}

export default function ProfileProgress({
  completion,
}: ProfileProgressProps) {
  return (
    <div className="bg-surface-raised border border-border rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-start">
      <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Profile Completion
      </h3>

      <div className="w-full bg-surface-inset rounded-full h-2 mb-4 overflow-hidden">
        <div 
          className="bg-cta h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${completion}%` }} 
        />
      </div>

      <p className="text-ink-muted text-sm font-medium">
        <span className="font-bold text-ink">{completion}%</span> Complete
      </p>
    </div>
  );
}